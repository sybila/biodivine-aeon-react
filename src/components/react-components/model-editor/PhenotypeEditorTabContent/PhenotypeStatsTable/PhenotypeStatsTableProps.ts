import type { ControlStatus } from '../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type PhenotypeStatsTableProps = {
  controlStore: ZustandStore<ControlStatus>;
};
