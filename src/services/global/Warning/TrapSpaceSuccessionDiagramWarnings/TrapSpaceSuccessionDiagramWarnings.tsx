import SelectTrapSpacesOverlayWindow from '../../../../components/react-components/trap-space-succession-diagram/overlay-windows/SelectTrapSpacesOverlayWindow';
import type { OverlayWindowState } from '../../../../stores/ContentOverlayWindow/OverlayWindowState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { WarningState } from '../../../../stores/Warning/WarningState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { NodeDataTSSD } from '../../../../types/types';
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

  public selectTrapSpacesWarning(
    makeDecisionFunction: (selectedTrapSpacesIds: Array<number>) => void,
    availableTrapSpaces: Array<NodeDataTSSD>
  ) {
    this.warningStore
      .getState()
      .addWarning(
        'This stable motif has multiple available trap spaces. Do you want to import all of them or only their subset?',
        [
          {
            text: 'Import All',
            action: () => {
              makeDecisionFunction(
                availableTrapSpaces.map((trapSpace) => trapSpace.id)
              );
            },
          },
          {
            text: 'Select Subset',
            buttonWidth: '130px',
            action: () => {
              this.overlayWindowStore.getState().setCurrentContent({
                header: 'Select trap spaces',
                content: (
                  <SelectTrapSpacesOverlayWindow
                    trapSpacesForSelection={availableTrapSpaces}
                    variableNames={this.variablesStore
                      .getState()
                      .getAllVariables()
                      .map((variable) => variable.name)}
                    makeDecisionFunction={(trapSpaces) =>
                      makeDecisionFunction(
                        trapSpaces.map((trapSpace) => trapSpace.id)
                      )
                    }
                    filterFilterTableVariablesFunction={function (
                      variableNames: Array<string>,
                      searchTerm: string
                    ): Array<string> {
                      return variableNames;
                    }}
                    generalStringProviderServ={
                      (this,
                      this.stringProviderTSSDServ.OtherStrings
                        .SelectTrapSpacesOverlayWindow)
                    }
                    tooltipStringProviderServ={
                      this.stringProviderTSSDServ.Tooltips
                        .SelectTrapSpacesOverlayWindow
                    }
                    helpHoverStore={this.helpHoverStore}
                  />
                ),
                showCloseButton: false,
                closeOnBgClick: false,
              });
            },
          },
        ]
      );
  }
}

export default TrapSpaceSuccessionDiagramWarnings;
