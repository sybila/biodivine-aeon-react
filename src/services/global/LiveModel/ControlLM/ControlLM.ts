import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import {
  PHENOTYPE_STATUS,
  type ControlEnabledVars,
  type ControlStats,
  type Oscillation,
  type Phenotype,
  type PhenotypeControlEnabledVars,
  type PhenotypeVars,
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
    (inputNodes?: [number, Phenotype][] | null) => void
  >;

  private onControlChange: Array<
    (inputNodes?: [number, boolean][] | null) => void
  >;

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
    const controlEnabled = this.controlStore.getState().getAllControlEnabled();
    const phenotype = this.controlStore.getState().getAllCurrentPhenotype();
    const controlEnabledCount = controlEnabled.reduce(
      (acc: number, controlEnabled: boolean) => {
        if (controlEnabled) acc++;
        return acc;
      },
      0
    );
    const inPhenotypeCount = phenotype.reduce(
      (acc: number, phenotype: Phenotype) => {
        if (phenotype != PHENOTYPE_STATUS.NotInPhenotype) acc++;
        return acc;
      },
      0
    );
    return [controlEnabledCount, inPhenotypeCount];
  }

  /** Returns control statistics for the live model */
  public getControlStats(): ControlStats {
    const controlEnabled = this.controlStore.getState().getAllControlEnabled();
    const phenotype = this.controlStore.getState().getAllCurrentPhenotype();

    const stats: ControlStats = {
      controlEnabled: 0,
      notControlEnabled: 0,
      inPhenotypeTrue: 0,
      inPhenotypeFalse: 0,
      notInPhenotype: 0,
    };

    controlEnabled.forEach((variableControlEnabled) => {
      if (variableControlEnabled) stats.controlEnabled++;
      else stats.notControlEnabled++;
    });

    phenotype.forEach((variablePhenotype) => {
      if (variablePhenotype === PHENOTYPE_STATUS.InPhenotypeTrue)
        stats.inPhenotypeTrue++;
      else if (variablePhenotype === PHENOTYPE_STATUS.InPhenotypeFalse)
        stats.inPhenotypeFalse++;
      else stats.notInPhenotype++;
    });

    return stats;
  }

  // #endregion

  // #region --- Phenotype and Control-Enabled callbacks ---

  /** Add a callback to be executed when phenotype changes */
  public addOnPhenotypeChangeCallback(
    callback: (inputNodes?: [number, Phenotype][] | null) => void
  ): void {
    this.onPhenotypeChange.push(callback);
  }

  /** Add a callback to be executed when control enabled changes */
  public addOnControlChangeCallback(
    callback: (inputNodes?: [number, boolean][] | null) => void
  ): void {
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
  private runCallbacks<E>(
    callbacks: Array<(inputNodes?: [number, E][] | null) => void>,
    inputNodes?: [number, E][] | null
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
    if (!force && !this.liveModel.modelCanBeModified('Control')) {
      return;
    }

    const oldPhenotype = this.controlStore
      .getState()
      .getVariableCurrentPhenotype(id);

    this.controlStore.getState().setPhenotype(id, phenotype);

    const newPhenotype = this.controlStore
      .getState()
      .getVariableCurrentPhenotype(id);

    if (newPhenotype !== undefined) {
      this.runCallbacks(this.onPhenotypeChange, [[id, newPhenotype]]);
    }

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () => {
          this.changePhenotypeById(
            id,
            oldPhenotype ?? PHENOTYPE_STATUS.NotInPhenotype,
            false,
            false
          );
        },
        redo: () => {
          this.changePhenotypeById(
            id,
            phenotype ?? PHENOTYPE_STATUS.NotInPhenotype,
            false,
            false
          );
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
    if (!force && !this.liveModel.modelCanBeModified('Control')) {
      console.log(
        'Model cannot be modified at the moment change control enabled.'
      );
      return;
    }

    this.controlStore.getState().setControlEnabled(id, controlEnabled);

    const newControlEnabled = this.controlStore
      .getState()
      .getVariableControlEnabled(id);

    if (newControlEnabled != undefined) {
      this.runCallbacks(this.onControlChange, [[id, newControlEnabled]]);
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
    if (!force && !this.liveModel.modelCanBeModified('Control')) {
      return;
    }

    this.controlStore.getState().removeInfo(id);
  }

  // #endregion

  // #region --- Get Formated Control Info ---

  /** Get Phenotype and Control-Enabled variables formated into object { phenotypeVars: Record<VarName, Phenotype>, controlEnabledVars: Record<VarName, boolean> } */
  public getPhenotypeControlEnabledVars(): PhenotypeControlEnabledVars {
    const variables = this.variablesStore.getState().getAllVariables();

    const phenotypeVarsObj: PhenotypeVars = {};
    const controlEnabledVarsList: ControlEnabledVars = [];

    variables.forEach((variable) => {
      const phenotype = this.controlStore
        .getState()
        .getVariableCurrentPhenotype(variable.id);
      const controlEnabled = this.controlStore
        .getState()
        .getVariableControlEnabled(variable.id);
      if (
        phenotype !== PHENOTYPE_STATUS.NotInPhenotype &&
        phenotype !== undefined
      )
        phenotypeVarsObj[variable.name ?? 'Unknown'] = phenotype;
      if (controlEnabled)
        controlEnabledVarsList.push(variable.name ?? 'Unknown');
    });

    return {
      phenotypeVars: phenotypeVarsObj,
      controlEnabledVars: controlEnabledVarsList.sort(),
    };
  }

  // #endregion
}

export default ControlLM;
