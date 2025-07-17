import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('invisible-input')
export class InvisibleInput extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare contHeight?: string;
  @property({ type: String }) declare contWidth?: string;
  @property({ type: String }) declare contPadX?: string;
  @property({ type: String }) declare contPadY?: string;
  @property({ type: String }) declare contBorderRadius?: string;

  @property({ type: String }) declare singleHeight?: string;
  @property({ type: String }) declare singleWidth?: string;
  @property({ type: String }) declare singleMaxHeight?: string;
  @property({ type: String }) declare singleMaxWidth?: string;
  @property({ type: String }) declare singleLineHeight?: string;
  @property({ type: String }) declare singleOverflowX?: string;
  @property({ type: String }) declare singleOverflowY?: string;

  @property({ type: String }) declare singleFontFamily?: string;
  @property({ type: String }) declare singleFontWeight?: string;
  @property({ type: String }) declare singleFontSize?: string;
  @property({ type: String }) declare singleTextColor?: string;

  @property({ type: String }) declare singleFocusFontFamily?: string;
  @property({ type: String }) declare singleFocusFontWeight?: string;
  @property({ type: String }) declare singleFocusBgColor?: string;

  @property({ type: Boolean }) declare multiLine?: boolean;

  @property({ type: String }) declare multiHeight?: string;
  @property({ type: String }) declare multiWidth?: string;
  @property({ type: String }) declare multiMaxHeight?: string;
  @property({ type: String }) declare multiMaxWidth?: string;
  @property({ type: String }) declare multiLineHeight?: string;
  @property({ type: String }) declare multiOverflowX?: string;
  @property({ type: String }) declare multiOverflowY?: string;

  @property({ type: String }) declare multiFontFamily?: string;
  @property({ type: String }) declare multiFontWeight?: string;
  @property({ type: String }) declare multiFontSize?: string;
  @property({ type: String }) declare multiTextColor?: string;

  @property({ type: String }) declare multiFocusFontFamily?: string;
  @property({ type: String }) declare multiFocusFontWeight?: string;
  @property({ type: String }) declare multiFocusBgColor?: string;

  @property({ type: String }) declare hoverIconSrc?: string;

  @property({ type: String }) declare hoverIconHeight?: string;
  @property({ type: String }) declare hoverIconWidth?: string;

  @property({ type: String }) declare errorBgColor?: string;

  @property({ type: String }) declare value?: string;
  @property({ type: String }) declare error?: boolean;
  @property({ type: String }) declare placeholder?: string;

  @property({ type: String }) declare handleChange?: (value: string) => void;
  @property({ type: String }) declare handleBlur?: (value: string) => void;
  @property({ type: String }) declare handleKeyUp?: (value: string) => void;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--invisible-input-comp-height, 200px);
      width: var(--invisible-input-comp-width, 400px);
      max-height: var(--invisible-input-comp-height, 200px);
      max-width: var(--invisible-input-comp-width, 400px);
    }

    #container {
      position: relative;
      display: inline-block;
      height: var(--invisible-input-cont-height, 100%);
      max-height: var(--invisible-input-cont-max-height, 100%);
      width: var(--invisible-input-cont-width, 100%);
      max-width: var(--invisible-input-cont-max-width, 100%);

      box-sizing: border-box;
      padding: var(--invisible-input-cont-padx, 0)
        var(--invisible-input-cont-pady, 0);
      border-radius: var(--invisible-input-border-radius, 4px);
      transition: 0.3s;
    }

    #container.error,
    #text-input.error,
    #multiline-text-input.error {
      background-color: var(
        --invisible-input-error-bg-color,
        rgba(200, 40, 40, 0.4)
      );
    }

    #container:not(.multiline):focus-within {
      outline: none;
      background-color: var(
        --invisible-input-singleline-focus-bg-color,
        transparent
      );
    }

    #container.multiline:focus-within {
      outline: none;
      background-color: var(
        --invisible-input-multiline-focus-bg-color,
        #eceff1
      );
    }

    #text-input {
      height: var(--invisible-input-singleline-height, 100%);
      width: var(--invisible-input-singleline-width, 100%);
      font-family: var(
        --invisible-input-singleline-font-family,
        'FiraMono',
        monospace
      );
      background: none;
      border: none;
      color: var(--invisible-input-singleline-text-color, black);
      line-height: var(--invisible-input-singleline-line-height, 100%);
      font-size: var(--invisible-input-singleline-font-size, 100%);
      font-weight: var(--invisible-input-singleline-font-weight, normal);
      overflow-x: var(--invisible-input-cont-overflow-x, auto);
      overflow-y: var(--invisible-input-cont-overflow-y, auto);
    }

    #text-input:focus {
      outline: none;
      font-weight: var(--invisible-input-singleline-focus-font-weight, bold);
      font-family: var(
        --invisible-input-singleline-focus-font-family,
        'FiraMonoBold',
        monospace
      );
    }

    #multiline-text-input {
      height: var(--invisible-input-multiline-height, 100%);
      width: var(--invisible-input-multiline-width, 100%);
      max-height: var(--invisible-input-multiline-max-height, 100%);
      max-width: var(--invisible-input-multiline-max-width, 100%);
      background: none;
      border: none;
      line-height: var(--invisible-input-multiline-line-height, 21px);
      font-family: var(
        --invisible-input-multiline-font-family,
        'FiraMono',
        monospace
      );
      font-size: var(--invisible-input-multiline-font-size, 20px);
      font-weight: var(--invisible-input-multiline-font-weight, normal);
      color: var(--invisible-input-multiline-text-color, gray);
      resize: none;
      word-break: break-all;
      overflow-x: var(--invisible-input-cont-overflow-x, auto);
      overflow-y: var(--invisible-input-cont-overflow-y, auto);
    }

    #multiline-text-input:focus {
      outline: none;
      font-weight: var(--invisible-input-multiline-focus-font-weight, normal);
      font-family: var(
        --invisible-input-multiline-focus-font-family,
        'FiraMono',
        monospace
      );
    }

    #hover-icon {
      position: absolute;
      right: 0;
      top: 0;
      width: var(--invisible-input-hover-icon-width, 24px);
      max-width: var(--invisible-input-hover-icon-width, 24px);
      height: var(--invisible-input-hover-icon-height, 24px);
      max-height: var(--invisible-input-hover-icon-height, 24px);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
    }

    #container:hover #hover-icon {
      opacity: 1;
    }
  `;

  private changeHandler(event: Event) {
    if (this.handleChange)
      this.handleChange(
        (event.target as HTMLInputElement | HTMLTextAreaElement).value
      );
  }

  private blurHandler(event: Event) {
    if (this.handleBlur)
      this.handleBlur(
        (event.target as HTMLInputElement | HTMLTextAreaElement).value
      );
  }

  private keyUpHandler(event: Event) {
    if (this.handleKeyUp)
      this.handleKeyUp(
        (event.target as HTMLInputElement | HTMLTextAreaElement).value
      );
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

    update('compHeight', '--invisible-input-comp-height', '200px');
    update('compWidth', '--invisible-input-comp-width', '400px');

    update('contHeight', '--invisible-input-cont-height', '100%');
    update('contWidth', '--invisible-input-cont-width', '100%');
    update('contOverflowX', '--invisible-input-cont-overflow-x', 'auto');
    update('contOverflowY', '--invisible-input-cont-overflow-y', 'auto');
    update('contPadX', '--invisible-input-cont-padx', '0');
    update('contPadY', '--invisible-input-cont-pady', '0');
    update('contBorderRadius', '--invisible-input-border-radius', '4px');

    update('singleHeight', '--invisible-input-singleline-height', '100%');
    update('singleWidth', '--invisible-input-singleline-width', '100%');
    update('singleMaxHeight', '--invisible-input-single-max-height', '100%');
    update('singleMaxWidth', '--invisible-input-single-max-width', '100%');
    update(
      'singleLineHeight',
      '--invisible-input-singleline-line-height',
      '100%'
    );
    update(
      'singleFontFamily',
      '--invisible-input-singleline-font-family',
      "'FiraMono', monospace"
    );
    update(
      'singleFontWeight',
      '--invisible-input-singleline-font-weight',
      'normal'
    );
    update('singleFontSize', '--invisible-input-singleline-font-size', '100%');
    update(
      'singleTextColor',
      '--invisible-input-singleline-text-color',
      'black'
    );
    update(
      'singleFocusFontFamily',
      '--invisible-input-singleline-focus-font-family',
      "'FiraMonoBold', monospace"
    );
    update(
      'singleFocusFontWeight',
      '--invisible-input-singleline-focus-font-weight',
      'bold'
    );
    update(
      'singleFocusBgColor',
      '--invisible-input-singleline-focus-bg-color',
      'transparent'
    );

    update('multiHeight', '--invisible-input-multiline-height', '100%');
    update('multiWidth', '--invisible-input-multiline-width', '100%');
    update('multiMaxHeight', '--invisible-input-multiline-max-height', '100%');
    update('multiMaxWidth', '--invisible-input-multiline-max-width', '100%');
    update(
      'multiLineHeight',
      '--invisible-input-multiline-line-height',
      '21px'
    );
    update(
      'multiFontFamily',
      '--invisible-input-multiline-font-family',
      "'FiraMono', monospace"
    );
    update(
      'multiFontWeight',
      '--invisible-input-multiline-font-weight',
      'normal'
    );
    update('multiFontSize', '--invisible-input-multiline-font-size', '20px');
    update('multiTextColor', '--invisible-input-multiline-text-color', 'gray');
    update(
      'multiFocusFontFamily',
      '--invisible-input-multiline-focus-font-family',
      "'FiraMono', monospace"
    );
    update(
      'multiFocusFontWeight',
      '--invisible-input-multiline-focus-font-weight',
      'normal'
    );
    update(
      'multiFocusBgColor',
      '--invisible-input-multiline-focus-bg-color',
      '#eceff1'
    );

    update(
      'errorBgColor',
      '--invisible-input-error-bg-color',
      'rgba(200, 40, 40, 0.4)'
    );
  }

  static defaultIconSrc =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMyAxNy4yNVYyMWgzLjc1TDE3LjgxIDkuOTRsLTMuNzUtMy43NUwzIDE3LjI1ek0yMC43MSA3LjA0Yy4zOS0uMzkuMzktMS4wMiAwLTEuNDFsLTIuMzQtMi4zNGMtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDBsLTEuODMgMS44MyAzLjc1IDMuNzUgMS44My0xLjgzeiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=';

  render() {
    const multiLine = this.multiLine ? 'multiline' : '';

    const initialValue = this.value ?? '';
    return html`<div
      id="container"
      class="${multiLine} ${this.error ? 'error' : ''}"
    >
      ${!this.multiLine
        ? html`<input
            id="text-input"
            class="${this.error}"
            .value="${initialValue}"
            placeholder=${this.placeholder}
            type="text"
            @blur=${this.blurHandler}
            @change=${this.changeHandler}
            @keyup=${this.keyUpHandler}
          />`
        : html`<textarea
            id="multiline-text-input"
            class="${this.error}"
            .value=${initialValue}
            placeholder=${this.placeholder}
            @blur=${this.blurHandler}
            @change=${this.changeHandler}
            @keyup=${this.keyUpHandler}
          >
          </textarea>`}

      <img
        id="hover-icon"
        src="${this.hoverIconSrc ?? InvisibleInput.defaultIconSrc}"
      />
    </div>`;
  }
}
