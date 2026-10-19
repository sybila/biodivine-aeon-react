import type { OverlayWindowState } from '../../../../stores/ContentOverlayWindow/OverlayWindowState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { WarningState } from '../../../../stores/Warning/WarningState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { TrapSpaceSDPageStringsInt } from '../../StringProvider/TrapSpaceSDPageStrings/TrapSpaceSDPageStringsInt';
import type { TrapSpaceSuccessionDiagramWarningsInt } from './TrapSpaceSuccessionDiagramWarningsInt';

class TrapSpaceSuccessionDiagramWarnings implements TrapSpaceSuccessionDiagramWarningsInt {
  // #region --- Props + Constructor

  private stringProviderTSSDServ: TrapSpaceSDPageStringsInt;

  private warningStore: ZustandStore<WarningState>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private overlayWindowStore: ZustandStore<OverlayWindowState>;
  private helpHoverStore: ZustandStore<HelpHoverState>;

  constructor(
    stringProviderTSSDServ: TrapSpaceSDPageStringsInt,
    warningStore: ZustandStore<WarningState>,
    overlayWindowStore: ZustandStore<OverlayWindowState>,
    helpHoverStore: ZustandStore<HelpHoverState>,
    variablesStore: ZustandStore<VariablesStatus>
  ) {
    this.stringProviderTSSDServ = stringProviderTSSDServ;

    this.warningStore = warningStore;
    this.overlayWindowStore = overlayWindowStore;
    this.helpHoverStore = helpHoverStore;
    this.variablesStore = variablesStore;
  }

  // #endregion

  public deleteNodeWithChildrenWarning(
    deleteNodeFunction: () => void,
    deleteChildNodesFunction: () => void
  ) {
    this.warningStore
      .getState()
      .addWarning(
        this.stringProviderTSSDServ.OtherStrings.Warnings.deleteNodeWithChildrenWarningMessage(),
        [
          {
            text: this.stringProviderTSSDServ.OtherStrings.Warnings.deleteNodeWithChildrenCancelButton(),
            action: () => {},
            
            buttonWidth: '220px',
          },
          {
            text: this.stringProviderTSSDServ.OtherStrings.Warnings.deleteNodeWithChildrenDeleteNodeWithChildrenButton(),
            action: () => {
              deleteNodeFunction();
            },
            buttonWidth: '220px',
          },
          {
            text: this.stringProviderTSSDServ.OtherStrings.Warnings.deleteNodeWithChildrenDeleteOnlyChildrenButton(),
            action: () => {
              deleteChildNodesFunction();
            },
            buttonWidth: '220px',
          },
        ]
      );
  }
}

export default TrapSpaceSuccessionDiagramWarnings;
