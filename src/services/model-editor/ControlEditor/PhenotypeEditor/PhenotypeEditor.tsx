import PhenotypesOverlayContent from '../../../../components/react-components/model-editor/PhenotypesOverlayContent/PhenotypesOverlayContent';
import type { OverlayWindowState } from '../../../../stores/ContentOverlayWindow/OverlayWindowState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import {
  PHENOTYPE_STATUS,
  type Oscillation,
  type Phenotype,
  type PhenotypeStatus,
} from '../../../../types/types';
import type { LiveModelInt } from '../../../global/LiveModel/LiveModelInt';
import type { MessageInt } from '../../../global/Message/MessageInt';
import type { ModelEditorPageStringsInt } from '../../../global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { SearchAndFilterHelpersInt } from '../../../utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { ModelVisualizationInt } from '../../ModelVisualization/ModelVisualizationInt';
import ControlEditor from '../ControlEditor';
import type { PhenotypeEditorInt } from './PhenotypeEditorInt';

class PhenotypeEditor extends ControlEditor implements PhenotypeEditorInt {
  // #region --- Properties + Constructor ---

  private phenotypeVariableSearch: string;
  private phenotypesSearch: string;

  private liveModelServ: LiveModelInt;
  private messageServ: MessageInt;
  private pageStringProviderServ: ModelEditorPageStringsInt;
  private searchAndFilterHelpersServ: SearchAndFilterHelpersInt;

  private controlStore: ZustandStore<ControlStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private overlayWindowStore: ZustandStore<OverlayWindowState>;
  private helpHoverStore: ZustandStore<HelpHoverState>;

  constructor(
    modelVisualizationServ: ModelVisualizationInt,
    liveModelServ: LiveModelInt,
    searchAndFilterHelpersServ: SearchAndFilterHelpersInt,
    messageServ: MessageInt,
    pageStringProviderServ: ModelEditorPageStringsInt,
    controlStore: ZustandStore<ControlStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>,
    overlayWindowStore: ZustandStore<OverlayWindowState>,
    helpHoverStore: ZustandStore<HelpHoverState>
  ) {
    super(modelVisualizationServ, modelEditorStatusStore);

    this.searchAndFilterHelpersServ = searchAndFilterHelpersServ;
    this.liveModelServ = liveModelServ;
    this.messageServ = messageServ;
    this.pageStringProviderServ = pageStringProviderServ;

    this.controlStore = controlStore;
    this.variablesStore = variablesStore;
    this.overlayWindowStore = overlayWindowStore;
    this.helpHoverStore = helpHoverStore;

    this.phenotypeVariableSearch = '';
    this.phenotypesSearch = '';
  }

  // #endregion

  // #region --- Search Inputs ---

  public getActivePhenotypeVariableSearch() {
    return this.phenotypeVariableSearch;
  }

  public setActivePhenotypeVariableSearch(searchInput: string) {
    this.phenotypeVariableSearch = searchInput;
  }

  public getPhenotypesSearch() {
    return this.phenotypesSearch;
  }

  public setPhenotypesSearch(searchInput: string) {
    this.phenotypesSearch = searchInput;
  }

  // #endregion

  // #region --- Phenotype Actions ---

  public changePhenotype(id: number, phenotype: PhenotypeStatus) {
    return this.liveModelServ.Control.changePhenotypeById(
      id,
      phenotype,
      true,
      false
    );
  }

  public togglePhenotype(id: number) {
    const variablePhenotype: PhenotypeStatus | undefined =
      this.controlStore.getState().getVariablePhenotype(id) ??
      PHENOTYPE_STATUS.NotInPhenotype;

    switch (variablePhenotype) {
      case PHENOTYPE_STATUS.InPhenotypeTrue:
        return this.liveModelServ.Control.changePhenotypeById(
          id,
          PHENOTYPE_STATUS.InPhenotypeFalse,
          true,
          false
        );
      case PHENOTYPE_STATUS.InPhenotypeFalse:
        return this.liveModelServ.Control.changePhenotypeById(
          id,
          PHENOTYPE_STATUS.NotInPhenotype,
          true,
          false
        );
      default:
        return this.liveModelServ.Control.changePhenotypeById(
          id,
          PHENOTYPE_STATUS.InPhenotypeTrue,
          true,
          false
        );
    }
  }

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

  // #region --- Open Content Overlay Windows ---

  public openPhenotypesOverlayWindow(): void {
    this.overlayWindowStore.getState().setCurrentContent({
      header: 'Phenotypes',
      content: (
        <PhenotypesOverlayContent
          filterElementsFunction={(elements, text) => {
            return this.searchAndFilterHelpersServ.filterObjectsBySearchTerms<Phenotype>(
              elements,
              (el: Phenotype) => el.name,
              text
            );
          }}
          liveModelServ={this.liveModelServ}
          phenotypeEditorServ={this}
          messageServ={this.messageServ}
          pageStringProviderServ={this.pageStringProviderServ}
          controlStore={this.controlStore}
          helpHoverStore={this.helpHoverStore}
        />
      ),
      showCloseButton: true,
      closeOnBgClick: true,
    });
  }

  // #endregion
}

export default PhenotypeEditor;
