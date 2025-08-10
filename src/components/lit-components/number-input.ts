import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('number-input')
export class NumberInput extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare inputHeight?: string;
  @property({ type: String }) declare inputWidth?: string;
  @property({ type: String }) declare inputBorderColor?: string;
  @property({ type: String }) declare inputBorderRadius?: string;
  @property({ type: String }) declare inputColor?: string;

  @property({ type: String }) declare textColor?: string;
  @property({ type: String }) declare textFontSize?: string;
  @property({ type: String }) declare textFontWeight?: string;
  @property({ type: String }) declare textFontFamily?: string;

  @property({ type: String }) declare placeholder?: string;
  @property({ type: String }) declare value?: string;

  @property({ type: Number }) declare min?: number;
  @property({ type: Number }) declare max?: number;
  @property({ type: Number }) declare step?: number;

  @property({ type: Function }) declare handleChange?: (
    value: number | undefined
  ) => void;
  @property({ type: Function }) declare handleBlur?: (
    value: number | undefined
  ) => void;
  @property({ type: Function }) declare handleKeyUp?: (
    value: number | undefined
  ) => void;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--text-input-comp-height, 26px);
      width: var(--text-input-comp-width, 500px);
      max-height: var(--text-input-comp-height, 26px);
      max-width: var(--text-input-comp-width, 500px);
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
      font-family: var(
        --text-input-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
    }
  `;

  private getInputValue(event: Event): number | undefined {
    const value = (event.target as HTMLInputElement).value;
    return value === '' ? undefined : Number(value);
  }

  private changeHandler(event: Event) {
    if (this.handleChange) this.handleChange(this.getInputValue(event));
  }

  private blurHandler(event: Event) {
    if (this.handleBlur) this.handleBlur(this.getInputValue(event));
  }

  private keyUpHandler(event: Event) {
    if (this.handleKeyUp) this.handleKeyUp(this.getInputValue(event));
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

    update('compHeight', '--text-input-comp-height', '26px');
    update('compWidth', '--text-input-comp-width', '500px');

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
      @keyup=${(e: KeyboardEvent) => this.keyUpHandler(e)}
      @change=${(e: Event) => this.changeHandler(e)}
      @blur=${(e: Event) => this.blurHandler(e)}
      type="number"
      min=${this.min ?? ''}
      max=${this.max ?? ''}
      step=${this.step ?? ''}
      placeholder=${this.placeholder ?? ''}
      .value=${this.value ?? ''}
      part="number-input"
    />`;
  }
}
