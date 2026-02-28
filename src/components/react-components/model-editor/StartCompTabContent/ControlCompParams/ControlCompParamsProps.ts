import type { ComputationManagerInt } from '../../../../../services/global/ComputationManager/ComputationManagerInt';
import type { ControlStatus } from '../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ControlCompParamsProps = {
  computationManagerServ: ComputationManagerInt;
  controlStore: ZustandStore<ControlStatus>;
};
