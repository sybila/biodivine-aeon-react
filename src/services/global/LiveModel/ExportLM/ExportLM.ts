import config from '../../../../config';
import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ModelState } from '../../../../stores/LiveModel/LoadedModelStore/ModelState';
import type { ModelInfoState } from '../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { RegulationsStatus } from '../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import {
  PHENOTYPE_STATUS,
  type fileType,
  type PhenotypeStatus,
  type Position,
  type Variable,
} from '../../../../types/types';
import type { FileHelpersInt } from '../../../utilities/FileHelpers/FileHelpersInt';
import type { MessageInt } from '../../Message/MessageInt';
import type { LiveModelInt } from '../LiveModelInt';
import type { ExportLMInt } from './ExportLMInt';

class ExportLM implements ExportLMInt {
  // #region --- Properties + Constructor ---

  /** Function which returns Position of a node in ModelVisualization */
  private getNodePositionFunction: (
    variableId: number
  ) => Position | undefined = (_) => undefined;

  /** Indicates whether local storage is available. */
  private hasLocalStorage: boolean;

  /** Reference to the parent LiveModel class. */
  private liveModel: LiveModelInt;
  private fileHelpersServ: FileHelpersInt;
  private messageServ: MessageInt;

  private controlStore: ZustandStore<ControlStatus>;
  private modelInfoStore: ZustandStore<ModelInfoState>;
  private regulationsStore: ZustandStore<RegulationsStatus>;
  private updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  private loadedModelStore: ZustandStore<ModelState>;
  private variablesStore: ZustandStore<VariablesStatus>;

  constructor(
    liveModel: LiveModelInt,
    fileHelpersServ: FileHelpersInt,
    messageServ: MessageInt,

    controlStore: ZustandStore<ControlStatus>,
    modelInfoStore: ZustandStore<ModelInfoState>,
    regulationsStore: ZustandStore<RegulationsStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    loadedModelStore: ZustandStore<ModelState>,
    variablesStore: ZustandStore<VariablesStatus>
  ) {
    this.liveModel = liveModel;
    this.fileHelpersServ = fileHelpersServ;
    this.messageServ = messageServ;

    this.controlStore = controlStore;
    this.modelInfoStore = modelInfoStore;
    this.regulationsStore = regulationsStore;
    this.updateFunctionsStore = updateFunctionsStore;
    this.loadedModelStore = loadedModelStore;
    this.variablesStore = variablesStore;

    try {
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      this.hasLocalStorage = true;
    } catch (e) {
      this.hasLocalStorage = false;
    }
  }

  // #endregion

  // #region --- Setters ---

  public setGetNodePositionFunction(
    func: (variableId: number) => Position | undefined
  ): void {
    if (func != undefined) {
      this.getNodePositionFunction = func;
    }
  }

  // #endregion

  // #region --- Model Stats ---

  public stats() {
    let maxInDegree = 0;
    let maxOutDegree = 0;
    let variables: Variable[] = this.variablesStore
      .getState()
      .getAllVariables();
    let explicitParameterNames = new Set<string>();
    let parameterVars = 0;

    for (const variable of variables) {
      let regulators = 0;
      let targets = 0;

      for (let r of this.regulationsStore.getState().getAllRegulations()) {
        if (r.target == variable.id) regulators += 1;
        if (r.regulator == variable.id) targets += 1;
      }

      if (regulators > maxInDegree) maxInDegree = regulators;
      if (targets > maxOutDegree) maxOutDegree = targets;

      const updateFunction = this.updateFunctionsStore
        .getState()
        .getUpdateFunctionId(variable.id);
      if (updateFunction === undefined) {
        parameterVars += 1 << regulators;
      } else {
        const metadata = updateFunction.metadata;
        for (let parameter of metadata.parameters) {
          const p_key = `${parameter.name}(${parameter.cardinality})`;
          if (!explicitParameterNames.has(p_key)) {
            explicitParameterNames.add(p_key);
            parameterVars += 1 << parameter.cardinality;
          }
        }
      }
    }

    const explicitParameters = Array.from(explicitParameterNames).sort();

    return {
      maxInDegree,
      maxOutDegree,
      variableCount: variables.length,
      parameterVariables: parameterVars,
      regulationCount: this.regulationsStore.getState().getAllRegulations()
        .length,
      explicitParameters,
    };
  }

  // #endregion

  // #region --- Export/Save Model ---

  public exportAeon(emptyPossible = false, defaultPhenotypeId = -1) {
    const variables = this.variablesStore.getState().getAllVariables();
    if (!emptyPossible && variables.length === 0) {
      return undefined;
    }

    return [
      this.exportName(),
      this.exportDescription(),
      this.exportVariables(defaultPhenotypeId),
      this.exportPhenotypes(),
    ].join('');
  }

  private exportName(): string {
    const modelName = this.modelInfoStore.getState().getModelName();
    return modelName ? `#name:${modelName}\n` : '';
  }

  private exportDescription(): string {
    const modelDescription = this.modelInfoStore
      .getState()
      .getModelDescription();
    return modelDescription
      ? `#description:${modelDescription.replace(/\n/g, '\\n')}\n`
      : '';
  }

  private exportVariables(defaultPhenotypeId: number): string {
    const variables = this.variablesStore.getState().getAllVariables();
    return variables
      .map((variable) => this.exportVariable(variable, defaultPhenotypeId))
      .join('');
  }

  private exportVariable(
    variable: Variable,
    defaultPhenotypeId: number
  ): string {
    let result = '';

    const variableName = variable?.name;
    const position = this.getNodePositionFunction(variable.id);
    if (position !== undefined) {
      result += `#position:${variableName}:${position}\n`;
    }

    const controlEnabled = this.controlStore
      .getState()
      .getVariableControlEnabled(variable.id);
    const phenotypeStatus =
      this.controlStore
        .getState()
        .getVariablePhenotype(variable.id, defaultPhenotypeId) ??
      PHENOTYPE_STATUS.NotInPhenotype;

    result += `#!control:${variableName}:${controlEnabled ?? true},${
      phenotypeStatus === PHENOTYPE_STATUS.InPhenotypeTrue
        ? true
        : phenotypeStatus === PHENOTYPE_STATUS.InPhenotypeFalse
          ? false
          : null
    }\n`;

    const fun = this.updateFunctionsStore
      .getState()
      .getUpdateFunctionId(variable.id);
    if (fun !== undefined) {
      result += `$${variableName}:${fun.functionString}\n`;
    }

    const regulations = this.regulationsStore
      .getState()
      .regulationsOf(variable.id);
    regulations.forEach((reg) => {
      result += this.liveModel.Regulations.regulationToString(reg) + '\n';
    });

    return result;
  }

  private exportPhenotypes(): string {
    const phenotypes = Object.entries(
      this.controlStore.getState().getAllPhenotypes()
    );

    return phenotypes
      .map(([id, phen]) => {
        if (id === '-1') {
          return '';
        }

        return `#!phen:${phen.name},${Object.entries(phen.variables)
          .map(
            ([varId, phenStatus]) =>
              `${this.variablesStore.getState().getVariableName(Number(varId))} ${this.convertPhenotypeStatusToString(phenStatus)}`
          )
          .join(' ')}`;
      })
      .join('\n');
  }

  /**
   * Save the current state of the model to local storage and ModelsLM live model module.
   * NOTE: This only triggers on structure change, not metadata changes.
   */
  public saveModel(): void {
    const modelString = this.exportAeon();
    const modelId = this.loadedModelStore.getState().loadedModelId;

    if (modelString === undefined || modelId === null) {
      return;
    }
    this.liveModel.Models.updateModel(modelId, modelString);

    if (!this.hasLocalStorage || modelId !== 0) return;
    try {
      if (!this.liveModel.isEmpty()) {
        localStorage.setItem(
          config.localStorageModelName ?? 'last_model',
          modelString
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  // #endregion

  // #region --- Export to File ---

  /** Export current model to a file with the given file ending */
  public async exportToFile(
    fileEnding: fileType,
    conversionFunction?: (aeonString: string) => Promise<string>
  ): Promise<void> {
    let modelString = this.exportAeon(true);
    const modelName = this.modelInfoStore.getState().getModelName();
    const fileName = !this.modelInfoStore.getState().getModelName()
      ? 'model'
      : modelName;

    if (!modelString) {
      this.messageServ.showError('Export Error: No variables in the model.');
      return;
    }

    if (conversionFunction) {
      try {
        modelString = await conversionFunction(modelString);

        if (!modelString) {
          throw new Error(
            `Conversion function returned empty string for ${fileEnding} format`
          );
        }
      } catch (error: any) {
        this.messageServ.showError(`Export Error: ${error.message}`);
        return;
      }
    }

    this.fileHelpersServ.downloadFile(`${fileName}${fileEnding}`, modelString);
  }

  // #endregion

  // #region --- Utilities ---

  /**
   * Converts a PhenotypeStatus value to a string based on predefined mappings.
   *
   * @param value - The PhenotypeStatus value to be converted.
   * @returns A string representation of the PhenotypeStatus value. Returns 'true' if the value is 'InPhenotypeTrue', 'false' if it is 'InPhenotypeFalse', and 'null' otherwise.
   */
  private convertPhenotypeStatusToString(value: PhenotypeStatus): string {
    return value == PHENOTYPE_STATUS.InPhenotypeTrue
      ? 'true'
      : value == PHENOTYPE_STATUS.InPhenotypeFalse
        ? 'false'
        : 'null';
  }

  // #endregion
}

export default ExportLM;
