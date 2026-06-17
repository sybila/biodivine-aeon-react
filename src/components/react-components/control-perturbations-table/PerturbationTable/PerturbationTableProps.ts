import type { ControlPerturbationsTableInt } from '../../../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { LoadingInt } from '../../../../services/global/Loading/LoadingInt';
import type { ControlPerturbationTablePageStringsInt } from '../../../../services/global/StringProvider/ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import type { DataFormatersInt } from '../../../../services/utilities/DataFormaters/DataFormatersInt';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type PerturbationTableProps = {
  startFilter: boolean;
  startSort: boolean;
  setNextPageExists: (value: boolean) => void;

  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  pageStringProviderServ: ControlPerturbationTablePageStringsInt;
  dataFormatersServ: DataFormatersInt;
  loadingServ: LoadingInt;

  resultsStatusStore: ZustandStore<ResultsStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
