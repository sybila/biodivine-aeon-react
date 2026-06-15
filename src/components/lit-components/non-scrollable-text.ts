import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type StyleProperty =
  | 'compHeight'
  | 'compWidth'
  | 'userSelect'
  | 'textColor'
  | 'textJustify'
  | 'textAlign'
  | 'textShadow'
  | 'textFontSize'
  | 'textFontWeight'
  | 'textFontFamily'
  | 'textOverflow';

@customElement('non-scrollable-text')
export class NonScrollableText extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare textColor?: string;
  @property({ type: String }) declare textJustify?: string;
  @property({ type: String }) declare textAlign?: string;
  @property({ type: String }) declare textShadow?: string;
  @property({ type: String }) declare textFontSize?: string;
  @property({ type: String }) declare textFontWeight?: string;
  @property({ type: String }) declare textFontFamily?: string;
  @property({ type: String }) declare textOverflow?: string;

  @property({ type: String }) declare userSelect?: string;

  @property({ type: String }) declare text?: string;

  static styles = css`
    :host {
      display: inline-block;

      height: var(--non-scrollable-text-comp-height, fit-content);
      width: var(--non-scrollable-text-comp-width, 200px);
      line-height: var(--non-scrollable-text-comp-height, fit-content);

      color: var(--non-scrollable-text-color, black);

      text-justify: var(--non-scrollable-text-justify, center);
      text-align: var(--non-scrollable-text-align, start);

      user-select: var(--non-scrollable-text-user-select, none);

      text-shadow: var(--non-scrollable-text-shadow, none);
      font-size: var(--non-scrollable-text-font-size, 16px);
      font-weight: var(--non-scrollable-text-font-weight, normal);
      font-family: var(
        --non-scrollable-text-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );

      overflow: hidden;
      text-overflow: var(--non-scrollable-text-overflow, ellipsis);
      white-space: nowrap;
    }
  `;

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

    update('compHeight', '--non-scrollable-text-comp-height', 'fit-content');
    update('compWidth', '--non-scrollable-text-comp-width', '200px');
    update('textColor', '--non-scrollable-text-color', 'black');
    update('textJustify', '--non-scrollable-text-justify', 'center');
    update('textAlign', '--non-scrollable-text-align', 'start');
    update('textShadow', '--non-scrollable-text-shadow', 'none');
    update('textFontSize', '--non-scrollable-text-font-size', '16px');
    update('textFontWeight', '--non-scrollable-text-font-weight', 'normal');
    update(
      'textFontFamily',
      '--non-scrollable-text-font-family',
      "'Helvetica', 'Arial', sans-serif"
    );
    update('textOverflow', '--non-scrollable-text-overflow', 'ellipsis');
    update('userSelect', '--non-scrollable-text-user-select', 'none');
  }

  render() {
    return html`${this.text}`;
  }
}
