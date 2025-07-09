import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('simple-header')
export class SimpleHeader extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare justifyHeader?: string;
  @property({ type: String }) declare alignHeader?: string;

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
      justify-content: var(--simple-header-justify-content, center);
      align-items: var(--simple-header-align-items, center);
      height: var(--simple-header-comp-height, fit-content);
      width: var(--simple-header-comp-width, fit-content);
      overflow: hidden;
    }

    span {
      display: flex;
      justify-content: center;
      height: fit-content;
      width: fit-content;
      line-height: var(--simple-header-line-height, 22px);
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      pointer-events: none;
      text-align: var(--simple-header-text-align, center);
      font-size: var(--simple-header-font-size, 21px);
      font-weight: var(--simple-header-font-weight, bold);
      font-family: var(
        --simple-header-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(--simple-header-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--simple-header-color, black);
      text-transform: var(--simple-header-text-transform, none);
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

    update('compHeight', '--simple-header-comp-height', 'fit-content');
    update('compWidth', '--simple-header-comp-width', 'fit-content');
    update('justifyHeader', '--simple-header-justify-content', 'center');
    update('alignHeader', '--simple-header-align-items', 'center');
    update('lineHeight', '--simple-header-line-height', '22px');
    update('textFontSize', '--simple-header-font-size', '21px');
    update('textFontWeight', '--simple-header-font-weight', 'bold');
    update(
      'textFontFamily',
      '--simple-header-font-family',
      "'Helvetica', 'Arial', sans-serif"
    );
    update('textColor', '--simple-header-color', 'black');
    update('textShadow', '--simple-header-text-shadow', '0px 2px 5px #d0d0d0');
    update('textTransform', '--simple-header-text-transform', 'none');
    update('textAlign', '--simple-header-text-align', 'center');
  }

  render() {
    return html`<span>${this.headerText ?? ''}</span>`;
  }
}
