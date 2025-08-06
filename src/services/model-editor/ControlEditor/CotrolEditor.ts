import useControlStore from '../../../stores/LiveModel/useControlStore';
import type { ControlInfo } from '../../../types';
import { LiveModel } from '../../global/LiveModel/LiveModel';
import CytoscapeME from '../CytoscapeME/CytoscapeME';

class ControlEditorClass {
  // #region --- Properties ---

  /** Function for toggling hover state of variables in ControlEditorTabContent.tsx component */
  private hoverVariableInfo:
    | ((id: number, turnOnHover: boolean) => void)
    | null = null;

  /** Function for toggling selected state of variables in the ControlEditorTabContent.tsx component */
  private selectVariableInfo: ((id: number, select: boolean) => void) | null =
    null;

  /** Currently selected variable in the ModelEditorCanvas.tsx component */
  private selectedVariableId: number | null = null;

  /** Currently searched variable name in the ControlEditorTabContent.tsx component */
  private variableSearch: string = '';

  // #endregion

  // #region --- Hover/Select Variable Functions ---

  /** Sets hover function for variables inside the ControlEditorTabContent.tsx (needs to be called before hoverVariable function) */
  public setHoverVariableFunction(
    hoverFunction: (id: number, turnOnHover: boolean) => void
  ) {
    this.hoverVariableInfo = hoverFunction;
  }

  /** Sets select function for variables inside the ControlEditorTabContent.tsx (needs to be called before selectVariable function) */
  public setSelectVariableFunction(
    selectFunction: (id: number, select: boolean) => void
  ) {
    this.selectVariableInfo = selectFunction;
  }

  /** Returns last selected variable id in the ModelEditorCanvas.tsx component. Returns null if no variable is selected */
  public getSelectedVariableId(): number | null {
    return this.selectedVariableId;
  }

  /** Toggles hover state on a variable in the ControlEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   * (you must first set hoverVariableInfo with setHoverVariableFunction before running this function)
   */
  public hoverVariable(id: number, turnOnHover: boolean) {
    if (this.hoverVariableInfo) {
      this.hoverVariableInfo(id, turnOnHover);
    }
  }

  /** Toggles selected state on a variable in the ControlEditorTabContent.tsx component
   * If `select` is true, it sets variable as selected; if false, it unselects it.
   * (you must first set selectVariableInfo with setSelectVariableFunction before running this function)
   */
  public selectVariable(id: number, select: boolean) {
    if (this.selectVariableInfo) {
      this.selectedVariableId = select ? id : null;
      this.selectVariableInfo(id, select);
    }
  }

  // #endregion

  // #region --- Variable Search ---

  /** Returns last searched variable name in the ControlEditorTabContent.tsx component */
  public getVariableSearch(): string {
    return this.variableSearch;
  }

  /** Sets currently searched variable name in the ControlEditorTabContent.tsx component */
  public setVariableSearch(name: string) {
    this.variableSearch = name;
  }

  // #endregion

  // #region --- Control Enabled Actions ---

  /** Changes the control enabled state of a variable by its ID */
  public changeControlEnabled(id: number, enabled: boolean) {
    LiveModel.Control.changeControlEnabledById(id, enabled);
  }

  /** Toggles the control enabled state of a variable by its ID */
  public toggleControlEnabled(id: number) {
    const controlInfo: ControlInfo | undefined = useControlStore
      .getState()
      .getVariableControlInfo(id);

    if (controlInfo) {
      LiveModel.Control.changeControlEnabledById(
        id,
        !controlInfo.controlEnabled
      );
    }
  }

  // #endregion

  // #region --- Phenotype Actions ---

  /** Changes the phenotype state of a variable by its ID */
  public changePhenotype(id: number, phenotype: boolean) {
    LiveModel.Control.changePhenotypeById(id, phenotype);
  }

  /** Toggles the phenotype state of a variable by its ID */
  public togglePhenotype(id: number) {
    const controlInfo: ControlInfo | undefined = useControlStore
      .getState()
      .getVariableControlInfo(id);

    if (!controlInfo) return;

    switch (controlInfo.phenotype) {
      case true:
        LiveModel.Control.changePhenotypeById(id, false);
        break;
      case false:
        LiveModel.Control.changePhenotypeById(id, null);
        break;
      default:
        LiveModel.Control.changePhenotypeById(id, true);
    }
  }

  // #endregion

  // #region --- Cytoscape Actions ---

  /** Toggles hover state on a variable node in the CytoscapeMe canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  public hoverVariableCytoscape(id: number, turnOnHover: boolean) {
    CytoscapeME.hoverNode(id, turnOnHover);
  }

  // #endregion
}

/** Singleton for controlling the behavior of the Control Editor */
const ControlEditor: ControlEditorClass = new ControlEditorClass();

export default ControlEditor;
