import config from '../../../../config';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { TabsState } from '../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import { err, isErr, ok } from '../../../../types/result';
import { type PhenotypeStatus, type Variable } from '../../../../types/types';
import type { AeonFormatInt } from '../../../utilities/AeonFormat/AeonFormatInt';
import type { LoadingInt } from '../../Loading/LoadingInt';
import type { MessageInt } from '../../Message/MessageInt';
import type { WarningInt } from '../../Warning/WarningInt';
import type { LiveModelInt } from '../LiveModelInt';
import type { ImportLMInt } from './ImportLMInt';

type Phenotype = {
  phenName: string;
  variables: Array<{ varName: string; phenValue: PhenotypeStatus }>;
};

class ImportLM implements ImportLMInt {
  // #region --- Properties and Constructor ---

  private onImport: Array<() => void>;

  private liveModel: LiveModelInt;
  private warningServ: WarningInt;
  private messageServ: MessageInt;
  private loadingServ: LoadingInt;
  private aeonFormatServ: AeonFormatInt;

  private resultsStatusStore: ZustandStore<ResultsStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private tabsStore: ZustandStore<TabsState>;

  constructor(
    liveModel: LiveModelInt,
    warningServ: WarningInt,
    messageServ: MessageInt,
    loadingServ: LoadingInt,
    aeonFormatServ: AeonFormatInt,

    resultsStatusStore: ZustandStore<ResultsStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    tabsStore: ZustandStore<TabsState>
  ) {
    this.liveModel = liveModel;
    this.warningServ = warningServ;
    this.messageServ = messageServ;
    this.loadingServ = loadingServ;
    this.aeonFormatServ = aeonFormatServ;

    this.resultsStatusStore = resultsStatusStore;
    this.variablesStore = variablesStore;
    this.tabsStore = tabsStore;

    this.onImport = [];
  }

  // #endregion

  // #region --- Import Callbacks ---

  private runOnImportCallbacks(): void {
    try {
      this.onImport.forEach((callback) => callback());
    } catch (e) {
      console.error('Error running onImport callback: ' + e);
    }
  }

  public addOnImportCallback(callback: () => void) {
    if (callback !== undefined) {
      this.onImport.push(callback);
    }
  }

  // #endregion

  // #region --- Import Aeon helper functions ---

  /** Add variable for importAeon function, returns id of the variable. */
  private addVariableImport(
    variable: Variable | undefined,
    name: string,
    position: any,
    control: [boolean, PhenotypeStatus]
  ): number | undefined {
    if (variable !== undefined) {
      return variable.id;
    }

    const res =
      control == undefined
        ? this.liveModel.Variables.addVariable(
            { force: true, addIntoUndoRedo: false, fitVisualization: false },
            { name: name, position: position }
          )
        : this.liveModel.Variables.addVariable(
            { force: true, addIntoUndoRedo: false, fitVisualization: false },
            {
              name: name,
              position: position,
              controlEnabled: control[0],
              phenotype: control[1],
            }
          );

    return isErr(res) || res.value === undefined ? undefined : res.value;
  }

  /** Adds variables which are not connected to any other variable. */
  private insertNotConnected(
    positions: Record<string, any>,
    control: Record<string, any>
  ): void {
    const vars = Object.keys(positions);
    for (let variable of vars) {
      const variableId = this.variablesStore
        .getState()
        .variableFromName(variable)?.id;
      if (variableId !== undefined) {
        continue;
      }

      this.addVariableImport(
        this.variablesStore.getState().variableFromName(variable),
        variable,
        positions[variable],
        control[variable]
      );
    }
  }

  /** Add all regulations, creating variables if needed. */
  private setRegulations(
    regulations: any[],
    positions: Record<string, any>,
    control: Record<string, [boolean, PhenotypeStatus]>
  ): void {
    for (const template of regulations) {
      const regulator = this.addVariableImport(
        this.variablesStore.getState().variableFromName(template.regulatorName),
        template.regulatorName,
        positions[template.regulatorName],
        control[template.regulatorName]
      );
      const target = this.addVariableImport(
        this.variablesStore.getState().variableFromName(template.targetName),
        template.targetName,
        positions[template.targetName],
        control[template.targetName]
      );

      if (target === undefined || regulator === undefined) {
        this.messageServ.showError(
          'Error: Regulation cannot be created. One of the variables is not defined.'
        );
        continue;
      }

      // Create the actual regulation...
      this.liveModel.Regulations.addRegulation(
        true,
        false,
        regulator,
        target,
        template.observable,
        template.monotonicity
      );
    }
  }

  /** Set all update functions */
  private setUpdateFunctions(
    updateFunctions: Record<string, string>,
    positions: Record<string, any>,
    control: Record<string, any>
  ): void {
    for (const key of Object.keys(updateFunctions)) {
      const variable = this.addVariableImport(
        this.variablesStore.getState().variableFromName(key),
        key,
        positions[key],
        control[key]
      );

      if (variable === undefined) {
        this.messageServ.showError(
          `Error: Update function for variable "${key}" cannot be set. Variable is not defined.`
        );
        continue;
      }

      const error = this.liveModel.UpdateFunctions.setUpdateFunction(
        variable,
        updateFunctions[key],
        false,
        true
      );

      if (isErr(error)) {
        this.messageServ.showError(
          'Error while setting update function: ' + error.error
        );
      }
    }
  }

  /**
   * Imports a list of phenotypes into the model.
   *
   * @param phenotypes - An array of phenotypes to be imported.
   */
  private importPhenotypes(phenotypes: Array<Phenotype>) {
    phenotypes.forEach((phen) => {
      const phenId = this.liveModel.Control.createNewPhenotype(
        false,
        phen.phenName,
        undefined,
        true
      );

      if (!isErr(phenId) && phenId.value != undefined) {
        phen.variables.forEach((variable) => {
          const existingVarObject = this.variablesStore
            .getState()
            .variableFromName(variable.varName);

          if (existingVarObject != undefined) {
            this.liveModel.Control.changePhenotypeById(
              existingVarObject.id,
              variable.phenValue,
              false,
              true,
              phenId.value
            );
          }
        });
      } else {
        console.warn('Failed to create phenotype.');
      }
    });
  }

  // #endregion

  // #region --- Import Aeon ---

  public async importAeonWithWarnings(modelString: string) {
    if (
      Object.values(this.resultsStatusStore.getState().results).some(
        (value) => value !== undefined
      ) ||
      !this.tabsStore.getState().isEmpty()
    ) {
      const proceed = await this.warningServ.addRemoveResultsWarning(
        'Importing a new model'
      );
      if (!proceed) {
        return ok(false);
      }
    }

    if (!this.liveModel.isEmpty()) {
      const proceed = await this.warningServ.addImportModelEraseModelWarning();
      if (!proceed) {
        return ok(false);
      }
    }

    return this.importAeon(modelString);
  }

  public importAeon(modelString: string) {
    this.loadingServ.startLoading();
    // Disable on-the-fly server checks.
    this.liveModel.disable_dynamic_validation = true;

    const parsingResult =
      this.aeonFormatServ.Parsers.parseAeonFile(modelString);

    if (isErr(parsingResult)) {
      this.loadingServ.endLoading();
      return err(parsingResult.error);
    }

    const parsedModel = parsingResult.value;

    this.liveModel.clear();

    // Set model metadata
    this.liveModel.Info.setModelName(parsedModel.modelName, false, true);
    this.liveModel.Info.setModelDescription(
      parsedModel.modelDescription,
      false,
      true
    );

    this.setRegulations(
      parsedModel.regulations,
      parsedModel.varPositions,
      parsedModel.control
    );
    this.setUpdateFunctions(
      parsedModel.updateFunctions,
      parsedModel.varPositions,
      parsedModel.control
    );
    this.insertNotConnected(parsedModel.varPositions, parsedModel.control);
    this.importPhenotypes(parsedModel.phenotypes);

    // Re-enable server checks and run them.
    this.liveModel.disable_dynamic_validation = false;
    this.liveModel.UpdateFunctions.validateAllUpdateFunctions();

    this.runOnImportCallbacks();

    this.loadingServ.endLoading();
    return ok(true); // no error
  }

  // #endregion

  // #region --- Import from file ---

  public importFromFile(
    element: HTMLInputElement & { files: FileList },
    formatToAeonFunction?: (file: string) => Promise<string> | null
  ): void {
    if (!element.files || element.files.length === 0 || !element.files[0]) {
      this.messageServ.showError('Import Error: No file was selected.');
      return;
    }

    const file = element.files[0];
    const fr = new FileReader();

    fr.onload = async (e: ProgressEvent<FileReader>) => {
      if (!e.target || e.target.result === null) {
        this.messageServ.showError('Import Error: File reading failed.');
        return;
      }

      const fileContent = e.target.result as string;

      try {
        const aeonModel = !formatToAeonFunction
          ? fileContent
          : await formatToAeonFunction(fileContent);

        if (aeonModel === null) {
          throw new Error('File format conversion failed.');
        }

        await this.importAeonWithWarnings(aeonModel);
        this.liveModel.Models.addModel(aeonModel, 'main');
      } catch (error: any) {
        this.messageServ.showError(
          `Import Error: ${error?.message ?? 'Parsing file failed'}`
        );
      } finally {
        element.value = '';
      }
    };

    fr.readAsText(file);
  }

  // #endregion

  // #region --- Import from local storage ---

  public async loadFromLocalStorage() {
    try {
      const modelString = localStorage.getItem(
        config.localStorageModelName ?? 'lastModel'
      );
      if (
        modelString !== undefined &&
        modelString !== null &&
        modelString.length > 0
      ) {
        await this.importAeonWithWarnings(modelString);
      } else {
        this.messageServ.showInfo(
          "No recent model available. Make sure 'Block third-party cookies and site data' is disabled in your browser."
        );
      }
    } catch (e) {
      this.messageServ.showError(
        'Import Error: Failed to load model from local storage. '
      );
    }
  }

  // #endregion
}

export default ImportLM;
