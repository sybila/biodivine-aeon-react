import ModelEditorObjectProvider from './ModelEditorObjectProvider';

class ObjectProviderClass {
  public modelEditorObjects: ModelEditorObjectProvider;

  constructor() {
    this.modelEditorObjects = new ModelEditorObjectProvider();
  }
}

const ObjectProvider = new ObjectProviderClass();

export default ObjectProvider;
