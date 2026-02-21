import type { RegulationsStatus } from '../../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ModelStatsTableProps = {
  regulationsStore: ZustandStore<RegulationsStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  variablesStore: ZustandStore<VariablesStatus>;
};
