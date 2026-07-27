import type { PhenotypeStatus } from '../../../../../types';
import type { SelectionButtonsTooltipsInt } from '../../common-tooltips/SelectionButtonsTooltipsInt';

/** Tooltips for the Model Editor page */
export interface TooltipsInt extends SelectionButtonsTooltipsInt {
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
  currentPhenotype(phenotypeValue: PhenotypeStatus): string;
  changeVariablePhenotype(phenotypeValue: string): string;
  removeVariableFromPhenotype(): string;
  currentControlEnabled(controlEnabledValue: boolean): string;
  changeVariableControlEnabled(controlEnabledValue: boolean): string;

  // #endregion

  // #region Visual Options

  variableLayout(layoutName: string): string;
  variableSelectedLayout(layoutName: string): string;
  highlightVariable(highlightType: string): string;

  // #endregion

  // #region General Operations

  showModelDescription(): string;
  hideModelDescription(): string;
  extendAllVariables(): string;
  collapseAllVariables(): string;

  // #endregion

  // #region Variable Name Overlay

  ApplyNewName(): string;

  RevertToOldName(): string;
  // #endregion

  // #region Change Update Function Overlay

  ApplyUpdateFunction(): string;

  ValidateUpdateFunction(): string;

  RevertUpdateFunction(): string;

  // #endregion

  // #region Utilities Menu

  utilitiesMenu(): string;
  variableSearch(): string;
  undoButton(): string;
  redoButton(): string;
  fit(): string;

  // #endregion
}
