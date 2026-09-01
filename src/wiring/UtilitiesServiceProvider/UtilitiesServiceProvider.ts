import AeonFormat from '../../services/utilities/AeonFormat/AeonFormat';
import type { AeonFormatInt } from '../../services/utilities/AeonFormat/AeonFormatInt';
import BehaviorClassOperations from '../../services/utilities/BehaviorClassOperations/BehaviorClassOperations';
import type { BehaviorClassOperationsInt } from '../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import DataFormaters from '../../services/utilities/DataFormaters/DataFormaters';
import type { DataFormatersInt } from '../../services/utilities/DataFormaters/DataFormatersInt';
import FileConvertors from '../../services/utilities/FileConvertors/FileConvertors';
import type { FileConvertorsInt } from '../../services/utilities/FileConvertors/FileConvertorsInt';
import FileHelpers from '../../services/utilities/FileHelpers/FileHelpers';
import type { FileHelpersInt } from '../../services/utilities/FileHelpers/FileHelpersInt';
import SearchAndFilterHelpers from '../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpers';
import type { SearchAndFilterHelpersInt } from '../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import WaiterFunction from '../../services/utilities/WaiterFunction/WaiterFunction';
import type { WaiterFunctionInt } from '../../services/utilities/WaiterFunction/WaiterFunctionInt';
import type { UtilitiesServiceProviderInt } from './UtilitiesServiceProviderInt';

class UtilitiesServiceProvider implements UtilitiesServiceProviderInt {
  aeonFormatServ: AeonFormatInt;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
  dataFormatersServ: DataFormatersInt;
  fileConvertorsServ: FileConvertorsInt;
  fileHelpersServ: FileHelpersInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  waiterFunctionServ: WaiterFunctionInt;

  constructor() {
    this.aeonFormatServ = new AeonFormat();
    this.behaviorClassOperationsServ = new BehaviorClassOperations();
    this.dataFormatersServ = new DataFormaters();
    this.fileConvertorsServ = new FileConvertors();
    this.fileHelpersServ = new FileHelpers();
    this.searchAndFilterHelpersServ = new SearchAndFilterHelpers(
      this.dataFormatersServ
    );
    this.waiterFunctionServ = new WaiterFunction();
  }
}

export default UtilitiesServiceProvider;
