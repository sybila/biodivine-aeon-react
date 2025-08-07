import useControlStore from '../../../stores/LiveModel/useControlStore';
import type {
  ControlInfo,
  ControlStats,
  Oscillation,
  Phenotype,
} from '../../../types';
import CytoscapeME from '../../model-editor/CytoscapeME/CytoscapeME';
import ComputationManager from '../ComputationManager/ComputationManager';
import type { LiveModelClass } from './LiveModel';

/** Class to manage control information for live model variables */
class ControlLM {
  // #region --- Properties ---`

  /** Reference to the live model instance */
  private _liveModel: LiveModelClass;

  private oscillation: Oscillation = 'allowed';

  // #endregion

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  // #region --- Oscillation ---

  public setOscillation(oscillation: Oscillation): void {
    this.oscillation = oscillation;
  }

  public getOscillation(): Oscillation {
    return this.oscillation;
  }

  // #endregion

  /** Returns the number of variables set as Control-Enabled and in Phenotype .
   * @returns A tuple with the first element being the count of Control-Enabled variables,
   * and the second element being the count of variables in Phenotype.
   */
  public getNumberOfSetControl(): [number, number] {
    const controlInfo: ControlInfo[] = useControlStore.getState().getAllInfo();
    const [controlEnabled, inPhenotype] = controlInfo.reduce(
      (acc: [number, number], info: ControlInfo) => {
        if (info.controlEnabled) acc[0]++;
        if (info.phenotype != null) acc[1]++;
        return acc;
      },
      [0, 0]
    );
    return [controlEnabled, inPhenotype];
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

    const controlInfo = useControlStore.getState().getVariableControlInfo(id);

    if (controlInfo) CytoscapeME.highlightPhenotype([[id, controlInfo]]);
  }

  /** Change variable control enabled state by its ID */
  public changeControlEnabledById(id: number, controlEnabled: boolean): void {
    if (!this._liveModel._modelModified()) {
      return;
    }

    useControlStore.getState().setControlEnabled(id, controlEnabled);

    const controlInfo = useControlStore.getState().getVariableControlInfo(id);

    if (controlInfo) CytoscapeME.highlightControlEnabled([[id, controlInfo]]);

    ComputationManager.resetMaxSize();
  }
}

export default ControlLM;
