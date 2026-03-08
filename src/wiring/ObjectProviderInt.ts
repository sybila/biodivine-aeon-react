import type { AttractorBifurcationExplorerServicesProviderInt } from './AttractorBifurcationExplorerServicesProvider/AttractorBifurcationExplorerServicesProviderInt';
import type { AttractorVisualizerServicesProviderInt } from './AttractorVisualizerServicesProvider/AttractorVisualizerServicesProviderInt';
import type { ControlPerturbationsTableServicesProviderInt } from './ControlPerturbationsTableServicesProvider/ControlPerturbationsTableServicesProviderInt';
import type { GlobalServicesProviderInt } from './GlobalServicesProvider/GlobalServicesProviderInt';
import type { ModelEditorServicesProviderInt } from './ModelEditorServicesProvider/ModelEditorServicesProviderInt';
import type { StoresProviderInt } from './StoresProvider/StoresProviderInt';
import type { UtilitiesServiceProviderInt } from './UtilitiesServiceProvider/UtilitiesServiceProviderInt';

/** Interface which provides objects (services, stores) for the rest of the application (UI)*/
export interface ObjectProviderInt {
  ModelEditorServicesProvider: ModelEditorServicesProviderInt;
  AttractorVisualizerServicesProvider: AttractorVisualizerServicesProviderInt;
  AttractorBifurcationExplorerServicesProvider: AttractorBifurcationExplorerServicesProviderInt;
  ControlPerturbationsTableServicesProvider: ControlPerturbationsTableServicesProviderInt;

  GlobalServicesProvider: GlobalServicesProviderInt;
  UtilitiesServiceProvider: UtilitiesServiceProviderInt;
  StoresProvider: StoresProviderInt;
}
