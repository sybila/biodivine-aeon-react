import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dot-header')
export class DotHeader extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare justifyHeader?: string;
  @property({ type: String }) declare alignHeader?: string;
  @property({ type: String }) declare dotTextGap?: string;

  @property({ type: String }) declare headerText?: string;
  @property({ type: String }) declare lineHeight?: string;
  @property({ type: String }) declare textFontSize?: string;
  @property({ type: String }) declare textFontWeight?: string;
  @property({ type: String }) declare textFontFamily?: string;
  @property({ type: String }) declare textColor?: string;
  @property({ type: String }) declare textShadow?: string;
  @property({ type: String }) declare textTransform?: string;
  @property({ type: String }) declare textAlign?: string;

  static styles = css`
    :host {
      display: flex;
      justify-content: var(--dot-header-justify-content, center);
      align-items: var(--dot-header-align-items, center);
      height: var(--dot-header-comp-height, fit-content);
      width: var(--dot-header-comp-width, fit-content);
      gap: var(--dot-header-dot-text-gap, 7px);
      overflow: hidden;
      pointer-events: none;
    }

    span {
      display: flex;
      justify-content: center;
      height: fit-content;
      width: fit-content;
      line-height: var(--dot-header-line-height, 20px);
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      pointer-events: none;
      text-align: var(--dot-header-text-align, center);
      font-size: var(--dot-header-font-size, 19px);
      font-weight: var(--dot-header-font-weight, normal);
      font-family: var(--dot-header-font-family, 'FiraMono', sans-serif);
      text-shadow: var(--dot-header-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--dot-header-color, black);
      text-transform: var(--dot-header-text-transform, uppercase);
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

    update('compHeight', '--dot-header-comp-height', 'fit-content');
    update('compWidth', '--dot-header-comp-width', 'fit-content');
    update('justifyHeader', '--dot-header-justify-content', 'center');
    update('alignHeader', '--dot-header-align-items', 'center');
    update('dotTextGap', '--dot-header-dot-text-gap', '7px');
    update('lineHeight', '--dot-header-line-height', '20px');
    update('textFontSize', '--dot-header-font-size', '19px');
    update('textFontWeight', '--dot-header-font-weight', 'normal');
    update(
      'textFontFamily',
      '--dot-header-font-family',
      "'FiraMono', sans-serif"
    );
    update('textColor', '--dot-header-color', 'black');
    update('textShadow', '--dot-header-text-shadow', '0px 2px 5px #d0d0d0');
    update('textTransform', '--dot-header-text-transform', 'uppercase');
    update('textAlign', '--dot-header-text-align', 'center');
  }

  render() {
    return html`<span id="dot" part="dot">∘</span
      ><span id="text" part="text">${this.headerText ?? ''}</span> `;
  }
}
