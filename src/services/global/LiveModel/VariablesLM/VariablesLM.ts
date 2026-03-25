import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { RegulationsStatus } from '../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablePositionsState } from '../../../../stores/LiveModel/VariablePositions/VariablePostionsState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { ControlInfo, Position, Variable } from '../../../../types';
import type { ComputationManagerInt } from '../../ComputationManager/ComputationManagerInt';
import type { WarningInt } from '../../Warning/WarningInt';
import type { LiveModelInt } from '../LiveModelInt';
import type { VariablesLMInt } from './VariablesLMInt';

/** Manage variables in the live model */
class VariablesLM implements VariablesLMInt {
  // #region --- Properties + Constructor ---

  /** Counter for generating unique variable IDs */
  private idCounter = 0;

  /** Function which adds node to the model visualization */
  private addNodeFromVisualizationFunction: (
    id: number,
    variableName: string,
    position?: Position
  ) => void = (_: number, __: string, ___?: Position) => {
    console.warn(
      'VariablesLM: No function set to add node from model visualization'
    );
  };

  /** Function which removes node from the model visualization */
  private removeNodeFromVisualizationFunction: (variableId: number) => void = (
    _
  ) => {
    console.warn(
      'VariablesLM: No function set to remove node from model visualization'
    );
  };

  /** Function which returns position of node inside the visualization. */
  private getNodePositionFromVisualizationFunction: (
    variableId: number
  ) => Position | undefined = (_) => {
    console.warn(
      'VariablesLM: No function set to get node position from model visualization'
    );
    return undefined;
  };

  /** Function which renames node in the model visualization */
  private renameNodeFromVisualizationFunction: (
    variableId: number,
    newName: string
  ) => void = (_, __) => {
    console.warn(
      'VariablesLM: No function set to rename node from model visualization'
    );
  };

  private liveModel: LiveModelInt;
  private computationManagerServ: ComputationManagerInt;
  private warningServ: WarningInt;

  private controlStore: ZustandStore<ControlStatus>;
  private regulationsStore: ZustandStore<RegulationsStatus>;
  private updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private undoRedoStore: ZustandStore<UndoRedoState>;
  private variablePositionsStore: ZustandStore<VariablePositionsState>;

  constructor(
    liveModel: LiveModelInt,
    computationManagerServ: ComputationManagerInt,
    warningServ: WarningInt,

    controlStore: ZustandStore<ControlStatus>,
    regulationsStore: ZustandStore<RegulationsStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    variablesStore: ZustandStore<VariablesStatus>,
    undoRedoStore: ZustandStore<UndoRedoState>,
    variablePositionsStore: ZustandStore<VariablePositionsState>
  ) {
    this.liveModel = liveModel;
    this.computationManagerServ = computationManagerServ;
    this.warningServ = warningServ;

    this.controlStore = controlStore;
    this.regulationsStore = regulationsStore;
    this.updateFunctionsStore = updateFunctionsStore;
    this.variablesStore = variablesStore;
    this.undoRedoStore = undoRedoStore;
    this.variablePositionsStore = variablePositionsStore;
  }

  // #endregion

  // #region --- Setters for Model Visualization functions ---

  public setAddNodeFromVisualizationFunction(
    func: (id: number, variableName: string, position?: Position) => void
  ): void {
    if (func != undefined) {
      this.addNodeFromVisualizationFunction = func;
    }
  }

  public setRemoveNodeFromVisualizationFunction(
    func: (variableId: number) => void
  ): void {
    if (func != undefined) {
      this.removeNodeFromVisualizationFunction = func;
    }
  }

  public setRenameNodeFromVisualizationFunction(
    func: (variableId: number, newName: string) => void
  ): void {
    if (func != undefined) {
      this.renameNodeFromVisualizationFunction = func;
    }
  }

  public setGetNodePositionFromVisualizationFunction(
    func: (variableId: number) => Position | undefined
  ): void {
    if (func != undefined) {
      this.getNodePositionFromVisualizationFunction = func;
    }
  }

  // #endregion

  // #region --- Variable Actions ---

  /** Add a variable to the model */
  public addVariable(
    modAllowed: boolean,
    addIntoUndoRedo: boolean,
    position: Position = [0.0, 0.0],
    id?: number,
    name?: string,
    controllable: boolean = true,
    phenotype: any = null
  ): number | undefined {
    if (!modAllowed && !this.liveModel.modelCanBeModified()) {
      return;
    }

    const variableId: number = id ?? this.idCounter++;
    const variableName = name ?? `v_${variableId + 1}`;

    const variable: Variable = {
      id: variableId,
      name: variableName,
    };

    const controlInfo: ControlInfo = {
      controlEnabled: controllable,
      phenotype: phenotype,
    };

    this.variablesStore.getState().addVariable(variable);
    this.controlStore.getState().addInfo(variableId, controlInfo);
    this.variablePositionsStore
      .getState()
      .setVariablePosition(variableId, position);

    this.addNodeFromVisualizationFunction(variableId, variableName, position);

    this.computationManagerServ.resetMaxSize();

    // Todo - QuickHelp OFF;

    this.liveModel.UpdateFunctions.validateUpdateFunction(variableId);
    this.liveModel.Export.saveModel();

    if (addIntoUndoRedo) {
      this.undoRedoStore.getState().addOperation({
        undo: () => this.removeVariable(variableId, false),
        redo: () =>
          this.addVariable(
            false,
            false,
            position,
            variableId,
            variableName,
            controllable,
            phenotype
          ),
      });
    }

    return variableId;
  }

  /** Removes variable and displays warnings if necessary
   *  Returns true if the variable was removed, false otherwise.
   *  Shows warnings if there are existing results or if the user needs to confirm variable removal.
   */
  public async removeVariableWithWarnings(
    id: number,
    addIntoUndoRedo: boolean
  ): Promise<boolean> {
    const variable = this.variablesStore.getState().variableFromId(id);
    if (!variable || !this.liveModel.modelCanBeModified()) return false;

    if (!(await this.warningServ.addRemoveVariableWarning(variable.name))) {
      return false;
    }

    this.removeVariable(id, addIntoUndoRedo, true);
    return true;
  }

  /** Remove a variable by its ID */
  public removeVariable(
    id: number,
    addIntoUndoRedo: boolean,
    force: boolean = false
  ): void {
    if (!force && !this.liveModel.modelCanBeModified()) return;

    const variable = this.variablesStore.getState().variableFromId(id);
    if (!variable) return;

    const controlInfo = this.controlStore.getState().getVariableControlInfo(id);
    const position = this.getNodePositionFromVisualizationFunction(id);

    const updateTargets: number[] = [];
    const toRemove = this.regulationsStore
      .getState()
      .getAllRegulations()
      .filter((reg) => reg.regulator === id || reg.target === id);

    for (const reg of toRemove) {
      this.liveModel.Regulations.removeRegulation(
        false,
        reg.regulator,
        reg.target,
        force
      );
      updateTargets.push(reg.target);
    }

    this.computationManagerServ.resetMaxSize();

    this.variablesStore.getState().removeVariable(id);
    this.liveModel.Control.removeControlInfo(id, force);
    this.liveModel.UpdateFunctions.deleteUpdateFunctionId(id);
    this.variablePositionsStore.getState().removeVariablePosition(id);

    this.removeNodeFromVisualizationFunction(id);

    if (this.liveModel.isEmpty()) {
      //Todo - add QuickHelp ON;
    }

    this.liveModel.Export.saveModel();

    // TODO - optimize by only validating
    for (const affectedId of updateTargets) {
      const fn = this.updateFunctionsStore
        .getState()
        .getUpdateFunctionId(affectedId);
      if (fn !== undefined) {
        this.liveModel.UpdateFunctions.setUpdateFunction(
          affectedId,
          fn.functionString,
          false,
          force
        );
      }
      this.liveModel.UpdateFunctions.validateUpdateFunction(affectedId);
    }

    if (addIntoUndoRedo) {
      this.undoRedoStore.getState().addOperation({
        undo: () => {
          this.addVariable(
            false,
            false,
            position ?? [0, 0],
            variable.id,
            variable.name,
            controlInfo?.controlEnabled ?? true,
            controlInfo?.phenotype ?? null
          );
          // TODO - remove set timeout after fixing problem with cytoscape not updating fast enough after adding node back (causes edges to not be rendered, because they are added before the node is rendered)
          setTimeout(() => {
            for (const reg of toRemove) {
              this.liveModel.Regulations.addRegulation(
                false,
                false,
                reg.regulator,
                reg.target,
                reg.observable,
                reg.monotonicity
              );
            }
          }, 50);
        },
        redo: () => this.removeVariable(id, false, false),
      });
    }
  }

  /** Rename a variable by its ID */
  public renameVariable(
    id: number,
    newName: string,
    force: boolean = false
  ): string | undefined {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return;
    }

    const variable = this.variablesStore.getState().variableFromId(id);
    if (!variable) return;

    const error = this.checkVariableName(id, newName);
    if (error !== undefined) {
      return error;
    }

    this.variablesStore.getState().renameVariable(id, newName);

    this.renameNodeFromVisualizationFunction(id, newName);
    // TODO - remove
    //CytoscapeME.renameNode(id, newName);

    for (const reg of this.regulationsStore.getState().getAllRegulations()) {
      if (reg.regulator === id || reg.target === id) {
        this.liveModel.Regulations.regulationChanged(reg);
      }
    }

    this.liveModel.Export.saveModel();
    return undefined;
  }

  // #endregion

  // #region --- Pruning ---

  /** Remove all variables that are not used in any regulation.
   *  Returns the number of removed variables.
   */
  public pruneConstants(force = false): number {
    const toRemove: number[] = [];
    const variables = this.variablesStore.getState().getAllVariables();

    for (const variable of variables) {
      const id = variable.id;
      const isConstant =
        this.regulationsStore.getState().regulationsOf(id).length === 0 &&
        (force ||
          this.updateFunctionsStore.getState().getUpdateFunctionId(id) ===
            undefined);

      if (isConstant) {
        toRemove.push(id);
      }
    }

    for (const id of toRemove) {
      this.removeVariable(id, false);
    }

    return toRemove.length;
  }

  /** Remove all variables that have no outgoing regulations (no targets).
   *  Returns the number of removed variables.
   */
  public pruneOutputs(): number {
    const toRemove: number[] = [];
    const variables = this.variablesStore.getState().getAllVariables();

    for (const variable of variables) {
      const id = variable.id;
      if (this.regulationsStore.getState().regulationsFrom(id).length === 0) {
        toRemove.push(id);
      }
    }

    for (const id of toRemove) {
      this.removeVariable(id, false);
    }

    return toRemove.length;
  }

  // #endregion

  // #region --- Validation ---

  /** Check if a variable name is valid.
   *  Returns undefined if the name is valid, otherwise returns an error message.
   */
  private checkVariableName(id: number, name: string): string | undefined {
    if (typeof name !== 'string') return 'Name must be a string.';
    if (!/^[a-z0-9{}_]+$/i.test(name)) {
      return 'Name can only contain letters, numbers and `_`, `{`, `}`.';
    }
    const existing = this.variablesStore.getState().variableFromName(name);
    if (existing && existing.id !== id) {
      return 'Variable with this name already exists';
    }
    return undefined;
  }

  // #endregion

  // #region --- Variables status ---

  /** True if the model has no variables. */
  public isEmpty(): boolean {
    return this.variablesStore.getState().isEmpty();
  }

  /** Removes all variables from the model. */
  public clear() {
    for (const variable of this.variablesStore.getState().getAllVariables()) {
      this.removeVariable(variable.id, false, true);
    }
  }

  // #endregion
}

export default VariablesLM;
