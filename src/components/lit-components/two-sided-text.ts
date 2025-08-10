import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('two-sided-text')
export class TwoSidedText extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare justifyHeader?: string;
  @property({ type: String }) declare alignHeader?: string;

  @property({ type: String }) declare rightText?: string;
  @property({ type: String }) declare rightHeight?: string;
  @property({ type: String }) declare rightWidth?: string;
  @property({ type: String }) declare rightLineHeight?: string;
  @property({ type: String }) declare rightFontSize?: string;
  @property({ type: String }) declare rightFontWeight?: string;
  @property({ type: String }) declare rightFontFamily?: string;
  @property({ type: String }) declare rightColor?: string;
  @property({ type: String }) declare rightShadow?: string;
  @property({ type: String }) declare rightTransform?: string;
  @property({ type: String }) declare rightAlign?: string;

  @property({ type: String }) declare leftText?: string;
  @property({ type: String }) declare leftHeight?: string;
  @property({ type: String }) declare leftWidth?: string;
  @property({ type: String }) declare leftLineHeight?: string;
  @property({ type: String }) declare leftFontSize?: string;
  @property({ type: String }) declare leftFontWeight?: string;
  @property({ type: String }) declare leftFontFamily?: string;
  @property({ type: String }) declare leftColor?: string;
  @property({ type: String }) declare leftShadow?: string;
  @property({ type: String }) declare leftTransform?: string;
  @property({ type: String }) declare leftAlign?: string;

  static styles = css`
    :host {
      display: flex;
      justify-content: var(--two-sided-text-justify-content, center);
      align-items: var(--two-sided-text-align-items, center);
      height: var(--two-sided-text-comp-height, fit-content);
      width: var(--two-sided-text-comp-width, fit-content);
      overflow: hidden;
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      pointer-events: none;
    }

    #right-text {
      height: var(--two-sided-text-right-height, fit-content);
      width: var(--two-sided-text-right-width, fit-content);
      line-height: var(--two-sided-text-right-line-height, 40px);
      text-align: var(--two-sided-text-right-text-align, center);
      font-size: var(--two-sided-text-right-font-size, 31px);
      font-weight: var(--two-sided-text-right-font-weight, normal);
      font-family: var(
        --two-sided-text-right-font-family,
        'BaileyReg',
        monospace,
        sans-serif
      );
      text-shadow: var(--two-sided-text-right-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--two-sided-text-right-color, #3a568c);
      text-transform: var(--two-sided-text-right-text-transform, none);
    }

    #left-text {
      height: var(--two-sided-text-left-height, fit-content);
      width: var(--two-sided-text-left-width, fit-content);
      line-height: var(--two-sided-text-left-line-height, 40px);
      text-align: var(--two-sided-text-left-text-align, center);
      font-size: var(--two-sided-text-left-font-size, 31px);
      font-weight: var(--two-sided-text-left-font-weight, bold);
      font-family: var(
        --two-sided-text-left-font-family,
        'BaileyBold',
        monospace,
        sans-serif
      );
      text-shadow: var(--two-sided-text-left-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--two-sided-text-left-color, #d05d5d);
      text-transform: var(--two-sided-text-left-text-transform, none);
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

    update('compHeight', '--two-sided-text-comp-height', 'fit-content');
    update('compWidth', '--two-sided-text-comp-width', 'fit-content');
    update('justifyHeader', '--two-sided-text-justify-content', 'center');
    update('alignHeader', '--two-sided-text-align-items', 'center');

    // Right side
    update('rightHeight', '--two-sided-text-right-height', 'fit-content');
    update('rightWidth', '--two-sided-text-right-width', 'fit-content');
    update('rightLineHeight', '--two-sided-text-right-line-height', '40px');
    update('rightFontSize', '--two-sided-text-right-font-size', '31px');
    update('rightFontWeight', '--two-sided-text-right-font-weight', 'normal');
    update(
      'rightFontFamily',
      '--two-sided-text-right-font-family',
      "'BaileyReg', monospace, sans-serif"
    );
    update('rightColor', '--two-sided-text-right-color', '#3a568c');
    update(
      'rightShadow',
      '--two-sided-text-right-text-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update('rightTransform', '--two-sided-text-right-text-transform', 'none');
    update('rightAlign', '--two-sided-text-right-text-align', 'center');

    // Left side
    update('leftHeight', '--two-sided-text-left-height', 'fit-content');
    update('leftWidth', '--two-sided-text-left-width', 'fit-content');
    update('leftLineHeight', '--two-sided-text-left-line-height', '40px');
    update('leftFontSize', '--two-sided-text-left-font-size', '31px');
    update('leftFontWeight', '--two-sided-text-left-font-weight', 'bold');
    update(
      'leftFontFamily',
      '--two-sided-text-left-font-family',
      "'BaileyBold', monospace, sans-serif"
    );
    update('leftColor', '--two-sided-text-left-color', '#d05d5d');
    update(
      'leftShadow',
      '--two-sided-text-left-text-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update('leftTransform', '--two-sided-text-left-text-transform', 'none');
    update('leftAlign', '--two-sided-text-left-text-align', 'center');
  }

  render() {
    return html`<span id="right-text" part="right-text"
        >${this.rightText ?? ''}</span
      ><span id="left-text" part="left-text">${this.leftText ?? ''}</span>`;
  }
}
