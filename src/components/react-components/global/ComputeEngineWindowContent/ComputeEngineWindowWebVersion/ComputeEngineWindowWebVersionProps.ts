import type { ComputationManagerInt } from '../../../../../services/global/ComputationManager/ComputationManagerInt';
import type { GlobalStringsInt } from '../../../../../services/global/StringProvider/GlobalStrings/GlobalStringsInt';
import type { ComputeEngineMenuOtherStringsInt } from '../../../../../services/global/StringProvider/GlobalStrings/OtherStrings/OverlayWindowOtherStrings/ComputeEngineMenu/ComputeEngineMenuOtherStringsInt';
import type { ComputeEngineTooltipsInt } from '../../../../../services/global/StringProvider/GlobalStrings/Tooltips/OverlayWindowTooltips/ComputeEngineTooltips/ComputeEngineTooltipsInt';
import type { ComputeEngineStatusState } from '../../../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ComputeEngineWindowWebVersionProps = {
  computeEngineDownloadLink: string;

  computationManagerServ: ComputationManagerInt;
  generalStringsProviderServ: ComputeEngineMenuOtherStringsInt;
  tooltipsProviderServ: ComputeEngineTooltipsInt;

  computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
