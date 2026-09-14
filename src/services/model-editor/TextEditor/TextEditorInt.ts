export interface TextEditorInt {
  /** Returns the text currently shown in the editor. */
  getText(): string;

  /** Replaces the editor’s text with the supplied value. */
  setText(text: string): void;
}
