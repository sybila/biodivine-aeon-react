import type { LiveModelInt } from '../../../../../services/global/LiveModel/LiveModelInt';
import type { RegulationsStatus } from '../../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { RegulationVariables } from '../../../../../types';

export type RegulationMenuButtonsProps = {
  setHint: (text: string) => void;
  selectedRegulationIds: RegulationVariables;
  liveModelServ: LiveModelInt;
  regulationsStore: ZustandStore<RegulationsStatus>;
};
