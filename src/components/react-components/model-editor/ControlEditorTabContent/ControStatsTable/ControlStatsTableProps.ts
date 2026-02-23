import type { LiveModelInt } from '../../../../../services/global/LiveModel/LiveModelInt';
import type { ControlStatus } from '../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ControlStatsTableProps = {
  liveModelServ: LiveModelInt;
  controlStore: ZustandStore<ControlStatus>;
};
