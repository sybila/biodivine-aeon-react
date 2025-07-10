import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-input')
export class TextInput extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare placeholder?: string;
  @property({ type: String }) declare inputHeight?: string;
  @property({ type: String }) declare inputWidth?: string;
  @property({ type: String }) declare inputPlaceholder?: string;
  @property({ type: String }) declare inputBorderColor?: string;
  @property({ type: String }) declare inputBorderRadius?: string;
  @property({ type: String }) declare inputColor?: string;
  @property({ type: String }) declare onKeyup?: (value: string) => void;

  @property({ type: String }) declare textColor?: string;
  @property({ type: String }) declare textFontSize?: string;
  @property({ type: String }) declare textFontWeight?: string;
  @property({ type: String }) declare textFontFamily?: string;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--stat-entry-comp-height, 26px);
      width: var(--stat-entry-comp-width, 500px);
      max-height: var(--stat-entry-comp-height, 26px);
      max-width: var(--stat-entry-comp-width, 500px);
    }

    input {
      display: block;
      height: var(--text-input-height, 100%);
      width: var(--text-input-width, 100%);
      box-sizing: border-box;
      border-color: var(--text-input-border-color, #cfd8dc);
      border-radius: var(--text-input-border-radius, 8px);
      background-color: var(--text-input-background-color, #fafafa);
    color: var(--text-input-text-color, #333);
      font-size: var(--text-input-font-size, 14px);
      font-weight: var(--text-input-font-weight, normal);
      font-family: var(--text-input-font-family, Helvetica', 'Arial', sans-serif);
    }
  `;

  private keyupHandler(event: KeyboardEvent) {
    if (this.onKeyup) {
      this.onKeyup((event.target as HTMLInputElement).value);
    }
  }

  private updateStyleVariable(
    propertyName: string,
    cssVar: string,
    fallback: string
  ) {
    const value = (this as any)[propertyName] ?? fallback;
    this.style.setProperty(cssVar, value);
  }

  updated(changed: Map<string, any>) {
    const update = (prop: string, cssVar: string, fallback: string) =>
      changed.has(prop) && this.updateStyleVariable(prop, cssVar, fallback);

    update('compHeight', '--stat-entry-comp-height', '26px');
    update('compWidth', '--stat-entry-comp-width', '500px');

    update('inputHeight', '--text-input-height', '100%');
    update('inputWidth', '--text-input-width', '100%');
    update('inputBorderColor', '--text-input-border-color', '#cfd8dc');
    update('inputBorderRadius', '--text-input-border-radius', '8px');
    update('inputColor', '--text-input-background-color', '#fafafa');

    update('textColor', '--text-input-text-color', '#333');
    update('textFontSize', '--text-input-font-size', '14px');
    update('textFontWeight', '--text-input-font-weight', 'normal');
    update(
      'textFontFamily',
      '--text-input-font-family',
      "'Helvetica', 'Arial', sans-serif"
    );
  }

  render() {
    return html`<input
      @onKeyup=${(e: KeyboardEvent) => this.keyupHandler(e)}
      type="text"
      placeholder=${this.inputPlaceholder ?? ''}
    />`;
  }
}
