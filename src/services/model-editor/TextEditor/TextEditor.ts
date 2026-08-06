import type { TextEditorInt } from './TextEditorInt';

class TextEditor implements TextEditorInt {
  private text: string = '';

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
  }
}

export default TextEditor;
