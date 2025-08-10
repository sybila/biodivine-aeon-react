import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('double-text-button')
export class DoubleTextButton extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare buttonHeight?: string;
  @property({ type: String }) declare buttonWidth?: string;
  @property({ type: String }) declare buttonBorderRadius?: string;
  @property({ type: String }) declare buttonShadow?: string;

  @property({ type: Function }) declare onClick?: () => void;

  @property({ type: String }) declare leftColor?: string;
  @property({ type: String }) declare leftHoverColor?: string;
  @property({ type: String }) declare leftText?: string;
  @property({ type: String }) declare leftWidth?: string;
  @property({ type: String }) declare leftPadX?: string;
  @property({ type: String }) declare leftTextFontSize?: string;
  @property({ type: String }) declare leftTextFontWeight?: string;
  @property({ type: String }) declare leftTextFontFamily?: string;
  @property({ type: String }) declare leftTextColor?: string;
  @property({ type: String }) declare leftTextShadow?: string;
  @property({ type: String }) declare leftTextTransform?: string;
  @property({ type: String }) declare leftTextAlign?: string;
  @property({ type: String }) declare leftLineHeight?: string;

  @property({ type: String }) declare rightColor?: string;
  @property({ type: String }) declare rightHoverColor?: string;
  @property({ type: String }) declare rightText?: string;
  @property({ type: String }) declare rightWidth?: string;
  @property({ type: String }) declare rightPadX?: string;
  @property({ type: String }) declare rightTextFontSize?: string;
  @property({ type: String }) declare rightTextFontWeight?: string;
  @property({ type: String }) declare rightTextFontFamily?: string;
  @property({ type: String }) declare rightTextColor?: string;
  @property({ type: String }) declare rightTextShadow?: string;
  @property({ type: String }) declare rightTextTransform?: string;
  @property({ type: String }) declare rightTextAlign?: string;
  @property({ type: String }) declare rightLineHeight?: string;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--double-text-button-comp-height, 60px);
      width: var(--double-text-button-comp-width, 242px);
      max-height: var(--double-text-button-comp-height, 60px);
      max-width: var(--double-text-button-comp-width, 242px);
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--double-text-button-height, 100%);
      width: var(--double-text-button-width, 100%);
      box-shadow: var(--double-text-button-shadow, 0px 2px 5px #d0d0d0);
      padding: 0;
      background-color: transparent;
      border: none;
      border-radius: var(--double-text-button-border-radius, 12px);
      cursor: pointer;
      overflow: hidden;
    }

    button:hover #left-section {
      background-color: var(--double-text-button-left-hover-bg-color, #cfd8dc);
    }

    button:hover #right-section {
      background-color: var(--double-text-button-right-hover-bg-color, #b0bec5);
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      box-sizing: border-box;
      overflow: hidden;
      transition: background-color 0.3s;
    }

    #left-section {
      width: var(--double-text-button-left-width, 50%);
      background-color: var(--double-text-button-left-bg-color, #eceff1);
      padding-left: var(--double-text-button-left-padx, 10px);
      padding-right: var(--double-text-button-left-padx, 10px);
      font-size: var(--double-text-button-left-font-size, 16px);
      font-weight: var(--double-text-button-left-font-weight, bold);
      font-family: var(
        --double-text-button-left-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(
        --double-text-button-left-text-shadow,
        0px 2px 5px #d0d0d0
      );
      color: var(--double-text-button-left-color, black);
      text-transform: var(--double-text-button-left-text-transform, none);
      text-align: var(--double-text-button-left-text-align, center);
      line-height: var(--double-text-button-left-line-height, 21px);
    }

    #right-section {
      width: var(--double-text-button-right-width, 50%);
      background-color: var(--double-text-button-right-bg-color, #cfd8dc);
      padding-left: var(--double-text-button-right-padx, 10px);
      padding-right: var(--double-text-button-right-padx, 10px);
      font-size: var(--double-text-button-right-font-size, 16px);
      font-weight: var(--double-text-button-right-font-weight, bold);
      font-family: var(
        --double-text-button-right-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(
        --double-text-button-right-text-shadow,
        0px 2px 5px #d0d0d0
      );
      color: var(--double-text-button-right-color, black);
      text-transform: var(--double-text-button-right-text-transform, none);
      text-align: var(--double-text-button-right-text-align, center);
      line-height: var(--double-text-button-right-line-height, 21px);
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

    update('compHeight', '--double-text-button-comp-height', '60px');
    update('compWidth', '--double-text-button-comp-width', '242px');

    update('buttonHeight', '--double-text-button-height', '100%');
    update('buttonWidth', '--double-text-button-width', '100%');
    update('buttonBorderRadius', '--double-text-button-border-radius', '12px');
    update(
      'buttonShadow',
      '--double-text-button-shadow',
      '0px 2px 5px #d0d0d0'
    );

    update('leftColor', '--double-text-button-left-bg-color', '#eceff1');
    update(
      'leftHoverColor',
      '--double-text-button-left-hover-bg-color',
      '#CFD8DC'
    );
    update('leftPadX', '--double-text-button-left-padx', '10px');
    update('leftWidth', '--double-text-button-left-width', '50%');
    update('leftTextFontSize', '--double-text-button-left-font-size', '16px');
    update(
      'leftTextFontWeight',
      '--double-text-button-left-font-weight',
      'bold'
    );
    update(
      'leftTextFontFamily',
      '--double-text-button-left-font-family',
      `'Helvetica', 'Arial', sans-serif`
    );
    update('leftTextColor', '--double-text-button-left-color', 'black');
    update(
      'leftTextShadow',
      '--double-text-button-left-text-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update(
      'leftTextTransform',
      '--double-text-button-left-text-transform',
      'none'
    );
    update('leftTextAlign', '--double-text-button-left-text-align', 'center');
    update('leftLineHeight', '--double-text-button-left-line-height', '21px');

    update('rightColor', '--double-text-button-right-bg-color', '#cfd8dc');
    update(
      'rightHoverColor',
      '--double-text-button-right-hover-bg-color',
      '#B0BEC5'
    );
    update('rightPadX', '--double-text-button-right-padx', '10px');
    update('rightWidth', '--double-text-button-right-width', '50%');
    update('rightTextFontSize', '--double-text-button-right-font-size', '16px');
    update(
      'rightTextFontWeight',
      '--double-text-button-right-font-weight',
      'bold'
    );
    update(
      'rightTextFontFamily',
      '--double-text-button-right-font-family',
      `'Helvetica', 'Arial', sans-serif`
    );
    update('rightTextColor', '--double-text-button-right-color', 'black');
    update(
      'rightTextShadow',
      '--double-text-button-right-text-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update(
      'rightTextTransform',
      '--double-text-button-right-text-transform',
      'none'
    );
    update('rightTextAlign', '--double-text-button-right-text-align', 'center');
    update('rightLineHeight', '--double-text-button-right-line-height', '21px');
  }

  render() {
    return html`<button part="button" @click="${this.onClick}">
      <span id="left-section" part="left-section">
        ${this.leftText ? this.leftText : ''}
      </span>
      <span id="right-section" part="right-section">
        ${this.rightText ? this.rightText : ''}
      </span>
    </button> `;
  }
}
