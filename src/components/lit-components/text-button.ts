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
  @property({ type: String }) declare buttonShadow?: string;
  @property({ type: Function }) declare onClick?: () => void;

  @property({ type: String }) declare tagText?: string;
  @property({ type: String }) declare tagWidth?: string;

  @property({ type: String }) declare tagTextFontSize?: string;
  @property({ type: String }) declare tagTextFontWeight?: string;
  @property({ type: String }) declare tagTextFontFamily?: string;
  @property({ type: String }) declare tagTextColor?: string;
  @property({ type: String }) declare tagTextShadow?: string;
  @property({ type: String }) declare tagTextTransform?: string;
  @property({ type: String }) declare tagTextAlign?: string;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--text-button-comp-height, fit-content);
      width: var(--text-button-comp-width, fit-content);
      max-height: var(--text-button-comp-height, fit-content);
      max-width: var(--text-button-comp-width, fit-content);
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--text-button-height, 30px);
      width: var(--text-button-width, 30px);
      border: none;
      border-radius: 10px;
      box-shadow: 0px 2px 5px #d0d0d0;
      background-color: var(--text-button-bg-color, #eceff1);
      transition: background-color 0.3s;
      cursor: pointer;
    }

    button:hover {
      background-color: var(--text-button-hover-bg-color, #cfd8dc);
    }

    span {
      display: flex;
      justify-content: var(--text-button-tag-text-align, center);
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      height: var(--text-button-text-container-height, fit-content);
      width: var(--text-button-text-container-width, fit-content);
      pointer-events: none;
      font-size: var(--text-button-tag-font-size, 90%);
      font-weight: var(--text-button-tag-font-weight, bold);
      font-family: var(
        --text-button-tag-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(--text-button-tag-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--text-button-tag-color, black);
      text-transform: var(--text-button-tag-text-transform, none);
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

    update('compHeight', '--text-button-comp-height', 'fit-content');
    update('compWidth', '--text-button-comp-width', 'fit-content');

    update('buttonHeight', '--text-button-height', '30px');
    update('buttonWidth', '--text-button-width', '30px');
    update('buttonColor', '--text-button-bg-color', '#eceff1');
    update('buttonHoverColor', '--text-button-hover-bg-color', '#cfd8dc');
    update('buttonShadow', '--text-button-shadow', '0px 2px 5px #d0d0d0');

    update('tagTextColor', '--text-button-tag-color', 'black');
    update('tagTextFontSize', '--text-button-tag-font-size', '90%');
    update('tagTextFontWeight', '--text-button-tag-font-weight', 'bold');
    update(
      'tagTextFontFamily',
      '--text-button-tag-font-family',
      'Helvetica, Arial, sans-serif'
    );
    update(
      'tagTextShadow',
      '--text-button-tag-text-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update('tagTextTransform', '--text-button-tag-text-transform', 'none');
    update('tagTextAlign', '--text-button-tag-text-align', 'center');
    update('tagWidth', '--text-button-text-container-width', 'fit-content');
  }

  render() {
    return html`
      <button part="button" @click=${this.onClick}>
        <span part="tag-text">${this.tagText ?? ''}</span>
      </button>
    `;
  }
}
