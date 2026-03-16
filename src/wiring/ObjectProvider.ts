import { Message } from '../components/lit-components/message-wrapper';
import AttractorBifurcationExplorerServicesProvider from './AttractorBifurcationExplorerServicesProvider/AttractorBifurcationExplorerServicesProvider';
import type { AttractorBifurcationExplorerServicesProviderInt } from './AttractorBifurcationExplorerServicesProvider/AttractorBifurcationExplorerServicesProviderInt';
import AttractorVisualizerServicesProvider from './AttractorVisualizerServicesProvider/AttractorVisualizerServicesProvider';
import type { AttractorVisualizerServicesProviderInt } from './AttractorVisualizerServicesProvider/AttractorVisualizerServicesProviderInt';
import ControlPerturbationsTableServicesProvider from './ControlPerturbationsTableServicesProvider/ControlPerturbationsTableServicesProvider';
import type { ControlPerturbationsTableServicesProviderInt } from './ControlPerturbationsTableServicesProvider/ControlPerturbationsTableServicesProviderInt';
import GlobalServicesProvider from './GlobalServicesProvider/GlobalServicesProvider';
import type { GlobalServicesProviderInt } from './GlobalServicesProvider/GlobalServicesProviderInt';
import ModelEditorServicesProvider from './ModelEditorServicesProvider/ModelEditorServicesProvider';
import type { ModelEditorServicesProviderInt } from './ModelEditorServicesProvider/ModelEditorServicesProviderInt';
import type { ObjectProviderInt } from './ObjectProviderInt';
import StoresProvider from './StoresProvider/StoresProvider';
import type { StoresProviderInt } from './StoresProvider/StoresProviderInt';
import UtilitiesServiceProvider from './UtilitiesServiceProvider/UtilitiesServiceProvider';
import type { UtilitiesServiceProviderInt } from './UtilitiesServiceProvider/UtilitiesServiceProviderInt';

class ObjectProviderClass implements ObjectProviderInt {
  public ModelEditorServicesProvider: ModelEditorServicesProviderInt;
  public AttractorVisualizerServicesProvider: AttractorVisualizerServicesProviderInt;
  public AttractorBifurcationExplorerServicesProvider: AttractorBifurcationExplorerServicesProviderInt;
  public ControlPerturbationsTableServicesProvider: ControlPerturbationsTableServicesProviderInt;

  public GlobalServicesProvider: GlobalServicesProviderInt;
  public UtilitiesServiceProvider: UtilitiesServiceProviderInt;

  public StoresProvider: StoresProviderInt;

  constructor() {
    this.UtilitiesServiceProvider = new UtilitiesServiceProvider();
    this.StoresProvider = new StoresProvider();
    this.GlobalServicesProvider = new GlobalServicesProvider(
      this.UtilitiesServiceProvider,
      this.StoresProvider,
      (message: string, duration?: number) =>
        Message.showSuccess(message, duration),
      (message: string, duration?: number) =>
        Message.showInfo(message, duration),
      (message: string, duration?: number) =>
        Message.showError(message, duration)
    );

    this.ModelEditorServicesProvider = new ModelEditorServicesProvider(
      this.GlobalServicesProvider.liveModelServ,
      this.GlobalServicesProvider.messageServ,
      this.StoresProvider
    );
    this.AttractorVisualizerServicesProvider =
      new AttractorVisualizerServicesProvider(
        this.GlobalServicesProvider.computationManagerServ,
        this.GlobalServicesProvider.messageServ,
        this.StoresProvider
      );
    this.AttractorBifurcationExplorerServicesProvider =
      new AttractorBifurcationExplorerServicesProvider(
        this.GlobalServicesProvider.computationManagerServ,
        this.GlobalServicesProvider.messageServ,
        this.AttractorVisualizerServicesProvider.attractorVisualizerServ,
        this.UtilitiesServiceProvider.behaviorClassOperationsServ,
        this.StoresProvider
      );
    this.ControlPerturbationsTableServicesProvider =
      new ControlPerturbationsTableServicesProvider(
        this.StoresProvider.perturbationFiltersSortStore
      );
  }
}

const ObjectProvider = new ObjectProviderClass();

export default ObjectProvider;
