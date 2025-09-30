import useUpdateFunctionsStore from '../../../stores/LiveModel/useUpdateFunctionsStore';
import useVariablesStore from '../../../stores/LiveModel/useVariablesStore';
import type { ControlInfo, Position, Variable } from '../../../types';
import CytoscapeME from '../../model-editor/CytoscapeME/CytoscapeME';
import type { LiveModelClass } from './LiveModel';
import useRegulationsStore from '../../../stores/LiveModel/useRegulationsStore';
import useControlStore from '../../../stores/LiveModel/useControlStore';
import ComputationManager from '../ComputationManager/ComputationManager';
import Warning from '../Warning/Warning';

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
    if (!modAllowed && !this.liveModel.modelCanBeModified()) {
      console.log('Model cannot be modified at the moment add var.');
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

    // Todo - QuickHelp OFF;

    this.liveModel.UpdateFunctions.validateUpdateFunction(id);
    this.liveModel.Export.saveModel();
    return id;
  }

  /** Removes variable and displays warnings if necessary
   *  Returns true if the variable was removed, false otherwise.
   *  Shows warnings if there are existing results or if the user needs to confirm variable removal.
   */
  public async removeVariableWithWarnings(id: number): Promise<boolean> {
    const variable = useVariablesStore.getState().variableFromId(id);
    if (!variable || !this.liveModel.modelCanBeModified()) return false;

    if (!(await Warning.addRemoveVariableWarning(variable.name))) {
      return false;
    }

    this.removeVariable(id, true);
    return true;
  }

  /** Remove a variable by its ID */
  public removeVariable(id: number, force: boolean = false): void {
    if (!force && !this.liveModel.modelCanBeModified())
      return console.log('Model cannot be modified at the moment rem var.');

    const variable = useVariablesStore.getState().variableFromId(id);
    if (!variable) return;

    const updateTargets: number[] = [];
    const toRemove = useRegulationsStore
      .getState()
      .getAllRegulations()
      .filter((reg) => reg.regulator === id || reg.target === id);

    for (const reg of toRemove) {
      this.liveModel.Regulations.removeRegulation(
        reg.regulator,
        reg.target,
        force
      );
      updateTargets.push(reg.target);
    }

    ComputationManager.resetMaxSize();

    useVariablesStore.getState().removeVariable(id);
    this.liveModel.Control.removeControlInfo(id, force);
    this.liveModel.UpdateFunctions.deleteUpdateFunctionId(id);

    CytoscapeME.removeNode(id);

    if (this.liveModel.isEmpty()) {
      //Todo - add QuickHelp ON;
    }

    this.liveModel.Export.saveModel();

    for (const affectedId of updateTargets) {
      const fn = useUpdateFunctionsStore
        .getState()
        .getUpdateFunctionId(affectedId);
      if (fn !== undefined) {
        this.liveModel.UpdateFunctions.setUpdateFunction(
          affectedId,
          fn.functionString,
          force
        );
      }
      this.liveModel.UpdateFunctions.validateUpdateFunction(affectedId);
    }
  }

  /** Rename a variable by its ID */
  public renameVariable(
    id: number,
    newName: string,
    force: boolean = false
  ): string | undefined {
    if (!force && !this.liveModel.modelCanBeModified()) {
      console.log('Model cannot be modified at the moment rename var.');
      return;
    }

    const variable = useVariablesStore.getState().variableFromId(id);
    if (!variable) return;

    const error = this.checkVariableName(id, newName);
    if (error !== undefined) {
      return `${newName} ${error}`; //Strings.invalidVariableName(newName)
    }

    useVariablesStore.getState().renameVariable(id, newName);

    CytoscapeME.renameNode(id, newName);

    for (const reg of useRegulationsStore.getState().getAllRegulations()) {
      if (reg.regulator === id || reg.target === id) {
        this.liveModel.Regulations.regulationChanged(reg);
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
      this.removeVariable(id);
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
      this.removeVariable(id);
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
