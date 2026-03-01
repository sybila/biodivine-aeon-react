import type { ResultsStatus } from '../../../stores/ComputationManager/ResultStatus/ResultStatus';
import useResultsStatus from '../../../stores/ComputationManager/ResultStatus/useResultsStatus';
import type { TabsState } from '../../../stores/Navigation/TabState';
import useTabsStore from '../../../stores/Navigation/useTabsStore';
import useWarningStore from '../../../stores/Warning/useWarningStore';
import type { WarningState } from '../../../stores/Warning/WarningState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import WaiterFunction from '../../utilities/WaiterFunction/WaiterFunction';
import type { WarningInt } from './WarningInt';

/** Service for managing warnings in the application */
class WarningClass implements WarningInt {
  // #region --- Attributes + Constructor ---

  private resultsStatusStore: ZustandStore<ResultsStatus>;
  private tabsStore: ZustandStore<TabsState>;
  private warningStore: ZustandStore<WarningState>;

  constructor(
    resultsStatusStore: ZustandStore<ResultsStatus>,
    tabsStore: ZustandStore<TabsState>,
    warningStore: ZustandStore<WarningState>
  ) {
    this.resultsStatusStore = resultsStatusStore;
    this.tabsStore = tabsStore;
    this.warningStore = warningStore;
  }

  // #region --- Starting Computation Warning ---

  /** Adds a warning about starting a new computation that will clear results and close tabs. */
  public addStartComputationResultsWarning(computationFunction: () => void) {
    this.warningStore
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

  // #endregion

  // #region --- Import Model Warnings ---

  /** Adds a warning about importing a new model that will erase the current model.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  public async addImportModelEraseModelWarning(): Promise<boolean> {
    return this.addWaiterFunctionWarning(
      'Importing a new model will erase the current model. Do you want to proceed?',
      () => {}
    );
  }

  // #endregion

  // #region --- Variable Warnings ---

  /** Adds a warning about removing a variable and its associated regulations.
   *  @param variableName - The name of the variable to be removed.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  public async addRemoveVariableWarning(
    variableName: string
  ): Promise<boolean> {
    return this.addWaiterFunctionWarning(
      `Are you sure you want to remove the variable "${variableName}"? This will also remove all associated regulations.`,
      () => {}
    );
  }

  // #endregion

  // #region --- Regulation Warnings ---

  /** Adds a warning about creating a missing regulation. */
  public addCreateMissingRegulationWarning(
    regulatorName: string,
    targetName: string,
    createFunction: () => void
  ): void {
    this.warningStore
      .getState()
      .addWarning(
        `Variable '${regulatorName}' does not regulate '${targetName}'. Do you want to create this regulation?`,
        [
          { text: 'Cancel', action: () => {} },
          {
            text: 'Proceed',
            action: () => {
              createFunction();
            },
          },
        ]
      );
  }

  // #endregion

  // #region --- Model Modification Warning ---

  /** Adds a warning that modifying the model will clear the results and close all tabs except for the Model Editor tab. */
  public addModelModificationRemoveResultsWarning(): void {
    this.warningStore
      .getState()
      .addWarning(
        'Modifying the model will delete all results and close every tab except the Model Editor.',
        [
          {
            text: 'Cancel',
            buttonWidth: '150px',
            action: () => {},
          },
          {
            text: 'Delete Results',
            buttonWidth: '150px',
            action: () => {
              this.resultsStatusStore.getState().clear();
              this.tabsStore.getState().clear();
            },
          },
        ]
      );
  }

  // #endregion

  // #region --- Universal Warnings ---

  /** Adds a warning that performing operation will clear the results and close all tabs except for the Model Editor tab.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  public async addRemoveResultsWarning(operation: string): Promise<boolean> {
    return this.addWaiterFunctionWarning(
      operation +
        ' will clear the results and close all tabs except for the Model Editor tab. Do you want to proceed?',
      () => {
        this.resultsStatusStore.getState().clear();
        this.tabsStore.getState().clear();
      }
    );
  }

  // #endregion

  // #region --- Private Helper Functions ---

  /** Adds a warning using async waiter function for resolve.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  private async addWaiterFunctionWarning(
    message: string,
    action: () => void
  ): Promise<boolean> {
    const waiter = WaiterFunction.createWaiterFunction<boolean>();

    this.warningStore.getState().addWarning(message, [
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

  // #endregion
}

const Warning = new WarningClass(
  useResultsStatus,
  useTabsStore,
  useWarningStore
);

export default Warning;
