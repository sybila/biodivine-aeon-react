import type { LiveModelInt } from '../../../../../services/global/LiveModel/LiveModelInt';
import type { EditorFloatMenuInt } from '../../../../../services/global/StringProvider/ModelEditorPageStrings/OtherStrings/EditorFloatMenu/EditorFloatMenuInt';
import type { RegulationsStatus } from '../../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { RegulationVariables } from '../../../../../types/types';

export type RegulationMenuButtonsProps = {
  setHint: (text: string) => void;
  selectedRegulationIds: RegulationVariables;
  liveModelServ: LiveModelInt;
  floatMenuStringsServ: EditorFloatMenuInt;
  
  regulationsStore: ZustandStore<RegulationsStatus>;
};
