import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import { err, isErr, ok } from '../../../../types/result';
import {
  PHENOTYPE_STATUS,
  type ControlEnabledVars,
  type Oscillation,
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

  public addOnPhenotypeChangeCallback(
    callback: (inputNodes?: [number, PhenotypeStatus][] | null) => void
  ): void {
    this.onPhenotypeChange.push(callback);
  }

  public addOnControlChangeCallback(
    callback: (inputNodes?: [number, boolean][] | null) => void
  ): void {
    this.onControlChange.push(callback);
  }

  // #endregion

  // #region --- Oscillation ---

  public setOscillation(oscillation: Oscillation) {
    this.oscillation = oscillation;
  }

  public getOscillation() {
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
      return ok(false);
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
      return ok(false);
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

  createNewPhenotype(
    addIntoUndoRedo: boolean,
    phenotypeName?: string,
    phenotypeId?: number,
    force = false
  ) {
    if (!force && !this.liveModel.modelCanBeModified('Control')) {
      return ok(undefined);
    }

    const result = this.controlStore
      .getState()
      .createPhenotype(phenotypeName, phenotypeId);

    if (isErr(result)) {
      return result;
    }

    const phenName = this.controlStore.getState().phenotypes[result.value].name;

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () => {
          this.removePhenotype(result.value, false);
        },
        redo: () => {
          this.createNewPhenotype(false, phenName, result.value, false);
        },
      });
    }

    return ok(result.value);
  }

  renamePhenotype(id: number, newName: string, addIntoUndoRedo: boolean) {
    if (!this.liveModel.modelCanBeModified('Control')) {
      return ok(false);
    }

    const oldName = this.controlStore.getState().phenotypes[id].name;

    if (oldName === undefined) {
      return err("Phenotype with this Id doesn't exist.");
    }

    let undoFunction = () => {
      this.controlStore.getState().renamePhenotype(id, oldName);
    };
    let redoFunction = () => {
      this.controlStore.getState().renamePhenotype(id, newName);
    };

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

      undoFunction = () => {
        this.controlStore.getState().shiftPhenotype(createdPhenotype.value, id);
        this.removePhenotype(createdPhenotype.value, false);
      };
      redoFunction = () => {
        this.controlStore
          .getState()
          .createPhenotype(newName, createdPhenotype.value);
        this.controlStore.getState().shiftPhenotype(id, createdPhenotype.value);
      };
    } else {
      const result = this.controlStore.getState().renamePhenotype(id, newName);

      if (isErr(result)) {
        return result;
      }
    }

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () => {
          undoFunction();
        },
        redo: () => {
          redoFunction();
        },
      });
    }

    return ok(true);
  }

  removePhenotype(id: number, addIntoUndoRedo: boolean) {
    if (!this.liveModel.modelCanBeModified('Control')) {
      return ok(false);
    }

    const phenotypeSave = this.controlStore.getState().phenotypes[id];

    if (!phenotypeSave) {
      return err("Phenotype with this Id doesn't exist.");
    }

    const result = this.controlStore.getState().removePhenotype(id);

    if (isErr(result)) {
      return result;
    }

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () => {
          this.controlStore
            .getState()
            .createPhenotype(phenotypeSave.name, id, phenotypeSave.variables);
        },
        redo: () => {
          this.removePhenotype(id, false);
        },
      });
    }

    return ok(true);
  }

  // TODO - rewrite this function when multiple phenotypes in computation are allowed
  includePhenotypeInComp(id: number) {
    if (!this.liveModel.modelCanBeModified('Control')) {
      return ok(false);
    }

    const result = this.controlStore.getState().includePhenotypeInComp(id);

    if (isErr(result)) {
      return result;
    }

    this.controlStore
      .getState()
      .phenotypesUsedInComputation.forEach((phenId) => {
        if (id != phenId) {
          this.removePhenotypeFromComp(phenId);
        }
      });

    return ok(true);
  }

  removePhenotypeFromComp(id: number) {
    if (!this.liveModel.modelCanBeModified('Control')) {
      return ok(false);
    }

    if (this.controlStore.getState().phenotypesUsedInComputation.size < 2) {
      return err('At least one phenotype must be included for computations.');
    }

    const result = this.controlStore.getState().removePhenotypeFromComp(id);

    return isErr(result) ? result : ok(true);
  }

  // #endregion

  // #region --- Get Formated Control Info ---

  public getPhenotypeControlEnabledVars() {
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
