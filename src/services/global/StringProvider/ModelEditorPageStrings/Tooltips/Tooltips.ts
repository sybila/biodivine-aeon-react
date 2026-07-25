import { PHENOTYPE_STATUS, type Phenotype } from '../../../../../types';
import SelectionButtonsTooltips from '../../common-tooltips/SelectionButtonTooltips';
import type { TooltipsInt } from './TooltipsInt';

class Tooltips extends SelectionButtonsTooltips implements TooltipsInt {
  // #region Variable Info

  public variableArity(arity: number): string {
    return 'Arity: ' + arity + '.';
  }

  // #endregion

  // #region Base Variable Operations

  public changeVariableName(): string {
    return 'Change the name of the variable.';
  }

  public changeVariableUpdateFunction(): string {
    return 'Change the update function of the variable.';
  }

  public searchVariable(): string {
    return 'Search for a variable.';
  }

  public addNewVariable(): string {
    return 'Add a new variable.';
  }

  public deleteVariable(): string {
    return 'Delete variable.';
  }

  public findVariableInVisualization(): string {
    return 'Find the variable in the visualization.';
  }

  // #endregion

  // #region Model Operations

  public changeModelName(): string {
    return 'Change the name of the model.';
  }

  // #endregion

  // #region Regulations

  public createRegulation(): string {
    return 'Create a new regulation.';
  }

  public removeRegulation(): string {
    return 'Remove the selected regulation.';
  }

  public changeMonotonicity(): string {
    return 'Change the monotonicity of the regulation.';
  }

  public changeObservability(): string {
    return 'Change the observability of the regulation.';
  }

  // #endregion

  // #region Control

  public changeOscillation(oscillationValue: string): string {
    return (
      'Change the oscillation of the variable to "' + oscillationValue + '".'
    );
  }

  public currentPhenotype(phenotypeValue: Phenotype): string {
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

  public changeVariablePhenotype(phenotypeValue: string): string {
    return 'Change the phenotype of the variable to "' + phenotypeValue + '".';
  }

  public removeVariableFromPhenotype(): string {
    return 'Remove the variable from the phenotype.';
  }

  public currentControlEnabled(controlEnabledValue: boolean): string {
    return (
      'The variable is currently ' +
      (controlEnabledValue ? 'Control Enabled' : 'Not Control Enabled') +
      '.'
    );
  }

  public changeVariableControlEnabled(controlEnabledValue: boolean): string {
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

  public showModelDescription(): string {
    return 'Show the description of the model.';
  }

  public hideModelDescription(): string {
    return 'Hide the description of the model.';
  }

  public extendAllVariables(): string {
    return 'Extend all variables.';
  }

  public collapseAllVariables(): string {
    return 'Collapse all variables.';
  }

  // #endregion

  // #region Variable Name Overlay

  public ApplyNewName(): string {
    return 'Apply new name of variable. (Enter)';
  }

  public RevertToOldName(): string {
    return 'Keep the original name of variable. (Esc)';
  }

  // #endregion

  // #region Change Update Function Overlay

  public ApplyUpdateFunction(): string {
    return 'Apply new update function for  variable. (Enter)';
  }

  public ValidateUpdateFunction(): string {
    return 'Validate the new update function. (Ctrl + Enter)';
  }

  public RevertUpdateFunction(): string {
    return 'Keep the original update function of variable. (Esc)';
  }

  // #endregion

  // #region Utilities Menu

  public utilitiesMenu(): string {
    return 'Show/Hide Utilities Menu';
  }

  public variableSearch(): string {
    return 'Zoom on variables in model visualization.';
  }

  public undoButton(): string {
    return 'Revert last modification.';
  }

  redoButton(): string {
    return 'Reapply previously reverted modification.';
  }

  public fit(): string {
    return 'Fit model into the canvas.';
  }

  // #endregion
}

export default Tooltips;
