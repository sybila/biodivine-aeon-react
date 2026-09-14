import ControlPerturbationsTable from '../../services/control-perturbations-table/ControlPerturbationsTable';
import type { ControlPerturbationsTableInt } from '../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { PerturbationFiltersSortState } from '../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { ZustandStore } from '../../stores/ZustandStoreType';
import type { ControlPerturbationsTableServicesProviderInt } from './ControlPerturbationsTableServicesProviderInt';

class ControlPerturbationsTableServicesProvider implements ControlPerturbationsTableServicesProviderInt {
  controlPerturbationsTableServ: ControlPerturbationsTableInt;

  constructor(
    perturbationsFiltersSortStore: ZustandStore<PerturbationFiltersSortState>
  ) {
    this.controlPerturbationsTableServ = new ControlPerturbationsTable(
      perturbationsFiltersSortStore
    );
  }
}

export default ControlPerturbationsTableServicesProvider;
