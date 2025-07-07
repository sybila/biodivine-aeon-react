import type { LiveModelClass } from "./LiveModel";

//import { PhenotypeEditor, ControllableEditor, ComputeEngine } from "./Todo-imports";

class ControlLM {
  private _liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  /** Change variable (with id defined by id param) phenotype value defined by phenValue (true, false, null) */
  public changePhenotypeById(id: number, phenValue: boolean | null): void {
    if (!this._liveModel._modelModified()) {
      return;
    }

    const variable = this._liveModel.Variables.variableFromId(id);
    //PhenotypeEditor.changeVarPhenotype(variable, phenValue);
  }

  /** Change variable with id defined by id param to contrValue (true, false) */
  public changeControllableById(id: number, contrValue: boolean): void {
    if (!this._liveModel._modelModified()) {
      return;
    }

    const variable = this._liveModel.Variables.variableFromId(id);
    //ControllableEditor.changeVarControllable(variable, contrValue);
    //ComputeEngine.Computation.Control.setMaxSize(true);
  }
}

export default ControlLM;
