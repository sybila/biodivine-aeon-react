import type { ControlStatus } from '../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ControlStatsTableProps = {
  controlStore: ZustandStore<ControlStatus>;
};
