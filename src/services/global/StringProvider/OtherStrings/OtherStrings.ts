import ModelEditorOtherStrings from './ModelEditorOtherStrings/ModelEditorOtherStrings';
import type { ModelEditorOtherStringsInt } from './ModelEditorOtherStrings/ModelEditorOtherStringsInt';
import type { OtherStringsInt } from './OtherStringsInt';

class OtherStrings implements OtherStringsInt {
  ModelEditorOtherStrings: ModelEditorOtherStringsInt;

  constructor() {
    this.ModelEditorOtherStrings = new ModelEditorOtherStrings();
  }
}

export default OtherStrings;