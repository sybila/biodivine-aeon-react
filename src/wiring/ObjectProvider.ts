import GlobalServicesProvider from './GlobalServicesProvider/GlobalServicesProvider';
import type { GlobalServicesProviderInt } from './GlobalServicesProvider/GlobalServicesProviderInt';
import ModelEditorServicesProvider from './ModelEditorServicesProvider/ModelEditorServicesProvider';
import type { ModelEditorServicesProviderInt } from './ModelEditorServicesProvider/ModelEditorServicesProviderInt';
import StoresProvider from './StoresProvider/StoresProvider';
import type { StoresProviderInt } from './StoresProvider/StoresProviderInt';
import UtilitiesServiceProvider from './UtilitiesServiceProvider/UtilitiesServiceProvider';
import type { UtilitiesServiceProviderInt } from './UtilitiesServiceProvider/UtilitiesServiceProviderInt';

class ObjectProviderClass {
  public ModelEditorServicesProvider: ModelEditorServicesProviderInt;

  public GlobalServicesProvider: GlobalServicesProviderInt;

  public UtilitiesServiceProvider: UtilitiesServiceProviderInt;

  public StoresProvider: StoresProviderInt;

  constructor() {
    this.UtilitiesServiceProvider = new UtilitiesServiceProvider();
    this.StoresProvider = new StoresProvider();
    this.GlobalServicesProvider = new GlobalServicesProvider(
      this.UtilitiesServiceProvider,
      this.StoresProvider
    );
    this.ModelEditorServicesProvider = new ModelEditorServicesProvider(
      this.GlobalServicesProvider.liveModelServ,
      this.StoresProvider
    );
  }
}

const ObjectProvider = new ObjectProviderClass();

export default ObjectProvider;
