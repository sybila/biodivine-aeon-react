import type {
  ControlInfo,
  fileType,
  ModelStats,
  Variable,
} from '../../../types';
import CytoscapeME from '../../model-editor/CytoscapeME/CytoscapeME';
import type { LiveModelClass } from './LiveModel';
import useVariablesStore from '../../../stores/LiveModel/useVariablesStore';
import useUpdateFunctionsStore from '../../../stores/LiveModel/useUpdateFunctionsStore';
import useRegulationsStore from '../../../stores/LiveModel/useRegulationsStore';
import useControlStore from '../../../stores/LiveModel/useControlStore';
import useModelInfoStore from '../../../stores/LiveModel/useModelInfoStore';
import config from '../../../config';
import { Message } from '../../../components/lit-components/message-wrapper';
import useLoadedModelStore from '../../../stores/LiveModel/useLoadedModelStore';
import FileHelpers from '../../utilities/FileHelpers';

class ExportLM {
  // #region --- Properties + Constructor ---

  /** Reference to the parent LiveModel class. */
  private liveModel: LiveModelClass;

  /** Indicates whether local storage is available. */
  private hasLocalStorage: boolean;

  constructor(liveModel: LiveModelClass) {
    this.liveModel = liveModel;

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

  // #region --- Model Stats ---

  /** Export stats object */
  public stats(): ModelStats {
    let maxInDegree = 0;
    let maxOutDegree = 0;
    let variables: Variable[] = useVariablesStore.getState().getAllVariables();
    let explicitParameterNames = new Set<string>();
    let parameterVars = 0;

    for (const variable of variables) {
      let regulators = 0;
      let targets = 0;

      for (let r of useRegulationsStore.getState().getAllRegulations()) {
        if (r.target == variable.id) regulators += 1;
        if (r.regulator == variable.id) targets += 1;
      }

      if (regulators > maxInDegree) maxInDegree = regulators;
      if (targets > maxOutDegree) maxOutDegree = targets;

      const updateFunction = useUpdateFunctionsStore
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
      regulationCount: useRegulationsStore.getState().getAllRegulations()
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
    const variables: Variable[] = useVariablesStore
      .getState()
      .getAllVariables();
    if (!emptyPossible && variables.length === 0) {
      return undefined;
    }

    const name = useModelInfoStore.getState().getModelName();
    if (name !== undefined) result += `#name:${name}\n`;

    const description = useModelInfoStore.getState().getModelDescription();
    if (description !== undefined)
      result += `#description:${description.replace(/\n/g, '\\n')}\n`;

    for (const variable of variables) {
      const varName = variable?.name;

      const position = CytoscapeME.getNodePosition(variable.id);
      if (position !== undefined) {
        result += `#position:${varName}:${position}\n`;
      }

      if (variable !== undefined) {
        const controlInfo: ControlInfo | undefined = useControlStore
          .getState()
          .getVariableControlInfo(variable.id);

        result += `#!control:${varName}:${
          controlInfo?.controlEnabled ?? true
        },${controlInfo?.phenotype ?? null}\n`;
      }

      const fun = useUpdateFunctionsStore
        .getState()
        .getUpdateFunctionId(variable.id);
      if (fun !== undefined) {
        result += `$${varName}:${fun.functionString}\n`;
      }

      const regulations = useRegulationsStore
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
    const modelId = useLoadedModelStore.getState().loadedModelId;

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
    const modelName = useModelInfoStore.getState().getModelName();
    const fileName = !useModelInfoStore.getState().getModelName()
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

    FileHelpers.downloadFile(`${fileName}${fileEnding}`, modelString);
  }

  // #endregion
}

export default ExportLM;
