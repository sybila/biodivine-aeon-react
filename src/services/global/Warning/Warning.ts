import useResultsStatus from '../../../stores/ComputationManager/useResultsStatus';
import useTabsStore from '../../../stores/Navigation/useTabsStore';
import useWarningStore from '../../../stores/Warning/useWarningStore';
import WaiterFunction from '../../utilities/WaiterFunction';

/** Service for managing warnings in the application */
class Warning {
  /** Adds a warning about starting a new computation that will clear results and close tabs. */
  public static addStartComputationResultsWarning(
    computationFunction: () => void
  ) {
    useWarningStore
      .getState()
      .addWarning(
        'Starting a new computation will clear the results and close all tabs except for the Model Editor tab. Do you want to proceed?',
        [
          { text: 'Cancel', action: () => {} },
          {
            text: 'Proceed',
            action: () => {
              computationFunction();
            },
          },
        ]
      );
  }

  /** Adds a warning using async waiter function for resolve.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  private static async addWaiterFunctionWarning(
    message: string,
    action: () => void
  ): Promise<boolean> {
    const waiter = WaiterFunction.createWaiterFunction<boolean>();

    useWarningStore.getState().addWarning(message, [
      {
        text: 'Cancel',
        action: () => {
          waiter.resolver(false);
        },
      },
      {
        text: 'Proceed',
        action: () => {
          action();
          waiter.resolver(true);
        },
      },
    ]);

    return waiter.promise();
  }

  /** Adds a warning about importing a new model that will erase the current model.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  public static async addImportModelEraseModelWarning(): Promise<boolean> {
    return this.addWaiterFunctionWarning(
      'Importing a new model will erase the current model. Do you want to proceed?',
      () => {}
    );
  }

  /** Adds a warning about importing a new model that will clear the results and close all tabs except for the Model Editor tab.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  public static async addImportModelResultsWarning(): Promise<boolean> {
    return this.addWaiterFunctionWarning(
      'Importing a new model will clear the results and close all tabs except for the Model Editor tab. Do you want to proceed?',
      () => {
        useResultsStatus.getState().clear();
        useTabsStore.getState().clear();
      }
    );
  }
}

export default Warning;
