import type { SelectTrapSpacesOverlayWindowOtherStringsInt } from '../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/SelectTrapSpacesOverlayWindow/SelectTrapSpacesOverlayWindowOtherStringsInt';
import type { SelectTrapSpacesOverlayWindowTooltipsInt } from '../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/SelectTrapSpacesOverlayWindow/SelectTrapSpacesOverlayWindowTooltipsInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { NodeDataTSSD } from '../../../../types/types';

export type SelectTrapSpacesOverlayWindowProps = {
  trapSpacesForSelection: Array<NodeDataTSSD>;
  variableNames: Array<string>;
  makeDecisionFunction: (selectedTrapSpaces: Array<NodeDataTSSD>) => void;
  filterFilterTableVariablesFunction: (
    variableNames: Array<string>,
    searchTerm: string
  ) => Array<string>;

  generalStringProviderServ: SelectTrapSpacesOverlayWindowOtherStringsInt;
  tooltipStringProviderServ: SelectTrapSpacesOverlayWindowTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
