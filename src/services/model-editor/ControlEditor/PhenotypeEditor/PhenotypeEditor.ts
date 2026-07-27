import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import {
  PHENOTYPE_STATUS,
  type Oscillation,
  type PhenotypeStatus,
} from '../../../../types';
import type { LiveModelInt } from '../../../global/LiveModel/LiveModelInt';
import type { ModelVisualizationInt } from '../../ModelVisualization/ModelVisualizationInt';
import ControlEditor from '../ControlEditor';

class PhenotypeEditor extends ControlEditor implements PhenotypeEditor {
  // #region --- Properties + Constructor ---

  private phenotypeSearch: string;

  private liveModelServ: LiveModelInt;

  private controlStore: ZustandStore<ControlStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;

  constructor(
    modelVisualizationServ: ModelVisualizationInt,
    liveModelServ: LiveModelInt,
    controlStore: ZustandStore<ControlStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>
  ) {
    super(modelVisualizationServ, modelEditorStatusStore);

    this.liveModelServ = liveModelServ;
    this.controlStore = controlStore;
    this.variablesStore = variablesStore;

    this.phenotypeSearch = '';
  }

  // #endregion

  // #region --- Phenotype Search ---

  public getPhenotypeSearch() {
    return this.phenotypeSearch;
  }

  public setPhenotypeSearch(searchInput: string) {
    this.phenotypeSearch = searchInput;
  }

  // #endregion

  // #region --- Phenotype Actions ---

  /** Changes the phenotype state of a variable by its ID */
  public changePhenotype(id: number, phenotype: PhenotypeStatus) {
    this.liveModelServ.Control.changePhenotypeById(id, phenotype, true, false);
  }

  /** Toggles the phenotype state of a variable by its ID */
  public togglePhenotype(id: number) {
    const variablePhenotype: PhenotypeStatus | undefined = this.controlStore
      .getState()
      .getVariableCurrentPhenotype(id);

    if (variablePhenotype === undefined) return;

    switch (variablePhenotype) {
      case PHENOTYPE_STATUS.InPhenotypeTrue:
        this.liveModelServ.Control.changePhenotypeById(
          id,
          PHENOTYPE_STATUS.InPhenotypeFalse,
          true,
          false
        );
        break;
      case PHENOTYPE_STATUS.InPhenotypeFalse:
        this.liveModelServ.Control.changePhenotypeById(
          id,
          PHENOTYPE_STATUS.NotInPhenotype,
          true,
          false
        );
        break;
      default:
        this.liveModelServ.Control.changePhenotypeById(
          id,
          PHENOTYPE_STATUS.InPhenotypeTrue,
          true,
          false
        );
    }
  }

  /** Changes the phenotype state of selected variables.
   *  @param selectedVariables - Array of tuples where each tuple contains:
   *    - variable name (string)
   *    - whether the variable is selected (boolean)
   *  @param phenotype - The new phenotype state to set (true, false, or null)
   *  Only variables that are marked as selected (true) will have their phenotype state changed.
   *  Variables not present in the selectedVariables array are considered not selected and will be ignored.
   *  If a variable name does not correspond to any existing variable, it will be ignored.
   */
  public changePhenotypeSelected(
    selectedVariables: Set<number>,
    phenotype: PhenotypeStatus
  ) {
    selectedVariables.forEach((variableId) => {
      const variable = this.variablesStore
        .getState()
        .variableFromId(variableId);
      if (!variable) return;

      this.changePhenotype(variableId, phenotype);
    });
  }

  // #endregion

  // #region --- Phenotype Oscillation Getter/Setter ---

  /** Returns the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  public getPhenotypeOscillation(): Oscillation {
    return this.liveModelServ.Control.getOscillation();
  }

  /** Sets the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  public setPhenotypeOscillation(newOscillation: Oscillation) {
    this.liveModelServ.Control.setOscillation(newOscillation);
  }

  // #endregion
}

export default PhenotypeEditor;
