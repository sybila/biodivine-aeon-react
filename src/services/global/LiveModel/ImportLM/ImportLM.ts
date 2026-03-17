import config from '../../../../config';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { TabsState } from '../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import { EdgeMonotonicity, type Variable } from '../../../../types';
import type { LoadingInt } from '../../Loading/LoadingInt';
import type { MessageInt } from '../../Message/MessageInt';
import type { WarningInt } from '../../Warning/WarningInt';
import type { LiveModelInt } from '../LiveModelInt';
import type { ImportLMInt } from './ImportLMInt';

class ImportLM implements ImportLMInt {
  // #region --- Properties and Constructor ---

  private onImport: Array<() => void>;

  private liveModel: LiveModelInt;
  private warningServ: WarningInt;
  private messageServ: MessageInt;
  private loadingServ: LoadingInt;

  private resultsStatusStore: ZustandStore<ResultsStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private tabsStore: ZustandStore<TabsState>;

  constructor(
    liveModel: LiveModelInt,
    warningServ: WarningInt,
    messageServ: MessageInt,
    loadingServ: LoadingInt,

    resultsStatusStore: ZustandStore<ResultsStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    tabsStore: ZustandStore<TabsState>
  ) {
    this.liveModel = liveModel;
    this.warningServ = warningServ;
    this.messageServ = messageServ;
    this.loadingServ = loadingServ;

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

  /** Adds callback which runs after import is complete */
  public addOnImportCallback(callback: () => void): void {
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
    control: any
  ): number | undefined {
    if (variable !== undefined) {
      return variable.id;
    }

    if (control == undefined) {
      return this.liveModel.Variables.addVariable(true,false, position, name);
    }

    return this.liveModel.Variables.addVariable(
      true,
      false,
      position,
      name,
      control[0],
      control[1]
    );
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
    control: Record<string, any>
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
        true
      );
      if (error !== undefined) {
        this.messageServ.showError(
          'Error while setting update function: ' + error
        );
      }
    }
  }

  /**
   * Parses model into intermediate objects.
   * Returns model name and model description.
   * modelString is model in the form of Aeon string
   * All the other parameters are empty objects to be filled with data from the parsed Aeon string
   */
  private parseAeonFile(
    modelString: string,
    regulations: any[],
    positions: Record<string, any>,
    control: Record<string, any>,
    updateFunctions: Record<string, string>,
    results: Record<string, any>
  ): [string, string] | string {
    let lines = modelString.split('\n');
    // name1 -> name2
    let regulationRegex =
      /^\s*([a-zA-Z0-9_{}]+)\s*-([>|?])(\??)\s*([a-zA-Z0-9_{}]+)\s*$/;
    // #name:content
    let modelNameRegex = /^\s*#name:(.+)$/;
    // #description:content
    let modelDescriptionRegex = /^\s*#description:(.+)$/;
    // #position:var_name:num1,num2
    let positionRegex = /^\s*#position:([a-zA-Z0-9_{}]+):(.+?),(.+?)\s*$/;
    // #control:var_name:ccontrollability,pphenotypeStatus
    let controlRegex =
      /^\s*#!control:([a-zA-Z0-9_{}]+):(true|false),(true|false|null)\s*$/;
    // $var_name:function_data
    let updateFunctionRegex = /^\s*\$\s*([a-zA-Z0-9_{}]+)\s*:\s*(.+)\s*$/;
    //#results:stringifiedJSONofresults
    let resultsRegex = /^\s*#!results:\s*(attractor|control)\s*:\s*(.+)\s*$/;
    // #...
    let commentRegex = /^\s*#.*?$/;

    let modelName = '';
    let modelDescription = '';

    for (let line of lines) {
      line = line.trim();
      if (line.length == 0) continue; // skip whitespace
      let match = line.match(regulationRegex);
      if (match !== null) {
        let monotonicity: EdgeMonotonicity = EdgeMonotonicity.unspecified;
        if (match[2] == '>') monotonicity = EdgeMonotonicity.activation;
        if (match[2] == '|') monotonicity = EdgeMonotonicity.inhibition;
        regulations.push({
          regulatorName: match[1],
          targetName: match[4],
          monotonicity: monotonicity,
          observable: match[3].length == 0,
        });
        continue;
      }
      match = line.match(modelNameRegex);
      if (match !== null) {
        modelName = match[1];
        continue;
      }
      match = line.match(modelDescriptionRegex);
      if (match !== null) {
        modelDescription += match[1];
        continue;
      }
      match = line.match(positionRegex);
      if (match !== null) {
        let x = parseFloat(match[2]);
        let y = parseFloat(match[3]);
        if (x === x && y === y) {
          // test for NaN
          positions[match[1]] = [x, y];
        }
        continue;
      }
      match = line.match(updateFunctionRegex);
      if (match !== null) {
        updateFunctions[match[1]] = match[2];
        continue;
      }

      match = line.match(controlRegex);
      if (match !== null) {
        control[match[1]] = [
          match[2] == 'true' ? true : false,
          match[3] == 'true' ? true : match[3] == 'false' ? false : null,
        ];
        continue;
      }

      match = line.match(resultsRegex);
      if (match != null) {
        try {
          results.type = match[1];
          results.data = JSON.parse(match[2]);
        } catch (e) {
          console.log('Results are invalid: ' + e);
        }
      }

      if (line.match(commentRegex) === null) {
        // todeo-error
        return 'Unexpected line in file: ' + line;
      }
    }

    return [modelName, modelDescription.replace(/\\n/g, '\n')];
  }

  // #endregion

  // #region --- Import Aeon ---

  /** Import a model from an Aeon file with warnings.
   *  If there are results loaded or tabs open, warn the user that they will be lost.
   *  If the model is not empty, warn the user that it will be erased.
   */
  public async importAeonWithWarnings(modelString: string): Promise<boolean> {
    if (
      this.resultsStatusStore.getState().results != undefined ||
      !this.tabsStore.getState().isEmpty()
    ) {
      const proceed = await this.warningServ.addRemoveResultsWarning(
        'Importing a new model'
      );
      if (!proceed) {
        return false;
      }
    }

    if (!this.liveModel.isEmpty()) {
      const proceed = await this.warningServ.addImportModelEraseModelWarning();
      if (!proceed) {
        return false;
      }
    }

    return this.importAeon(modelString);
  }

  /**
   * Import model from Aeon file, load it into the live model and save it as the main model.
   * If the import is successful, return true.
   */
  public importAeon(modelString: string): boolean {
    this.loadingServ.startLoading();
    // Disable on-the-fly server checks.
    this.liveModel.disable_dynamic_validation = true;

    let modelName = '';
    let modelDescription = '';
    let regulations: any[] = [];
    let positions: Record<string, any> = {};
    let control: Record<string, any> = {};
    let updateFunctions: Record<string, string> = {};
    let results: Record<string, any> = {};

    [modelName, modelDescription] = this.parseAeonFile(
      modelString,
      regulations,
      positions,
      control,
      updateFunctions,
      results
    ) as [string, string];

    this.liveModel.clear();

    // Set model metadata
    this.liveModel.Info.setModelName(modelName, true);
    this.liveModel.Info.setModelDescription(modelDescription, true);

    this.setRegulations(regulations, positions, control);
    this.setUpdateFunctions(updateFunctions, positions, control);
    this.insertNotConnected(positions, control);

    // Re-enable server checks and run them.
    this.liveModel.disable_dynamic_validation = false;
    this.liveModel.UpdateFunctions.validateAllUpdateFunctions();

    this.runOnImportCallbacks();

    this.loadingServ.endLoading();
    return true; // no error
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

  /** Loads model saved in the local storage of the browser. */
  public async loadFromLocalStorage(): Promise<void> {
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

      console.log(e);
    }
  }

  // #endregion
}

export default ImportLM;
