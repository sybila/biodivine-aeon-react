import {
  PHENOTYPE_STATUS,
  type PhenotypeStatus,
} from '../../../../../types/types';
import SelectionButtonsTooltips from '../../common-tooltips/SelectionButtonTooltips';
import type { TooltipsInt } from './TooltipsInt';

class Tooltips extends SelectionButtonsTooltips implements TooltipsInt {
  // #region Variable Info

  public variableArity(arity: number) {
    return 'Arity: ' + arity + '.';
  }

  // #endregion

  // #region Base Variable Operations

  public changeVariableName() {
    return 'Change the name of the variable.';
  }

  public changeVariableUpdateFunction() {
    return 'Change the update function of the variable.';
  }

  public searchVariable() {
    return 'Search for a variable.';
  }

  public addNewVariable() {
    return 'Add a new variable.';
  }

  public deleteVariable() {
    return 'Delete variable.';
  }

  public findVariableInVisualization() {
    return 'Find the variable in the visualization.';
  }

  // #endregion

  // #region Model Operations

  public changeModelName() {
    return 'Change the name of the model.';
  }

  // #endregion

  // #region Regulations

  public createRegulation() {
    return 'Create a new regulation.';
  }

  public removeRegulation() {
    return 'Remove the selected regulation.';
  }

  public changeMonotonicity() {
    return 'Change the monotonicity of the regulation.';
  }

  public changeObservability() {
    return 'Change the observability of the regulation.';
  }

  // #endregion

  // #region Control-Enabled

  public currentControlEnabled(controlEnabledValue: boolean) {
    return (
      'The variable is currently ' +
      (controlEnabledValue ? 'Control Enabled' : 'Not Control Enabled') +
      '.'
    );
  }

  public changeVariableControlEnabled(controlEnabledValue: boolean) {
    const controlEnabledString = controlEnabledValue
      ? 'Control Enabled'
      : 'Not Control Enabled';

    return (
      'Change the control enabled status of the variable to "' +
      controlEnabledString +
      '".'
    );
  }

  // #endregion

  // #region Phenotype

  public changeOscillation(oscillationValue: string) {
    return (
      'Change the oscillation of the variable to "' + oscillationValue + '".'
    );
  }

  public currentPhenotype(phenotypeValue: PhenotypeStatus) {
    if (phenotypeValue != undefined) {
      const phenotypeString =
        phenotypeValue === PHENOTYPE_STATUS.InPhenotypeTrue
          ? 'In Phenotype as Positive'
          : phenotypeValue === PHENOTYPE_STATUS.InPhenotypeFalse
            ? 'In Phenotype as Negative'
            : 'Not In Phenotype';

      return (
        'The current phenotype status of the variable is "' +
        phenotypeString +
        '".'
      );
    }

    return 'The variable is currently not part of the phenotype.';
  }

  public changeVariablePhenotype(phenotypeValue: string) {
    return 'Change the phenotype of the variable to "' + phenotypeValue + '".';
  }

  public removeVariableFromPhenotype() {
    return 'Remove the variable from the phenotype.';
  }

  public createNewPhenotypeButton() {
    return 'Create new phenotype.';
  }

  public renamePhenotypeButton() {
    return 'Rename currently active phenotype.';
  }

  public deletePhenotypeButton(isDefaultPhenotype: boolean) {
    return isDefaultPhenotype
      ? 'Default phenotype cannot be deleted.'
      : 'Delete this phenotype.';
  }

  public changePhenotypeInComputationStatusButton(
    includedInComputation: boolean
  ): string {
    return includedInComputation
      ? 'Remove phenotype from future computations.'
      : 'Include phenotype in future computations.';
  }

  // #endregion

  // #region Visual Options

  variableLayout(layoutName: string): string {
    return 'Change the layout of the variables to "' + layoutName + '" layout.';
  }

  variableSelectedLayout(layoutName: string): string {
    return (
      'Change the layout of the selected variables to "' +
      layoutName +
      '" layout.'
    );
  }

  highlightVariable(highlightType: string): string {
    return 'Highlight variables by "' + highlightType + '".';
  }

  // #endregion

  // #region General Operations

  public showModelDescription() {
    return 'Show the description of the model.';
  }

  public hideModelDescription() {
    return 'Hide the description of the model.';
  }

  public extendAllVariables() {
    return 'Extend all variables.';
  }

  public collapseAllVariables() {
    return 'Collapse all variables.';
  }

  // #endregion

  // #region Variable Name Overlay

  public ApplyNewName() {
    return 'Apply new name of variable. (Enter)';
  }

  public RevertToOldName() {
    return 'Keep the original name of variable. (Esc)';
  }

  // #endregion

  // #region Change Update Function Overlay

  public ApplyUpdateFunction() {
    return 'Apply new update function for  variable. (Enter)';
  }

  public ValidateUpdateFunction() {
    return 'Validate the new update function. (Ctrl + Enter)';
  }

  public RevertUpdateFunction() {
    return 'Keep the original update function of variable. (Esc)';
  }

  // #endregion

  // #region Text Editor Menu

  loadCurrentModelButton(): string {
    return 'Load model text into text editor.';
  }

  importEditedModelButton(): string {
    return 'Import edited model into application.';
  }

  //#endregion

  // #region Utilities Menu

  public utilitiesMenu() {
    return 'Show/Hide Utilities Menu';
  }

  public variableSearch() {
    return 'Zoom on variables in model visualization.';
  }

  public undoButton() {
    return 'Revert last modification.';
  }

  redoButton(): string {
    return 'Reapply previously reverted modification.';
  }

  public fit() {
    return 'Fit model into the canvas.';
  }

  // #endregion
}

export default Tooltips;
