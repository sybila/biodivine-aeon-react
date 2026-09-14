import type { TextEditorInt } from './TextEditorInt';

class TextEditor implements TextEditorInt {
  private text: string = '';

  public getText() {
    return this.text;
  }

  public setText(text: string) {
    this.text = text;
  }
}

export default TextEditor;
