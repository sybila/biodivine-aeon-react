import type { ModelEditorTooltipsInt } from './ModelEditorTooltipsInt';

class ModelEditorTooltips implements ModelEditorTooltipsInt {
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

  public deleteVariable(): string {
    return 'Delete the selected variable.';
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
      'Change the oscillation of the variable to ' + oscillationValue + '.'
    );
  }

  public changeVariablePhenotype(phenotypeValue: string): string {
    return 'Change the phenotype of the variable to ' + phenotypeValue + '.';
  }

  public removeVariableFromPhenotype(): string {
    return 'Remove the variable from the phenotype.';
  }

  public changeVariableControlEnabled(controlEnabledValue: string): string {
    return (
      'Change the control enabled status of the variable to ' +
      controlEnabledValue +
      '.'
    );
  }

  // #endregion
}

export default ModelEditorTooltips;
