import ModelEditorObjectProvider from './ModelEditorObjectProvider';
import StoresProvider from './StoresProvider/StoresProvider';
import type { StoresProviderInt } from './StoresProvider/StoresProviderInt';

class ObjectProviderClass {
  public modelEditorObjects: ModelEditorObjectProvider;

  public StoresProvider: StoresProviderInt;

  constructor() {
    this.modelEditorObjects = new ModelEditorObjectProvider();
    this.StoresProvider = new StoresProvider();
  }
}

const ObjectProvider = new ObjectProviderClass();

export default ObjectProvider;
