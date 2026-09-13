import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { UpdateFunctionStatus } from '../../../../types/types';
import type { ComputeEngineInt } from '../../ComputeEngine/ComputeEngineInt';
import type { MessageInt } from '../../Message/MessageInt';
import type { ModelInt } from './ModelInt';

class Model implements ModelInt {
  // #region --- Props + Constructor ---

  private messageServ: MessageInt;
  private computeEngine: ComputeEngineInt;

  private variablesStore: ZustandStore<VariablesStatus>;

  private addComputationBlockingOperation: (
    operationName: string,
    value: string
  ) => void;
  private deleteComputationBlockingOperation: (operationName: string) => void;

  private isComputeEngineConnected: () => boolean;

  constructor(
    messageServ: MessageInt,
    computeEngine: ComputeEngineInt,
    variablesStore: ZustandStore<VariablesStatus>,

    addComputationBlockingOperation: (
      operationName: string,
      value: string
    ) => void,
    deleteComputationBlockingOperation: (operationName: string) => void,
    isComputeEngineConnected: () => boolean
  ) {
    this.messageServ = messageServ;
    this.computeEngine = computeEngine;

    this.variablesStore = variablesStore;

    this.addComputationBlockingOperation = addComputationBlockingOperation;
    this.deleteComputationBlockingOperation =
      deleteComputationBlockingOperation;
    this.isComputeEngineConnected = isComputeEngineConnected;
  }

  // #region --- Attractor Analysis Computation ---

  // #region --- Update Functions ---

  private validateUpdateFunctionCallback(
    variableId: number,
    response: UpdateFunctionStatus | undefined,
    setUpdateFunctionStatus: (status: UpdateFunctionStatus) => void
  ): void {
    if (!response) {
      this.messageServ.showError(
        `Error validating update function for variable ${this.variablesStore
          .getState()
          .getVariableName(variableId)}`
      );
      setUpdateFunctionStatus({
        status: 'Error validating update function',
        isError: true,
      });
    } else {
      setUpdateFunctionStatus(response);
    }

    this.deleteComputationBlockingOperation(
      'Validating update function ' + variableId
    );
  }

  public validateUpdateFunction(
    variableId: number,
    updateFunctionFragment: string,
    setUpdateFunctionStatus: (status: UpdateFunctionStatus) => void
  ): void {
    if (this.isComputeEngineConnected()) {
      this.addComputationBlockingOperation(
        'Validating update function ' + variableId,
        "'Validating update function'"
      );

      this.computeEngine.validateUpdateFunction(
        variableId,
        updateFunctionFragment,
        (variableId, response) =>
          this.validateUpdateFunctionCallback(
            variableId,
            response,
            setUpdateFunctionStatus
          )
      );
    } else {
      setUpdateFunctionStatus({
        status:
          'Cannot validate update function:\n Compute engine not connected',
        isError: true,
      });
    }
  }

  // #endregion
}

export default Model;
