import useControlStore from '../../../../stores/LiveModel/ControlStore/useControlStore';
import useVariablesStore from '../../../../stores/LiveModel/VariablesStore/useVariablesStore';
import type {
  ControlEnabledVars,
  ControlInfo,
  ControlStats,
  Oscillation,
  Phenotype,
  PhenotypeControlEnabledVars,
  PhenotypeVars,
} from '../../../../types';
import ComputationManager from '../../ComputationManager/ComputationManager';
import type { LiveModelClass } from '../LiveModel';
import type { ControlLMInt } from './ControlLMInt';

/** Class to manage control information for live model variables */
class ControlLM implements ControlLMInt {
  // #region --- Properties + Constructor ---

  /** Reference to the live model instance */
  private liveModel: LiveModelClass;

  private oscillation: Oscillation = 'allowed';

  private onPhenotypeChange: Array<
    (inputNodes?: [number, ControlInfo][] | null) => void
  >;

  private onControlChange: Array<() => void>;

  constructor(liveModel: LiveModelClass) {
    this.liveModel = liveModel;

    this.onControlChange = [];
    this.onPhenotypeChange = [];
  }

  // #endregion

  // #region --- Getters ---

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

  // #endregion

  // #region --- Phenotype and Control-Enabled callbacks ---

  /** Add a callback to be executed when phenotype changes */
  public addOnPhenotypeChangeCallback(callback: () => void): void {
    this.onPhenotypeChange.push(callback);
  }

  /** Add a callback to be executed when control enabled changes */
  public addOnControlChangeCallback(callback: () => void): void {
    this.onControlChange.push(callback);
  }

  // #endregion

  // #region --- Oscillation ---

  /** Sets the currently set phenotype oscillation state */
  public setOscillation(oscillation: Oscillation): void {
    this.oscillation = oscillation;
  }

  /** Returns the currently set phenotype oscillation state */
  public getOscillation(): Oscillation {
    return this.oscillation;
  }

  // #endregion

  // #region --- Change Control Info ---

  /** Runs callbacks for selected operation (change phenotype/control-enabled) and inputNodes */
  private runCallbacks(
    callbacks: Array<(inputNodes?: [number, ControlInfo][] | null) => void>,
    inputNodes?: [number, ControlInfo][] | null
  ): void {
    try {
      callbacks.forEach((callback) => callback(inputNodes));
    } catch (error) {
      console.error(
        'Error running phenotype/control-enabled change callbacks: ' + error
      );
    }
  }

  /** Change control information for a variable by its ID */
  public changePhenotypeById(
    id: number,
    phenotype: Phenotype,
    force: boolean = false
  ): void {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return;
    }

    useControlStore.getState().setPhenotype(id, phenotype);

    const controlInfo = useControlStore.getState().getVariableControlInfo(id);

    if (controlInfo) {
      this.runCallbacks(this.onPhenotypeChange, [[id, controlInfo]]);
    }
  }

  /** Change variable control enabled state by its ID */
  public changeControlEnabledById(
    id: number,
    controlEnabled: boolean,
    force: boolean = false
  ): void {
    if (!force && !this.liveModel.modelCanBeModified()) {
      console.log(
        'Model cannot be modified at the moment change control enabled.'
      );
      return;
    }

    useControlStore.getState().setControlEnabled(id, controlEnabled);

    const controlInfo = useControlStore.getState().getVariableControlInfo(id);

    if (controlInfo) {
      this.runCallbacks(this.onControlChange, [[id, controlInfo]]);
    }

    ComputationManager.resetMaxSize();
  }

  /** Remove control information for a variable by its ID */
  public removeControlInfo(id: number, force = false): void {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return;
    }

    useControlStore.getState().removeInfo(id);
  }

  // #endregion

  // #region --- Get Formated Control Info ---

  /** Get Phenotype and Control-Enabled variables formated into object { phenotypeVars: Record<VarName, Phenotype>, controlEnabledVars: Record<VarName, boolean> } */
  public getPhenotypeControlEnabledVars(): PhenotypeControlEnabledVars {
    const controlInfo = useControlStore.getState().getAllInfoIds();

    const phenotypeVarsObj: PhenotypeVars = {};
    const controlEnabledVarsList: ControlEnabledVars = [];

    controlInfo.forEach(([id, info]) => {
      const varName =
        useVariablesStore.getState().variableFromId(id)?.name ?? 'Unknown';

      if (varName) {
        if (info.phenotype !== null) phenotypeVarsObj[varName] = info.phenotype;
        if (info.controlEnabled) controlEnabledVarsList.push(varName);
      }
    });

    return {
      phenotypeVars: phenotypeVarsObj,
      controlEnabledVars: controlEnabledVarsList.sort(),
    };
  }

  // #endregion
}

export default ControlLM;
