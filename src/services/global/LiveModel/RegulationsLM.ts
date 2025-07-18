import { EdgeMonotonicity, type Regulation } from '../../../types';
import CytoscapeME from '../../model-editor/CytoscapeME/CytoscapeME';
import ModelEditor from '../../model-editor/ModelEditor/ModelEditor';
import type { LiveModelClass } from './LiveModel';

//import { ModelEditor } from "./Todo-imports";

class RegulationsLM {
  private _regulations: Regulation[] = [];
  private _liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  /** Getter which returns all regulations in the form of array */
  public getAllRegulations(): Regulation[] {
    return this._regulations;
  }

  public addRegulation(
    modAllowed: boolean,
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    monotonicity: EdgeMonotonicity
  ): boolean | void {
    if (!modAllowed && !this._liveModel._modelModified()) return;

    if (this.findRegulation(regulatorId, targetId)) return false;

    const regulation: Regulation = {
      regulator: regulatorId,
      target: targetId,
      observable: isObservable,
      monotonicity: monotonicity,
    };

    this._regulations.push(regulation);
    this._regulationChanged(regulation);
    ModelEditor.reloadModelEditorTab();
    return true;
  }

  public removeRegulation(regulatorId: number, targetId: number): boolean {
    if (!this._liveModel._modelModified()) return false;

    const index = this._regulations.findIndex(
      (r) => r.regulator === regulatorId && r.target === targetId
    );

    if (index !== -1) {
      return this._removeRegulation(this._regulations[index]);
    }

    return false;
  }

  // Todo fix _
  public _removeRegulation(regulation: Regulation): boolean {
    const index = this._regulations.indexOf(regulation);
    if (index > -1) {
      this._regulations.splice(index, 1);
      CytoscapeME.removeRegulation(regulation.regulator, regulation.target);
      //ModelEditor.removeRegulation(regulation.regulator, regulation.target);
      //ModelEditor.updateStats();
      this._liveModel.Export.saveModel();
      return true;
    }
    return false;
  }

  public setObservability(
    regulatorId: number,
    targetId: number,
    isObservable: boolean
  ): void {
    const regulation = this.findRegulation(regulatorId, targetId);
    if (regulation && regulation.observable !== isObservable) {
      regulation.observable = isObservable;
      this._regulationChanged(regulation);
    }
  }

  public toggleObservability(regulatorId: number, targetId: number): void {
    if (!this._liveModel._modelModified()) return;

    const regulation = this.findRegulation(regulatorId, targetId);
    if (regulation) {
      regulation.observable = !regulation.observable;
      this._regulationChanged(regulation);
    }
  }

  public setMonotonicity(
    regulatorId: number,
    targetId: number,
    monotonicity: EdgeMonotonicity
  ): void {
    const regulation = this.findRegulation(regulatorId, targetId);
    if (regulation && regulation.monotonicity !== monotonicity) {
      regulation.monotonicity = monotonicity;
      this._regulationChanged(regulation);
    }
  }

  public toggleMonotonicity(regulatorId: number, targetId: number): void {
    if (!this._liveModel._modelModified()) return;

    const regulation = this.findRegulation(regulatorId, targetId);
    if (regulation) {
      let next = EdgeMonotonicity.unspecified;
      if (regulation.monotonicity === EdgeMonotonicity.unspecified)
        next = EdgeMonotonicity.activation;
      else if (regulation.monotonicity === EdgeMonotonicity.activation)
        next = EdgeMonotonicity.inhibition;
      regulation.monotonicity = next;
      this._regulationChanged(regulation);
    }
  }

  public findRegulation(
    regulatorId: number,
    targetId: number
  ): Regulation | undefined {
    return this._regulations.find(
      (r) => r.regulator === regulatorId && r.target === targetId
    );
  }

  public regulationsOf(targetId: number): Regulation[] {
    return this._regulations.filter((r) => r.target === targetId);
  }

  public regulationsFrom(regulatorId: number): Regulation[] {
    return this._regulations.filter((r) => r.regulator === regulatorId);
  }

  // Todo fix _
  public _regulationToString(regulation: Regulation): string {
    const regulatorName = this._liveModel.Variables.getVariableName(
      regulation.regulator
    );
    const targetName = this._liveModel.Variables.getVariableName(
      regulation.target
    );
    let arrow = '-';

    if (regulation.monotonicity === EdgeMonotonicity.unspecified) arrow += '?';
    else if (regulation.monotonicity === EdgeMonotonicity.activation)
      arrow += '>';
    else if (regulation.monotonicity === EdgeMonotonicity.inhibition)
      arrow += '|';

    if (!regulation.observable) arrow += '?';

    return `${regulatorName} ${arrow} ${targetName}`;
  }

  //Todo update _
  public _regulationChanged(regulation: Regulation): void {
    //ModelEditor.ensureRegulation(regulation);
    CytoscapeME.ensureRegulation(regulation);
    this._liveModel.UpdateFunctions._validateUpdateFunction(regulation.target);
    this._liveModel.Export.saveModel();
  }
}

export default RegulationsLM;
