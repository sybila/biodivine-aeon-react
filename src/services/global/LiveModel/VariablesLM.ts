import useUpdateFunctionsStore from '../../../stores/LiveModel/useUpdateFunctionsStore';
import useVariablesStore from '../../../stores/LiveModel/useVariablesStore';
import type { ControlInfo, Position, Variable } from '../../../types';
import CytoscapeME from '../../model-editor/CytoscapeME/CytoscapeME';
import type { LiveModelClass } from './LiveModel';
import useRegulationsStore from '../../../stores/LiveModel/useRegulationsStore';
import useControlStore from '../../../stores/LiveModel/useControlStore';
import ComputationManager from '../ComputationManager/ComputationManager';

/** Manage variables in the live model */
class VariablesLM {
  private idCounter = 0;

  private liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this.liveModel = liveModel;
  }

  // #region --- Variable Actions ---

  /** Add a variable to the model */
  public addVariable(
    modAllowed: boolean,
    position: Position = [0.0, 0.0],
    name?: string,
    controllable: boolean = true,
    phenotype: any = null
  ): number | undefined {
    if (!modAllowed && !this.liveModel._modelModified()) {
      return;
    }

    const id = this.idCounter++;
    const variableName = name ?? `v_${id + 1}`;

    const variable: Variable = {
      id,
      name: variableName,
    };

    const controlInfo: ControlInfo = {
      controlEnabled: controllable,
      phenotype: phenotype,
    };

    useVariablesStore.getState().addVariable(variable);
    useControlStore.getState().addInfo(id, controlInfo);

    CytoscapeME.addNode(id, variableName, position);

    ComputationManager.resetMaxSize();

    // Todo
    //UI.Visible.setQuickHelpVisible(false);

    this.liveModel.UpdateFunctions._validateUpdateFunction(id);
    this.liveModel.Export.saveModel();
    return id;
  }

  /** Remove a variable by its ID */
  public removeVariable(id: number, force = false): void {
    if (!force && !this.liveModel._modelModified()) return;

    const variable = useVariablesStore.getState().variableFromId(id);
    if (!variable) return;

    if (force || confirm(variable.name)) {
      //Strings.removeNodeCheck(variable.name)
      const updateTargets: number[] = [];
      const toRemove = useRegulationsStore
        .getState()
        .getAllRegulations()
        .filter((reg) => reg.regulator === id || reg.target === id);

      for (const reg of toRemove) {
        this.liveModel.Regulations._removeRegulation(reg);
        updateTargets.push(reg.target);
      }

      ComputationManager.resetMaxSize();

      useVariablesStore.getState().removeVariable(id);
      this.liveModel.Control.removeControlInfo(id);
      this.liveModel.UpdateFunctions.deleteUpdateFunctionId(id);

      CytoscapeME.removeNode(id);

      if (this.liveModel.isEmpty()) {
        //UI.Visible.setQuickHelpVisible(true);
      }

      this.liveModel.Export.saveModel();

      for (const affectedId of updateTargets) {
        const fn = useUpdateFunctionsStore
          .getState()
          .getUpdateFunctionId(affectedId);
        if (fn !== undefined) {
          this.liveModel.UpdateFunctions.setUpdateFunction(
            affectedId,
            fn.functionString
          );
        }
        this.liveModel.UpdateFunctions._validateUpdateFunction(affectedId);
      }
    }
  }

  /** Rename a variable by its ID */
  public renameVariable(id: number, newName: string): string | undefined {
    if (!this.liveModel._modelModified()) return;

    const variable = useVariablesStore.getState().variableFromId(id);
    if (!variable) return;

    const error = this.checkVariableName(id, newName);
    if (error !== undefined) {
      return `${newName} ${error}`; //Strings.invalidVariableName(newName)
    }

    useVariablesStore.getState().renameVariable(id, newName);

    CytoscapeME.renameNode(id, newName);
    //ControllableEditor.renameVariable(id, newName);
    //PhenotypeEditor.renameVariable(id, newName);
    //ModelEditor.renameVariable(id, newName, oldName);

    for (const reg of useRegulationsStore.getState().getAllRegulations()) {
      if (reg.regulator === id || reg.target === id) {
        this.liveModel.Regulations._regulationChanged(reg);
      }
    }

    this.liveModel.Export.saveModel();
    return undefined;
  }

  // #endregion

  public pruneConstants(force = false): number {
    const toRemove: number[] = [];
    const variables = useVariablesStore.getState().getAllVariables();

    for (const variable of variables) {
      const id = variable.id;
      const isConstant =
        useRegulationsStore.getState().regulationsOf(id).length === 0 &&
        (force ||
          useUpdateFunctionsStore.getState().getUpdateFunctionId(id) ===
            undefined);

      if (isConstant) {
        toRemove.push(id);
      }
    }

    console.log('To remove:', toRemove);
    for (const id of toRemove) {
      this.removeVariable(id, true);
    }

    return toRemove.length;
  }

  public pruneOutputs(): number {
    const toRemove: number[] = [];
    const variables = useVariablesStore.getState().getAllVariables();

    for (const variable of variables) {
      const id = variable.id;
      if (useRegulationsStore.getState().regulationsFrom(id).length === 0) {
        toRemove.push(id);
      }
    }

    console.log('To remove:', toRemove);
    for (const id of toRemove) {
      this.removeVariable(id, true);
    }

    return toRemove.length;
  }

  public isEmpty(): boolean {
    return useVariablesStore.getState().isEmpty();
  }

  public clear() {
    for (const variable of useVariablesStore.getState().getAllVariables()) {
      this.removeVariable(variable.id, true);
    }
  }

  /** Check if a variable name is valid */
  private checkVariableName(id: number, name: string): string | undefined {
    if (typeof name !== 'string') return 'Name must be a string.';
    if (!/^[a-z0-9{}_]+$/i.test(name)) {
      return 'Name can only contain letters, numbers and `_`, `{`, `}`.';
    }
    const existing = useVariablesStore.getState().variableFromName(name);
    if (existing && existing.id !== id) {
      return 'Variable with this name already exists';
    }
    return undefined;
  }
}

export default VariablesLM;
