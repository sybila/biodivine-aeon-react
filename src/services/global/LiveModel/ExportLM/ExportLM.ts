import { Message } from '../../../../components/lit-components/message-wrapper';
import config from '../../../../config';
import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ModelState } from '../../../../stores/LiveModel/LoadedModelStore/ModelState';
import type { ModelInfoState } from '../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { RegulationsStatus } from '../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type {
  ControlInfo,
  fileType,
  ModelStats,
  Position,
  Variable,
} from '../../../../types';
import type { FileHelpersInt } from '../../../utilities/FileHelpers/FileHelpersInt';
import type { LiveModelClass } from '../LiveModel';
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
  private liveModel: LiveModelClass;
  private fileHelpersServ: FileHelpersInt;

  private controlStore: ZustandStore<ControlStatus>;
  private modelInfoStore: ZustandStore<ModelInfoState>;
  private regulationsStore: ZustandStore<RegulationsStatus>;
  private updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  private loadedModelStore: ZustandStore<ModelState>;
  private variablesStore: ZustandStore<VariablesStatus>;

  constructor(
    liveModel: LiveModelInt,
    fileHelpersServ: FileHelpersInt,
    controlStore: ZustandStore<ControlStatus>,
    modelInfoStore: ZustandStore<ModelInfoState>,
    regulationsStore: ZustandStore<RegulationsStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    loadedModelStore: ZustandStore<ModelState>,
    variablesStore: ZustandStore<VariablesStatus>
  ) {
    this.liveModel = liveModel;
    this.fileHelpersServ = fileHelpersServ;

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

  /** Export stats object */
  public stats(): ModelStats {
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

  /**
   * Export current model in Aeon text format, or undefined if model cannot be
   * exported (no variables).
   */
  public exportAeon(emptyPossible = false): string | undefined {
    let result = '';
    const variables: Variable[] = this.variablesStore
      .getState()
      .getAllVariables();
    if (!emptyPossible && variables.length === 0) {
      return undefined;
    }

    const name = this.modelInfoStore.getState().getModelName();
    if (name !== undefined) result += `#name:${name}\n`;

    const description = this.modelInfoStore.getState().getModelDescription();
    if (description !== undefined)
      result += `#description:${description.replace(/\n/g, '\\n')}\n`;

    for (const variable of variables) {
      const varName = variable?.name;

      const position = this.getNodePositionFunction(variable.id);
      if (position !== undefined) {
        result += `#position:${varName}:${position}\n`;
      }

      if (variable !== undefined) {
        const controlInfo: ControlInfo | undefined = this.controlStore
          .getState()
          .getVariableControlInfo(variable.id);

        result += `#!control:${varName}:${
          controlInfo?.controlEnabled ?? true
        },${controlInfo?.phenotype ?? null}\n`;
      }

      const fun = this.updateFunctionsStore
        .getState()
        .getUpdateFunctionId(variable.id);
      if (fun !== undefined) {
        result += `$${varName}:${fun.functionString}\n`;
      }

      const regulations = this.regulationsStore
        .getState()
        .regulationsOf(variable.id);
      for (let reg of regulations) {
        result += this.liveModel.Regulations.regulationToString(reg) + '\n';
      }
    }

    return result;
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
      Message.showError('Export Error: No variables in the model.');
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
        Message.showError(`Export Error: ${error.message}`);
        return;
      }
    }

    this.fileHelpersServ.downloadFile(`${fileName}${fileEnding}`, modelString);
  }

  // #endregion
}

export default ExportLM;
