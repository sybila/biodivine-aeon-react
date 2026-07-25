import type { Oscillation, Phenotype } from '../../../../types';
import type ControlEditor from '../ControlEditor';

export interface PhenotypeEditorInt extends ControlEditor {
  // #region --- Phenotype Actions ---

  /** Changes the phenotype state of a variable by its ID */
  changePhenotype(id: number, phenotype: Phenotype): void;

  /** Toggles the phenotype state of a variable by its ID */
  togglePhenotype(id: number): void;

  /** Changes the phenotype state of selected variables.
   *  @param selectedVariables - Set of variable IDs:
   *  @param phenotype - The new phenotype state to set (true, false, or null)
   *  Only variables that are marked as selected (true) will have their phenotype state changed.
   *  Variables not present in the selectedVariables array are considered not selected and will be ignored.
   *  If a variable name does not correspond to any existing variable, it will be ignored.
   */
  changePhenotypeSelected(
    selectedVariables: Set<number>,
    phenotype: Phenotype
  ): void;

  // #endregion

  // #region --- Phenotype Oscillation Getter/Setter ---

  /** Returns the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  getPhenotypeOscillation(): Oscillation;

  /** Sets the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  setPhenotypeOscillation(newOscillation: Oscillation): void;

  // #endregion
}
