import useControlStore from '../../../stores/LiveModel/useControlStore';
import type { ControlInfo, ControlStats, Phenotype } from '../../../types';
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

    useControlStore.getState().removeInfo(id);
  }

  /** Returns control statistics for the live model */
  public getControlStats(): ControlStats {
    const controlInfo: ControlInfo[] = useControlStore.getState().getAllInfo();
    const stats: ControlStats = {
      controlEnabled: 0,
      notControlEnabled: 0,
      inPhenotypeTrue: 0,
      inPhenotypeFalse: 0,
      notInPhenotype: 0,
    };

    controlInfo.forEach((info) => {
      if (info.controlEnabled) stats.controlEnabled++;
      else stats.notControlEnabled++;

      if (info.phenotype === true) stats.inPhenotypeTrue++;
      else if (info.phenotype === false) stats.inPhenotypeFalse++;
      else stats.notInPhenotype++;
    });

    return stats;
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
