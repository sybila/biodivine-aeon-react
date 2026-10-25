import type { ReactElement } from 'react';
import type { MakeDecisionTabOtherStringsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/MakeDecisionTab/MakeDecisionTabOtherStringsInt';
import type { MakeDecisionTabTooltipsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/MakeDecisionTab/MakeDecisionTabTooltipsInt';
import type { TrapSpaceSuccessionDiagramInt } from '../../../../../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { SearchAndFilterHelpersInt } from '../../../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { TrapSpaceSDStatusState } from '../../../../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type {
  DecisionNodeTypeTSSD,
  NodeDataTSSD,
  StableMotifInfo,
} from '../../../../../../types/types';

export type DecisionTableProps<Element extends NodeDataTSSD | StableMotifInfo> =
  {
    selectedNodeId: number;
    variableNames: Array<string>;
    parentType: DecisionNodeTypeTSSD;

    renderRow: (element: Element, key: number) => ReactElement;

    trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;
    generalStringsServ: MakeDecisionTabOtherStringsInt;
    tooltipStringsServ: MakeDecisionTabTooltipsInt;
    searchAndFilterHelpersServ: SearchAndFilterHelpersInt;

    trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
    helpHoverStore: ZustandStore<HelpHoverState>;
  };
