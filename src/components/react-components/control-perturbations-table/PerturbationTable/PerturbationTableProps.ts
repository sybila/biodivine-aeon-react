import type { ControlPerturbationsTableInt } from '../../../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type PerturbationTableProps = {
  startFilter: boolean;
  startSort: boolean;
  setNextPageExists: (value: boolean) => void;
  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  resultsStatusStore: ZustandStore<ResultsStatus>;
};
