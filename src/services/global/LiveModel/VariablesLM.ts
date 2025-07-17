import type { Position, Variable } from "../../../types";
import CytoscapeME from "../../model-editor/CytoscapeME/CytoscapeME";
import ModelEditor from "../../model-editor/ModelEditor/ModelEditor";
import type { LiveModelClass } from "./LiveModel";

//import { ModelEditor , ControllableEditor, ComputeEngine, PhenotypeEditor, UI, Strings } from "./Todo-imports"

class VariablesLM {
  private _idCounter = 0;
  private _variables: Map<number, Variable> = new Map();

  private _liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  public addVariable(
    modAllowed: boolean,
    position: Position = [0.0, 0.0],
    name?: string,
    controllable: boolean = true,
    phenotype: any = null
  ): number | undefined {
    if (!modAllowed && !this._liveModel._modelModified()) {
      return;
    }

    const id = this._idCounter++;
    const variableName = name ?? `v_${id + 1}`;

    const variable: Variable = {
      id,
      name: variableName,
      controllable,
      phenotype,
    };

    this._variables.set(id, variable);

    CytoscapeME.addNode(id, variableName, position);
    ModelEditor.reloadModelEditorTab();
    //ControllableEditor.addVariable(variable);
    //ComputeEngine.Computation.Control.setMaxSize(true);
    //PhenotypeEditor.addVariable(variable);
    //ModelEditor.updateStats();
    //UI.Visible.setQuickHelpVisible(false);

    this._liveModel.UpdateFunctions._validateUpdateFunction(id);
    this._liveModel.Export.saveModel();
    return id;
  }

  public removeVariable(id: number, force = false): void {
    if (!force && !this._liveModel._modelModified()) return;

    const variable = this._variables.get(id);
    if (!variable) return;

    if (force || confirm(variable.name)) { //Strings.removeNodeCheck(variable.name)
      const updateTargets: number[] = [];
      const toRemove = this._liveModel.Regulations.getAllRegulations().filter(
        (reg) => reg.regulator === id || reg.target === id
      );

      for (const reg of toRemove) {
        this._liveModel.Regulations._removeRegulation(reg);
        updateTargets.push(reg.target);
      }

      //ControllableEditor.removeVariable(variable);
      //ComputeEngine.Computation.Control.setMaxSize(true);
      //PhenotypeEditor.removeVariable(variable);

      this._variables.delete(id);
      this._liveModel.UpdateFunctions.deleteUpdateFunctionId(id);

      CytoscapeME.removeNode(id);
      //ModelEditor.removeVariable(id);
      //ModelEditor.updateStats();

      if (this._liveModel.isEmpty()) {
        //UI.Visible.setQuickHelpVisible(true);
      }

      this._liveModel.Export.saveModel();

      for (const affectedId of updateTargets) {
        const fn = this._liveModel.UpdateFunctions.getUpdateFunctionId(affectedId);
        if (fn !== undefined) {
          this._liveModel.UpdateFunctions.setUpdateFunction(
            affectedId,
            fn.functionString
          );
        }
        this._liveModel.UpdateFunctions._validateUpdateFunction(affectedId);
      }
    }
  }

  public renameVariable(id: number, newName: string): string | undefined {
    if (!this._liveModel._modelModified()) return;

    const variable = this._variables.get(id);
    if (!variable) return;

    const error = this._checkVariableName(id, newName);
    if (error !== undefined) {
      return `${newName} ${error}`; //Strings.invalidVariableName(newName)
    }

    const oldName = variable.name;
    variable.name = newName;

    CytoscapeME.renameNode(id, newName);
    //ControllableEditor.renameVariable(id, newName);
    //PhenotypeEditor.renameVariable(id, newName);
    //ModelEditor.renameVariable(id, newName, oldName);

    for (const reg of this._liveModel.Regulations.getAllRegulations()) {
      if (reg.regulator === id || reg.target === id) {
        this._liveModel.Regulations._regulationChanged(reg);
      }
    }

    this._liveModel.Export.saveModel();
    return undefined;
  }

  public pruneConstants(force = false): number {
    const toRemove: number[] = [];

    for (const [id, variable] of this._variables) {
      const isConstant =
        this._liveModel.Regulations.regulationsOf(id).length === 0 &&
        (force ||
          this._liveModel.UpdateFunctions.getUpdateFunctionId(id) === undefined);

      if (isConstant) {
        toRemove.push(id);
      }
    }

    console.log("To remove:", toRemove);
    for (const id of toRemove) {
      this.removeVariable(id, true);
    }

    return toRemove.length;
  }

  public pruneOutputs(): number {
    const toRemove: number[] = [];

    for (const [id] of this._variables) {
      if (this._liveModel.Regulations.regulationsFrom(id).length === 0) {
        toRemove.push(id);
      }
    }

    console.log("To remove:", toRemove);
    for (const id of toRemove) {
      this.removeVariable(id, true);
    }

    return toRemove.length;
  }

  public getAllVariables(): Variable[] {
    return Array.from(this._variables.values());
  }

  public isEmpty(): boolean {
    return this._variables.size === 0;
  }

  public getVariableName(id: number): string | undefined {
    return this._variables.get(id)?.name;
  }

  public variableFromId(id: number): Variable | undefined {
    return this._variables.get(id);
  }

  public variableFromName(name: string): Variable | undefined {
    for (const variable of this._variables.values()) {
      if (variable.name === name) return variable;
    }
    return undefined;
  }

  public clear() {
    for (const id of this._variables.keys()) {
      this.removeVariable(id, true);
    }
  }

  private _checkVariableName(id: number, name: string): string | undefined {
    if (typeof name !== "string") return "Name must be a string.";
    if (!/^[a-z0-9{}_]+$/i.test(name)) {
      return "Name can only contain letters, numbers and `_`, `{`, `}`.";
    }
    const existing = this.variableFromName(name);
    if (existing && existing.id !== id) {
      return "Variable with this name already exists";
    }
    return undefined;
  }
}

export default VariablesLM;
