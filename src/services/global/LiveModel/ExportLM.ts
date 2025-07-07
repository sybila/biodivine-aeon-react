import type { Variable } from "../../../types";
import CytoscapeME from "../../model-editor/CytoscapeME/CytoscapeME";
import type { LiveModelClass } from "./LiveModel";

//import { ModelEditor, Results, hasLocalStorage } from "./Todo-import";

class ExportLM {
  private _liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  /** Export stats object */
  public stats() {
    let maxInDegree = 0;
    let maxOutDegree = 0;
    let variables: Variable[] = this._liveModel.Variables.getAllVariables();
    let explicitParameterNames = new Set<string>();
    let parameterVars = 0;

    for (const variable of variables) {
      let regulators = 0;
      let targets = 0;

      for (let r of this._liveModel.Regulations.getAllRegulations()) {
        if (r.target == variable.id) regulators += 1;
        if (r.regulator == variable.id) targets += 1;
      }

      if (regulators > maxInDegree) maxInDegree = regulators;
      if (targets > maxOutDegree) maxOutDegree = targets;

      const updateFunction = this._liveModel.UpdateFunctions.getUpdateFunctionId(variable.id);
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
      regulationCount: this._liveModel.Regulations.getAllRegulations().length,
      explicitParameters,
    };
  }

  /**
   * Export current model in Aeon text format, or undefined if model cannot be 
   * exported (no variables).
   */
  public exportAeon(emptyPossible = false, withResults = true): string | undefined {
    let result = "";
    const variables: Variable[] = this._liveModel.Variables.getAllVariables();
    if (!emptyPossible && variables.length === 0) return undefined;

    const name = "Todo-name"; //ModelEditor.getModelName();
    if (name !== undefined) result += `#name:${name}\n`;

    const description = "Todo-description"; //ModelEditor.getModelDescription();
    if (description !== undefined) result += `#description:${description}\n`;

    for (const variable of variables) {
      const varName = variable?.name;

      const position = CytoscapeME.getNodePosition(variable.id);
      if (position !== undefined) {
        result += `#position:${varName}:${position}\n`;
      }

      if (variable !== undefined) {
        result += `#!control:${varName}:${variable.controllable},${variable.phenotype}\n`;
      }

      const fun = this._liveModel.UpdateFunctions.getUpdateFunctionId(variable.id);
      if (fun !== undefined) {
        result += `$${varName}:${fun.functionString}\n`;
      }

      const regulations = this._liveModel.Regulations.regulationsOf(variable.id);
      for (let reg of regulations) {
        result += this._liveModel.Regulations._regulationToString(reg) + "\n";
      }
    }

    if (withResults) {
      result += "Todo-results"//Results.exportResults();
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
    this._liveModel.modelSave = modelString;

    if (!true) return; //!hasLocalStorage
    try {
      if (!this._liveModel.isEmpty()) {
        localStorage.setItem("last_model", modelString);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default ExportLM;
