import type { TrapSpaceSuccessionDiagramInt } from '../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { TrapSpaceSDStatusState } from '../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type TrapSpaceSuccessionDiagramProps = {
  trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;

  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
};
