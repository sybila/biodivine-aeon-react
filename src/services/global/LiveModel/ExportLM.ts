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

//import { ModelEditor, Results, hasLocalStorage } from "./Todo-import";

class ExportLM {
  // #region --- Properties + Contructor ---

  private liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this.liveModel = liveModel;
  }

  // #endregion

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
        result += this.liveModel.Regulations._regulationToString(reg) + '\n';
      }
    }

    return result;
  }

  /**
   * Save the current state of the model to local storage and modelSave field.
   * NOTE: This only triggers on structure change, not metadata changes.
   */
  public saveModel(): void {
    const modelString = this.exportAeon();

    if (!modelString) {
      //Todo error
      return;
    }
    this.liveModel.modelSave = modelString;

    if (!true) return; //!hasLocalStorage
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

  // #region --- Export to File ---

  /** Download a file with the given file name and content */
  private downloadFile(fileName: string, content: string): void {
    var el = document.createElement('a');
    el.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );
    el.setAttribute('download', fileName);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }

  /** Export current model to a file with the given file ending */
  public async exportToFile(
    fileEnding: fileType,
    conversionFunction?: (aeonString: string) => Promise<string>
  ): Promise<void> {
    let modelString = this.exportAeon(true);
    const fileName = useModelInfoStore.getState().getModelName() ?? 'model';

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

    this.downloadFile(`${fileName}${fileEnding}`, modelString);
  }

  // #endregion
}

export default ExportLM;
