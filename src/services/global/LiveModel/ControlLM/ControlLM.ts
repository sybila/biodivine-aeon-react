import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type {
  ControlEnabledVars,
  ControlInfo,
  ControlStats,
  Oscillation,
  Phenotype,
  PhenotypeControlEnabledVars,
  PhenotypeVars,
} from '../../../../types';
import type { ComputationManagerInt } from '../../ComputationManager/ComputationManagerInt';
import type { LiveModelInt } from '../LiveModelInt';
import type { ControlLMInt } from './ControlLMInt';

/** Class to manage control information for live model variables */
class ControlLM implements ControlLMInt {
  // #region --- Properties + Constructor ---

  /** Reference to the live model instance */
  private liveModel: LiveModelInt;

  private computationManager: ComputationManagerInt;

  private controlStore: ZustandStore<ControlStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private modelUndoRedoStore: ZustandStore<UndoRedoState>;

  private oscillation: Oscillation = 'allowed';

  private onPhenotypeChange: Array<
    (inputNodes?: [number, ControlInfo][] | null) => void
  >;

  private onControlChange: Array<() => void>;

  constructor(
    liveModel: LiveModelInt,
    computationManager: ComputationManagerInt,
    controlStore: ZustandStore<ControlStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>
  ) {
    this.liveModel = liveModel;
    this.computationManager = computationManager;

    this.controlStore = controlStore;
    this.variablesStore = variablesStore;
    this.modelUndoRedoStore = modelUndoRedoStore;

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
    const controlInfo: ControlInfo[] = this.controlStore
      .getState()
      .getAllInfo();
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
    const controlInfo: ControlInfo[] = this.controlStore
      .getState()
      .getAllInfo();
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
    addIntoUndoRedo: boolean,
    force: boolean = false
  ): void {
    if (!force && !this.liveModel.modelCanBeModified("Control")) {
      return;
    }

    const oldControlInfo = this.controlStore
      .getState()
      .getVariableControlInfo(id);

    this.controlStore.getState().setPhenotype(id, phenotype);

    const controlInfo = this.controlStore.getState().getVariableControlInfo(id);

    if (controlInfo) {
      this.runCallbacks(this.onPhenotypeChange, [[id, controlInfo]]);
    }

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () => {
          this.changePhenotypeById(
            id,
            oldControlInfo?.phenotype ?? null,
            false,
            false
          );
        },
        redo: () => {
          this.changePhenotypeById(id, phenotype ?? null, false, false);
        },
      });
    }
  }

  /** Change variable control enabled state by its ID */
  public changeControlEnabledById(
    id: number,
    controlEnabled: boolean,
    addIntoUndoRedo: boolean,
    force: boolean = false
  ): void {
    if (!force && !this.liveModel.modelCanBeModified("Control")) {
      console.log(
        'Model cannot be modified at the moment change control enabled.'
      );
      return;
    }

    this.controlStore.getState().setControlEnabled(id, controlEnabled);

    const controlInfo = this.controlStore.getState().getVariableControlInfo(id);

    if (controlInfo) {
      this.runCallbacks(this.onControlChange, [[id, controlInfo]]);
    }

    this.computationManager.resetMaxSize();

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () => {
          this.changeControlEnabledById(id, !controlEnabled, false, false);
        },
        redo: () => {
          this.changeControlEnabledById(id, controlEnabled, false, false);
        },
      });
    }
  }

  /** Remove control information for a variable by its ID */
  public removeControlInfo(id: number, force = false): void {
    if (!force && !this.liveModel.modelCanBeModified("Control")) {
      return;
    }

    this.controlStore.getState().removeInfo(id);
  }

  // #endregion

  // #region --- Get Formated Control Info ---

  /** Get Phenotype and Control-Enabled variables formated into object { phenotypeVars: Record<VarName, Phenotype>, controlEnabledVars: Record<VarName, boolean> } */
  public getPhenotypeControlEnabledVars(): PhenotypeControlEnabledVars {
    const controlInfo = this.controlStore.getState().getAllInfoIds();

    const phenotypeVarsObj: PhenotypeVars = {};
    const controlEnabledVarsList: ControlEnabledVars = [];

    controlInfo.forEach(([id, info]) => {
      const varName =
        this.variablesStore.getState().variableFromId(id)?.name ?? 'Unknown';

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
