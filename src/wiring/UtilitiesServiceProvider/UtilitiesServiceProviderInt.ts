import type { AeonFormatInt } from '../../services/utilities/AeonFormat/AeonFormatInt';
import type { BehaviorClassOperationsInt } from '../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import type { DataFormatersInt } from '../../services/utilities/DataFormaters/DataFormatersInt';
import type { FileConvertorsInt } from '../../services/utilities/FileConvertors/FileConvertorsInt';
import type { FileHelpersInt } from '../../services/utilities/FileHelpers/FileHelpersInt';
import type { SearchAndFilterHelpersInt } from '../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { WaiterFunctionInt } from '../../services/utilities/WaiterFunction/WaiterFunctionInt';

// TODO - Add time
/** Interface which defines provider of utility services. */
export interface UtilitiesServiceProviderInt {
  aeonFormatServ: AeonFormatInt;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
  dataFormatersServ: DataFormatersInt;
  fileConvertorsServ: FileConvertorsInt;
  fileHelpersServ: FileHelpersInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  waiterFunctionServ: WaiterFunctionInt;
}
