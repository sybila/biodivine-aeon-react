import useRegulationsStore from '../../../stores/LiveModel/useRegulationsStore';
import useVariablesStore from '../../../stores/LiveModel/useVariablesStore';
import { EdgeMonotonicity, type Regulation } from '../../../types';
import CytoscapeME from '../../model-editor/CytoscapeME/CytoscapeME';
import type { LiveModelClass } from './LiveModel';

//import { ModelEditor } from "./Todo-imports";

class RegulationsLM {
  private _liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  public addRegulation(
    modAllowed: boolean,
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    monotonicity: EdgeMonotonicity
  ): boolean | void {
    if (!modAllowed && !this._liveModel._modelModified()) return;

    if (useRegulationsStore.getState().getRegulationId(regulatorId, targetId))
      return false;

    const regulation: Regulation = {
      regulator: regulatorId,
      target: targetId,
      observable: isObservable,
      monotonicity: monotonicity,
    };

    useRegulationsStore.getState().addRegulation(regulation);
    this._regulationChanged(regulation);
    return true;
  }

  public removeRegulation(regulatorId: number, targetId: number): boolean {
    if (!this._liveModel._modelModified()) return false;

    const exists = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (!exists) return false;

    useRegulationsStore.getState().removeRegulation(regulatorId, targetId);
    return true;
  }

  // Todo fix _
  public _removeRegulation(regulation: Regulation): boolean {
    const exists = useRegulationsStore
      .getState()
      .getRegulationId(regulation.regulator, regulation.target);
    if (exists) {
      CytoscapeME.removeRegulation(regulation.regulator, regulation.target);
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
    const regulation = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation && regulation.observable !== isObservable) {
      useRegulationsStore
        .getState()
        .setObservability(regulatorId, targetId, isObservable);
      this._regulationChanged({ ...regulation, observable: isObservable });
    }
  }

  public toggleObservability(regulatorId: number, targetId: number): void {
    if (!this._liveModel._modelModified()) return;

    const regulation = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation) {
      useRegulationsStore
        .getState()
        .setObservability(regulatorId, targetId, !regulation.observable);
      this._regulationChanged({
        ...regulation,
        observable: !regulation.observable,
      });
    }
  }

  public setMonotonicity(
    regulatorId: number,
    targetId: number,
    monotonicity: EdgeMonotonicity
  ): void {
    const regulation = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation && regulation.monotonicity !== monotonicity) {
      useRegulationsStore
        .getState()
        .setMonotonicity(regulatorId, targetId, monotonicity);
      this._regulationChanged({ ...regulation, monotonicity: monotonicity });
    }
  }

  public toggleMonotonicity(regulatorId: number, targetId: number): void {
    if (!this._liveModel._modelModified()) return;

    const regulation = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation) {
      let next = EdgeMonotonicity.unspecified;
      if (regulation.monotonicity === EdgeMonotonicity.unspecified)
        next = EdgeMonotonicity.activation;
      else if (regulation.monotonicity === EdgeMonotonicity.activation)
        next = EdgeMonotonicity.inhibition;
      useRegulationsStore
        .getState()
        .setMonotonicity(regulatorId, targetId, next);
      this._regulationChanged({ ...regulation, monotonicity: next });
    }
  }

  // Todo fix _
  public _regulationToString(regulation: Regulation): string {
    const regulatorName = useVariablesStore
      .getState()
      .getVariableName(regulation.regulator);
    const targetName = useVariablesStore
      .getState()
      .getVariableName(regulation.target);
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
    CytoscapeME.ensureRegulation(regulation);
    this._liveModel.UpdateFunctions._validateUpdateFunction(regulation.target);
    this._liveModel.Export.saveModel();
  }
}

export default RegulationsLM;
