import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import { err, isErr, ok } from '../../../../types/result';
import {
  PHENOTYPE_STATUS,
  type ControlEnabledVars,
  type Oscillation,
  type PhenotypeControlEnabledVars,
  type PhenotypeStatus,
  type PhenotypeVars,
} from '../../../../types/types';
import type { ComputationManagerInt } from '../../ComputationManager/ComputationManagerInt';
import type { MessageInt } from '../../Message/MessageInt';
import type { LiveModelInt } from '../LiveModelInt';
import type { ControlLMInt } from './ControlLMInt';

/** Class to manage control information for live model variables */
class ControlLM implements ControlLMInt {
  // #region --- Properties + Constructor ---

  /** Reference to the live model instance */
  private liveModel: LiveModelInt;

  private computationManager: ComputationManagerInt;
  private messageServ: MessageInt;

  private controlStore: ZustandStore<ControlStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private modelUndoRedoStore: ZustandStore<UndoRedoState>;

  private oscillation: Oscillation = 'allowed';

  private onPhenotypeChange: Array<
    (inputNodes?: [number, PhenotypeStatus][] | null) => void
  >;

  private onControlChange: Array<
    (inputNodes?: [number, boolean][] | null) => void
  >;

  constructor(
    liveModel: LiveModelInt,
    computationManager: ComputationManagerInt,
    messageServ: MessageInt,
    controlStore: ZustandStore<ControlStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>
  ) {
    this.liveModel = liveModel;
    this.computationManager = computationManager;
    this.messageServ = messageServ;

    this.controlStore = controlStore;
    this.variablesStore = variablesStore;
    this.modelUndoRedoStore = modelUndoRedoStore;

    this.onControlChange = [];
    this.onPhenotypeChange = [];
  }

  // #endregion

  // #region --- Phenotype and Control-Enabled callbacks ---

  /** Add a callback to be executed when phenotype changes */
  public addOnPhenotypeChangeCallback(
    callback: (inputNodes?: [number, PhenotypeStatus][] | null) => void
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

  public changePhenotypeById(
    id: number,
    phenotype: PhenotypeStatus,
    addIntoUndoRedo: boolean,
    force: boolean = false,
    phenotypeId?: number
  ) {
    if (!force && !this.liveModel.modelCanBeModified('Control')) {
      return err(
        'Some event blocks the phenotype status change. Try again later.'
      );
    }

    const oldPhenotype = this.controlStore
      .getState()
      .getVariablePhenotype(id, phenotypeId);

    this.controlStore.getState().setPhenotype(id, phenotype, phenotypeId);

    const newPhenotype = this.controlStore
      .getState()
      .getVariablePhenotype(id, phenotypeId);

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

    return ok(true);
  }

  public changeControlEnabledById(
    id: number,
    controlEnabled: boolean,
    addIntoUndoRedo: boolean,
    force: boolean = false
  ) {
    if (!force && !this.liveModel.modelCanBeModified('Control')) {
      return err(
        'Some event blocks the control-enabled status change. Try again later.'
      );
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

    return ok(true);
  }

  public removeControlInfo(id: number, force = false) {
    if (!force && !this.liveModel.modelCanBeModified('Control')) {
      return;
    }

    this.controlStore.getState().removeInfo(id);
  }

  // #endregion

  // #region --- Multiple Phenotypes Operations ---

  changeCurrentlyEditedPhenotype(id: number) {
    const result = this.controlStore.getState().switchPhenotype(id);

    if (result === undefined) {
      return err("Phenotype doesn't exist.");
    }

    return ok(result);
  }

  createNewPhenotype(phenotypeName?: string) {
    const result = this.controlStore.getState().createPhenotype(phenotypeName);

    if (isErr(result)) {
      return result;
    }

    return ok(result.value);
  }

  renamePhenotype(id: number, newName: string) {
    if (id === -1) {
      const createdPhenotype = this.controlStore
        .getState()
        .createPhenotype(newName);

      if (isErr(createdPhenotype)) {
        return err('Failed to create phenotype with new name. ');
      }

      const shiftResult = this.controlStore
        .getState()
        .shiftPhenotype(id, createdPhenotype.value);

      if (isErr(shiftResult)) {
        this.controlStore.getState().removePhenotype(createdPhenotype.value);
        return err(
          `Failed to shift default phenotype into newly created phenotype.`
        );
      }

      this.messageServ.showSuccess(
        'Cannot rename default phenotype => Created new phenotype containing variables of default phenotype.'
      );

      return ok(newName);
    }

    const result = this.controlStore.getState().renamePhenotype(id, newName);

    if (isErr(result)) {
      return result;
    }

    return ok(result.value);
  }

  removePhenotype(id: number) {
    const result = this.controlStore.getState().removePhenotype(id);

    if (isErr(result)) {
      return result;
    }

    return ok(result.value);
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
        .getVariablePhenotype(variable.id);
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
