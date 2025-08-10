import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-icon-button')
export class TextIconButton extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare buttonHeight?: string;
  @property({ type: String }) declare buttonWidth?: string;
  @property({ type: String }) declare buttonColor?: string;
  @property({ type: String }) declare buttonHoverColor?: string;
  @property({ type: String }) declare buttonActiveColor?: string;
  @property({ type: String }) declare buttonShadow?: string;
  @property({ type: String }) declare buttonJustifyContent?: string;
  @property({ type: String }) declare buttonAlignItems?: string;

  @property({ type: Function }) declare handleClick?: () => void;

  @property({ type: String }) declare text?: string;
  @property({ type: String }) declare textContainerHeight?: string;
  @property({ type: String }) declare textContainerWidth?: string;

  @property({ type: String }) declare textFontSize?: string;
  @property({ type: String }) declare textFontWeight?: string;
  @property({ type: String }) declare textFontFamily?: string;
  @property({ type: String }) declare textColor?: string;
  @property({ type: String }) declare textShadow?: string;
  @property({ type: String }) declare textTransform?: string;
  @property({ type: String }) declare textAlign?: string;
  @property({ type: String }) declare textLineHeight?: string;

  @property({ type: String }) declare iconSrc?: string;
  @property({ type: String }) declare iconAlt?: string;
  @property({ type: String }) declare iconHeight?: string;
  @property({ type: String }) declare iconWidth?: string;

  @property({ type: Boolean }) declare active?: boolean;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--text-icon-button-comp-height, 40px);
      width: var(--text-icon-button-comp-width, 180px);
      max-height: var(--text-icon-button-comp-height, 40px);
      max-width: var(--text-icon-button-comp-width, 180px);
    }

    button {
      display: flex;
      justify-content: var(--text-icon-button-justify-content, space-around);
      align-items: var(--text-icon-button-align-items, center);
      height: var(--text-icon-button-height, 100%);
      width: var(--text-icon-button-width, 100%);
      border: none;
      border-radius: 10px;
      box-shadow: 0px 2px 5px #d0d0d0;
      background-color: var(--text-icon-button-bg-color, #eceff1);
      transition: background-color 0.3s;
      cursor: pointer;
    }

    button:hover,
    button.active:hover {
      background-color: var(--text-icon-button-hover-bg-color, #b0bec5);
    }

    button.active {
      background-color: var(--text-icon-button-active-bg-color, #cfd8dc);
    }

    span {
      display: flex;
      justify-content: var(--text-icon-button-text-align, center);
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      height: var(--text-icon-button-text-container-height, 100%);
      width: var(--text-icon-button-text-container-width, 80%);
      max-width: var(--text-icon-button-text-container-width, 80%);
      pointer-events: none;
      line-height: var(--text-icon-button-line-height, 20px);
      font-size: var(--text-icon-button-font-size, 16px);
      font-weight: var(--text-icon-button-font-weight, bold);
      font-family: var(
        --text-icon-button-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(--text-icon-button-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--text-icon-button-text-color, black);
      text-transform: var(--text-icon-button-text-transform, none);
    }

    #icon {
      height: var(--text-icon-button-icon-height, 24px);
      width: var(--text-icon-button-icon-width, 24px);
      max-height: var(--text-icon-button-icon-height, 24px);
      max-width: var(--text-icon-button-icon-width, 24px);
    }
  `;

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

    update('compHeight', '--text-icon-button-comp-height', '40px');
    update('compWidth', '--text-icon-button-comp-width', '180px');

    update('buttonHeight', '--text-icon-button-height', '100%');
    update('buttonWidth', '--text-icon-button-width', '100%');
    update('buttonColor', '--text-icon-button-bg-color', '#eceff1');
    update('buttonHoverColor', '--text-icon-button-hover-bg-color', '#b0bec5');
    update(
      'buttonActiveColor',
      '--text-icon-button-active-bg-color',
      '#cfd8dc'
    );
    update('buttonShadow', '--text-icon-button-shadow', '0px 2px 5px #d0d0d0');
    update(
      'buttonJustifyContent',
      '--text-icon-button-justify-content',
      'space-around'
    );
    update('buttonAlignItems', '--text-icon-button-align-items', 'center');

    update('textColor', '--text-icon-button-text-color', 'black');
    update('textFontSize', '--text-icon-button-font-size', '16px');
    update('textFontWeight', '--text-icon-button-font-weight', 'bold');
    update(
      'textFontFamily',
      '--text-icon-button-font-family',
      'Helvetica, Arial, sans-serif'
    );
    update(
      'textShadow',
      '--text-icon-button-text-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update('textTransform', '--text-icon-button-text-transform', 'none');
    update('textAlign', '--text-icon-button-text-align', 'center');
    update('textLineHeight', '--text-icon-button-line-height', '20px');
    update(
      'textContainerHeight',
      '--text-icon-button-text-container-height',
      '100%'
    );
    update(
      'textContainerWidth',
      '--text-icon-button-text-container-width',
      '80%'
    );

    update('iconSrc', '--text-icon-button-icon-src', '');
    update('iconAlt', '--text-icon-button-icon-alt', 'Icon');
    update('iconHeight', '--text-icon-button-icon-height', '24px');
    update('iconWidth', '--text-icon-button-icon-width', '24px');
  }

  render() {
    const active = this.active ? 'active' : '';
    return html`
      <button part="button" class=${active} @click=${this.handleClick}>
        <span part="text">${this.text ?? ''}</span>
        <img
          id="icon"
          part="icon"
          src="${this.iconSrc ?? ''}"
          alt="${this.iconAlt ?? 'Icon'}"
        />
      </button>
    `;
  }
}
