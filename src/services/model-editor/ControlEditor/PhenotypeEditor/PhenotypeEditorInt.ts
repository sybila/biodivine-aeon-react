import type { Result } from '../../../../types/result';
import type { Oscillation, PhenotypeStatus } from '../../../../types/types';
import type ControlEditor from '../ControlEditor';

export interface PhenotypeEditorInt extends ControlEditor {
  // #region --- Search Inputs ---

  /** Returns the last saved input from the active phenotype variable search input. */
  getActivePhenotypeVariableSearch: () => string;

  /** Saves the current input of the active phenotype variable search. */
  setActivePhenotypeVariableSearch: (searchInput: string) => void;

  /** Returns the last saved input from the phenotypes search input in the "Phenotypes Overlay Window". */
  getPhenotypesSearch: () => string;

  /** Saves the current input of the phenotypes search input in the "Phenotypes Overlay Window"*/
  setPhenotypesSearch: (searchInput: string) => void;

  // #endregion

  // #region --- Phenotype Actions ---

  /**
   * Changes the phenotype status of a variable by its ID.
   *
   * @param id - The ID of the variable whose phenotype status is to be changed.
   * @param phenotype - The new phenotype status to set.
   * @param addIntoUndoRedo - Whether to add this change to the undo/redo stack.
   * @param force - Whether to force the change even if it blocks certain conditions.
   * @param phenotypeId - The specific phenotype ID to change (optional).
   * @returns An `Ok` result with `true` if the phenotype status was successfully changed,
   * or an `Err` result with an error message if there was an issue.
   */
  changePhenotype(id: number, phenotype: PhenotypeStatus): Result<boolean>;

  /**
   * Toggles the phenotype status of a variable by its ID between different states.
   *
   * @param id - The ID of the variable whose phenotype status is to be toggled.
   * @returns An `Ok` result with `true` if the phenotype status was successfully changed,
   * or an `Err` result with an error message if there was an issue.
   */
  togglePhenotype(id: number): Result<boolean>;

  /** Changes the phenotype state of selected variables.
   *  @param selectedVariables - Set of variable IDs:
   *  @param phenotype - The new phenotype state to set (true, false, or null)
   *  Only variables that are marked as selected (true) will have their phenotype state changed.
   *  Variables not present in the selectedVariables array are considered not selected and will be ignored.
   *  If a variable name does not correspond to any existing variable, it will be ignored.
   */
  changePhenotypeSelected(
    selectedVariables: Set<number>,
    phenotype: PhenotypeStatus
  ): void;

  // #endregion

  // #region --- Phenotype Oscillation Getter/Setter ---

  /** Returns the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  getPhenotypeOscillation(): Oscillation;

  /** Sets the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  setPhenotypeOscillation(newOscillation: Oscillation): void;

  // #endregion

  // #region --- Open Content Overlay Windows ---

  /** Opens the "Phenotypes Overlay Window" overlay window for editing of available phenotypes. */
  openPhenotypesOverlayWindow(): void;

  // #endregion
}
