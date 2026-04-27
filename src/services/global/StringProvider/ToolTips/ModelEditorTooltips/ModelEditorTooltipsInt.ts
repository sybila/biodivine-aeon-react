export interface ModelEditorTooltipsInt {

  // #region Variable Info

  variableArity(arity: number): string;

  // #endregion
  
  // #region Base Variable Operations

  changeVariableName(): string;
  changeVariableUpdateFunction(): string;
  searchVariable(): string;
  deleteVariable(): string;

  // #endregion

  // #region Regulations

  createRegulation(): string;
  removeRegulation(): string;
  changeMonotonicity(): string;
  changeObservability(): string;

  // #endregion

  // #region Control

  changeOscillation(oscillationValue: string): string;
  changeVariablePhenotype(phenotypeValue: string): string;
  removeVariableFromPhenotype(): string;
  changeVariableControlEnabled(controlEnabledValue: string): string;

  // #endregion
}
