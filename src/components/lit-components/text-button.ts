import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-button')
export class TextButton extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare buttonHeight?: string;
  @property({ type: String }) declare buttonWidth?: string;
  @property({ type: String }) declare buttonColor?: string;
  @property({ type: String }) declare buttonHoverColor?: string;
  @property({ type: String }) declare buttonActiveColor?: string;
  @property({ type: String }) declare buttonShadow?: string;
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

  @property({ type: Boolean }) declare active?: boolean;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--text-button-comp-height, 30px);
      width: var(--text-button-comp-width, 60px);
      max-height: var(--text-button-comp-height, 30px);
      max-width: var(--text-button-comp-width, 60px);
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--text-button-height, 100%);
      width: var(--text-button-width, 100%);
      border: none;
      border-radius: 10px;
      box-shadow: 0px 2px 5px #d0d0d0;
      background-color: var(--text-button-bg-color, #eceff1);
      transition: background-color 0.3s;
      cursor: pointer;
    }

    button:hover,
    button.active:hover {
      background-color: var(--text-button-hover-bg-color, #b0bec5);
    }

    button.active {
      background-color: var(--text-button-active-bg-color, #cfd8dc);
    }

    span {
      display: flex;
      justify-content: var(--text-button-text-align, center);
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      height: var(--text-button-text-container-height, 100%);
      width: var(--text-button-text-container-width, 100%);
      pointer-events: none;
      line-height: var(--text-button-line-height, 20px);
      font-size: var(--text-button-font-size, 16px);
      font-weight: var(--text-button-font-weight, bold);
      font-family: var(
        --text-button-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(--text-button-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--text-button-text-color, black);
      text-transform: var(--text-button-text-transform, none);
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

    update('compHeight', '--text-button-comp-height', '30px');
    update('compWidth', '--text-button-comp-width', '60px');

    update('buttonHeight', '--text-button-height', '100%');
    update('buttonWidth', '--text-button-width', '100%');
    update('buttonColor', '--text-button-bg-color', '#eceff1');
    update('buttonHoverColor', '--text-button-hover-bg-color', '#b0bec5');
    update('buttonActiveColor', '--text-button-active-bg-color', '#cfd8dc');
    update('buttonShadow', '--text-button-shadow', '0px 2px 5px #d0d0d0');

    update('textColor', '--text-button-text-color', 'black');
    update('textFontSize', '--text-button-font-size', '16px');
    update('textFontWeight', '--text-button-font-weight', 'bold');
    update(
      'textFontFamily',
      '--text-button-font-family',
      'Helvetica, Arial, sans-serif'
    );
    update('textShadow', '--text-button-text-shadow', '0px 2px 5px #d0d0d0');
    update('textTransform', '--text-button-text-transform', 'none');
    update('textAlign', '--text-button-text-align', 'center');
    update('textLineHeight', '--text-button-line-height', '20px');
    update(
      'textContainerHeight',
      '--text-button-text-container-height',
      '100%'
    );
    update('textContainerWidth', '--text-button-text-container-width', '100%');
  }

  render() {
    const active = this.active ? 'active' : '';
    return html`
      <button part="button" class=${active} @click=${this.handleClick}>
        <span part="text">${this.text ?? ''}</span>
      </button>
    `;
  }
}
