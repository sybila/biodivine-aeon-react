import type { Phenotype } from '../../../../../types';

/** Tooltips for the Model Editor page */
export interface ModelEditorTooltipsInt {
  // #region Variable Info

  variableArity(arity: number): string;

  // #endregion

  // #region Base Variable Operations

  changeVariableName(): string;
  changeVariableUpdateFunction(): string;
  searchVariable(): string;
  addNewVariable(): string;
  deleteVariable(): string;
  findVariableInVisualization(): string;

  // #endregion

  // #region Model Operations

  changeModelName(): string;

  // #endregion

  // #region Regulations

  createRegulation(): string;
  removeRegulation(): string;
  changeMonotonicity(): string;
  changeObservability(): string;

  // #endregion

  // #region Control

  changeOscillation(oscillationValue: string): string;
  currentPhenotype(phenotypeValue: Phenotype): string;
  changeVariablePhenotype(phenotypeValue: string): string;
  removeVariableFromPhenotype(): string;
  currentControlEnabled(controlEnabledValue: boolean): string;
  changeVariableControlEnabled(controlEnabledValue: boolean): string;

  // #endregion

  // #region General Operations

  showModelDescription(): string;
  hideModelDescription(): string;
  extendAllVariables(): string;
  collapseAllVariables(): string;

  // #endregion
}
