import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

type StyleProperty =
  | 'compHeight'
  | 'compWidth'
  | 'contPadX'
  | 'contPadY'
  | 'contBorderRadius'
  | 'contOverflowX'
  | 'contOverflowY'
  | 'contBgColor'
  | 'contFocusBgColor'
  | 'contErrorBgColor'
  | 'textLineHeight'
  | 'fontFamily'
  | 'fontWeight'
  | 'fontSize'
  | 'textColor'
  | 'textAlign'
  | 'focusFontFamily'
  | 'focusFontWeight'
  | 'placeholderColor'
  | 'placeholderFontStyle'
  | 'placeholderFontFamily'
  | 'hoverIconSrc'
  | 'hoverIconHeight'
  | 'hoverIconWidth';

@customElement('invisible-input')
export class InvisibleInput extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare contBgColor?: string;
  @property({ type: String }) declare contFocusBgColor?: string;
  @property({ type: String }) declare contErrorBgColor?: string;

  @property({ type: String }) declare contPadX?: string;
  @property({ type: String }) declare contPadY?: string;
  @property({ type: String }) declare contBorderRadius?: string;
  @property({ type: String }) declare contOverflowX?: string;
  @property({ type: String }) declare contOverflowY?: string;

  @property({ type: String }) declare textLineHeight?: string;

  @property({ type: String }) declare fontFamily?: string;
  @property({ type: String }) declare fontWeight?: string;
  @property({ type: String }) declare fontSize?: string;
  @property({ type: String }) declare textColor?: string;
  @property({ type: String }) declare textAlign?: string;

  @property({ type: String }) declare focusFontFamily?: string;
  @property({ type: String }) declare focusFontWeight?: string;

  @property({ type: String }) declare placeholderColor?: string;
  @property({ type: String }) declare placeholderFontStyle?: string;
  @property({ type: String }) declare placeholderFontFamily?: string;

  @property({ type: Boolean }) declare multiLine?: boolean;

  @property({ type: String }) declare hoverIconSrc?: string;

  @property({ type: String }) declare hoverIconHeight?: string;
  @property({ type: String }) declare hoverIconWidth?: string;

  @property({ type: String }) declare value?: string;
  @property({ type: Boolean }) declare error?: boolean;
  @property({ type: String }) declare placeholder?: string;

  @property({ type: Function }) declare handleSubmit?: (value: string) => void;
  @property({ type: Function }) declare handleChange?: (value: string) => void;
  @property({ type: Function }) declare handleBlur?: (value: string) => void;
  @property({ type: Function }) declare handleKeyUp?: (value: string) => void;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--invisible-input-comp-height, 28px);
      width: var(--invisible-input-comp-width, 300px);
    }

    #container {
      position: relative;
      display: inline-block;
      height: 100%;
      width: 100%;
      background-color: var(--invisible-input-cont-bg-color, transparent);
      box-sizing: border-box;
      padding: var(--invisible-input-cont-pady, 0)
        var(--invisible-input-cont-padx, 0);

      border-radius: var(--invisible-input-border-radius, 4px);
      transition: 0.3s;
    }

    #container.error {
      background-color: var(
        --invisible-input-cont-error-bg-color,
        rgba(200, 40, 40, 0.4)
      );
    }

    #container:not(.multiline):focus-within {
      outline: none;
      background-color: var(--invisible-input-cont-focus-bg-color, transparent);
    }

    #container.multiline:focus-within {
      outline: none;
      background-color: var(--invisible-input-cont-focus-bg-color, transparent);
    }

    #text-input {
      height: 100%;
      width: 100%;
      font-family: var(--invisible-input-font-family, 'FiraMono', monospace);
      background: none;
      border: none;
      color: var(--invisible-input-text-color, black);
      line-height: var(--invisible-input-text-line-height, 27px);
      font-size: var(--invisible-input-font-size, 20px);
      font-weight: var(--invisible-input-font-weight, normal);
      overflow-x: var(--invisible-input-cont-overflow-x, auto);
      overflow-y: var(--invisible-input-cont-overflow-y, auto);
      text-align: var(--invisible-input-text-align, start);
    }

    #text-input::placeholder {
      color: var(--invisible-input-placeholder-color, grey);
      font-style: var(--invisible-input-placeholder-font-style, normal);
      font-family: var(
        --invisible-input-placeholder-font-family,
        'FiraMono',
        monospace
      );
    }

    #text-input:focus {
      outline: none;
      font-weight: var(--invisible-input-focus-font-weight, bold);
      font-family: var(
        --invisible-input-focus-font-family,
        'FiraMonoBold',
        monospace
      );
    }

    #multiline-text-input {
      height: 100%;
      width: 100%;
      background: none;
      border: none;
      line-height: var(--invisible-input-text-line-height, 27px);
      font-family: var(--invisible-input-font-family, 'FiraMono', monospace);
      font-size: var(--invisible-input-font-size, 20px);
      font-weight: var(--invisible-input-font-weight, normal);
      color: var(--invisible-input-text-color, gray);
      resize: none;
      word-break: break-all;
      overflow-x: var(--invisible-input-cont-overflow-x, auto);
      overflow-y: var(--invisible-input-cont-overflow-y, auto);
      text-align: var(--invisible-input-text-align, center);
    }

    #multiline-text-input::placeholder {
      color: var(--invisible-input-placeholder-color, grey);
      font-style: var(--invisible-input-placeholder-font-style, italic);
      font-family: var(--invisible-input-placeholder-font-family, sans-serif);
    }

    #multiline-text-input:focus {
      outline: none;
      font-weight: var(--invisible-input-focus-font-weight, normal);
      font-family: var(
        --invisible-input-focus-font-family,
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
    propertyName: StyleProperty,
    cssVar: string,
    fallback: string
  ) {
    const value = this[propertyName] ?? fallback;
    this.style.setProperty(cssVar, value);
  }

  updated(changed: Map<string, StyleProperty>) {
    const update = (prop: StyleProperty, cssVar: string, fallback: string) =>
      changed.has(prop) && this.updateStyleVariable(prop, cssVar, fallback);

    update('compHeight', '--invisible-input-comp-height', '28px');
    update('compWidth', '--invisible-input-comp-width', '300px');

    update('contOverflowX', '--invisible-input-cont-overflow-x', 'auto');
    update('contOverflowY', '--invisible-input-cont-overflow-y', 'auto');
    update('contPadX', '--invisible-input-cont-padx', '0');
    update('contPadY', '--invisible-input-cont-pady', '0');
    update('contBorderRadius', '--invisible-input-border-radius', '4px');

    update('contBgColor', '--invisible-input-cont-bg-color', 'transparent');
    update(
      'contFocusBgColor',
      '--invisible-input-cont-focus-bg-color',
      'transparent'
    );
    update(
      'contErrorBgColor',
      '--invisible-input-cont-error-bg-color',
      'rgba(200, 40, 40, 0.4)'
    );

    update('textLineHeight', '--invisible-input-text-line-height', '27px');
    update(
      'fontFamily',
      '--invisible-input-font-family',
      "'FiraMono', monospace"
    );
    update('fontWeight', '--invisible-input-font-weight', 'normal');
    update('fontSize', '--invisible-input-font-size', '20px');
    update('textColor', '--invisible-input-text-color', 'black');
    update('textAlign', '--invisible-input-text-align', 'start');
    update(
      'focusFontFamily',
      '--invisible-input-focus-font-family',
      "'FiraMonoBold', monospace"
    );
    update('focusFontWeight', '--invisible-input-focus-font-weight', 'bold');

    update('placeholderColor', '--invisible-input-placeholder-color', 'grey');
    update(
      'placeholderFontStyle',
      '--invisible-input-placeholder-font-style',
      'normal'
    );
    update(
      'placeholderFontFamily',
      '--invisible-input-placeholder-font-family',
      "'FiraMono', monospace"
    );
  }

  public onSubmit(e: KeyboardEvent) {
    if (this.handleSubmit && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit(
        (e.target as HTMLInputElement | HTMLTextAreaElement).value
      );
    }
  }

  static defaultIconSrc =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMyAxNy4yNVYyMWgzLjc1TDE3LjgxIDkuOTRsLTMuNzUtMy43NUwzIDE3LjI1ek0yMC43MSA3LjA0Yy4zOS0uMzkuMzktMS4wMiAwLTEuNDFsLTIuMzQtMi4zNGMtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDBsLTEuODMgMS44MyAzLjc1IDMuNzUgMS44My0xLjgzeiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=';

  render() {
    const multiLine = this.multiLine ? 'multiline' : '';

    const initialValue = this.value ?? '';
    const error = this.error ? 'error' : '';
    return html`<div
      id="container"
      class="${multiLine} ${error}"
      part="container"
    >
      ${!this.multiLine
        ? html`<input
            id="text-input"
            .value="${initialValue}"
            placeholder=${this.placeholder}
            type="text"
            @blur=${this.blurHandler}
            @change=${this.changeHandler}
            @keyup=${this.keyUpHandler}
            @keydown=${this.onSubmit}
            part="singleline-text-input"
          />`
        : html`<textarea
            id="multiline-text-input"
            .value=${initialValue}
            placeholder=${this.placeholder}
            @blur=${this.blurHandler}
            @change=${this.changeHandler}
            @keyup=${this.keyUpHandler}
            @keydown=${this.onSubmit}
            part="multiline-text-input"
          >
          </textarea>`}

      <img
        id="hover-icon"
        src="${this.hoverIconSrc ?? InvisibleInput.defaultIconSrc}"
        alt="hover icon"
        part="hover-icon"
      />
    </div>`;
  }
}
