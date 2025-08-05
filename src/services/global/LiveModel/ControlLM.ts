import useControlStore from '../../../stores/LiveModel/useControlStore';
import type { Phenotype } from '../../../types';
import type { LiveModelClass } from './LiveModel';

/** Class to manage control information for live model variables */
class ControlLM {
  private _liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  /** Remove control information for a variable by its ID */
  public removeControlInfo(id: number, force = false): void {
    if (!force && !this._liveModel._modelModified()) {
      return;
    }

    useControlStore.getState().removeInfo(id, force);
  }

  /** Change control information for a variable by its ID */
  public changePhenotypeById(id: number, phenotype: Phenotype): void {
    if (!this._liveModel._modelModified()) {
      return;
    }

    useControlStore.getState().setPhenotype(id, phenotype);
  }

  /** Change variable control enabled state by its ID */
  public changeControlEnabledById(id: number, controlEnabled: boolean): void {
    if (!this._liveModel._modelModified()) {
      return;
    }

    useControlStore.getState().setControlEnabled(id, controlEnabled);
  }
}

export default ControlLM;
