import type { TrapSpaceSDStatusState } from '../../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type OverviewTabContentProps = {
  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
};
