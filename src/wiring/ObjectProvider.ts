import GlobalServicesProvider from './GlobalServicesProvider/GlobalServicesProvider';
import type { GlobalServicesProviderInt } from './GlobalServicesProvider/GlobalServicesProviderInt';
import ModelEditorObjectProvider from './ModelEditorObjectProvider';
import StoresProvider from './StoresProvider/StoresProvider';
import type { StoresProviderInt } from './StoresProvider/StoresProviderInt';
import UtilitiesServiceProvider from './UtilitiesServiceProvider/UtilitiesServiceProvider';
import type { UtilitiesServiceProviderInt } from './UtilitiesServiceProvider/UtilitiesServiceProviderInt';

class ObjectProviderClass {
  public ModelEditorObjects: ModelEditorObjectProvider;

  public GlobalServicesProvider: GlobalServicesProviderInt;

  public UtilitiesServiceProvider: UtilitiesServiceProviderInt;

  public StoresProvider: StoresProviderInt;

  constructor() {
    this.ModelEditorObjects = new ModelEditorObjectProvider();
    this.UtilitiesServiceProvider = new UtilitiesServiceProvider();
    this.StoresProvider = new StoresProvider();
    this.GlobalServicesProvider = new GlobalServicesProvider(
      this.UtilitiesServiceProvider,
      this.StoresProvider
    );
  }
}

const ObjectProvider = new ObjectProviderClass();

export default ObjectProvider;
