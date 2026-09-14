import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type StyleProperty =
  | 'compHeight'
  | 'compWidth'
  | 'cursor'
  | 'overflowY'
  | 'userSelect'
  | 'textColor'
  | 'textJustify'
  | 'textAlign'
  | 'textShadow'
  | 'textFontSize'
  | 'textFontWeight'
  | 'textFontFamily'
  | 'textFontStyle'
  | 'placeholderColor'
  | 'placeholderFontFamily'
  | 'placeholderFontWeight'
  | 'placeholderFontStyle';

@customElement('multiline-text')
export class MultilineText extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare overflowY?: string;

  @property({ type: String }) declare textColor?: string;
  @property({ type: String }) declare textJustify?: string;
  @property({ type: String }) declare textAlign?: string;
  @property({ type: String }) declare textShadow?: string;
  @property({ type: String }) declare textFontSize?: string;
  @property({ type: String }) declare textFontWeight?: string;
  @property({ type: String }) declare textFontFamily?: string;
  @property({ type: String }) declare textFontStyle?: string;

  @property({ type: String }) declare placeholderColor?: string;
  @property({ type: String }) declare placeholderFontFamily?: string;
  @property({ type: String }) declare placeholderFontWeight?: string;
  @property({ type: String }) declare placeholderFontStyle?: string;

  @property({ type: String }) declare userSelect?: string;
  @property({ type: String }) declare cursor?: string;

  @property({ type: Function }) declare handleClick?: () => void;

  @property({ type: String }) declare text?: string;
  @property({ type: String }) declare placeholder?: string;

  static styles = css`
    :host {
      display: block;

      height: var(--multiline-text-comp-height, 300px);
      width: var(--multiline-text-comp-width, 200px);

      cursor: var(--multiline-text-cursor, default);
    }

    span {
      display: block;

      background-color: transparent;

      height: 100%;
      width: 100%;

      color: var(--multiline-text-color, black);

      text-justify: var(--multiline-text-justify, center);
      text-align: var(--multiline-text-align, start);

      user-select: var(--multiline-text-user-select, none);

      text-shadow: var(--multiline-text-shadow, none);
      font-size: var(--multiline-text-font-size, 16px);
      font-weight: var(--multiline-text-font-weight, normal);
      font-style: var(--multiline-text-font-style, normal);
      font-family: var(
        --multiline-text-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );

      overflow-x: hidden;
      overflow-y: var(--multiline-text-overflow-y, auto);
      white-space: normal;
      overflow-wrap: anywhere;
    }

    .placeholder {
      color: var(--multiline-text-placeholder-color, gray);

      font-family: var(
        --multiline-text-placeholder-font-family,
        'FiraMono',
        monospace
      );

      font-weight: var(--multiline-text-placeholder-font-weight, normal);

      font-style: var(--multiline-text-placeholder-font-style, italic);
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

    update('compHeight', '--multiline-text-comp-height', '300px');
    update('compWidth', '--multiline-text-comp-width', '200px');
    update('cursor', '--multiline-text-cursor', 'default');
    update('overflowY', '--multiline-text-overflow-y', 'auto');

    update('textColor', '--multiline-text-color', 'black');
    update('textJustify', '--multiline-text-justify', 'center');
    update('textAlign', '--multiline-text-align', 'start');
    update('textShadow', '--multiline-text-shadow', 'none');
    update('textFontSize', '--multiline-text-font-size', '16px');
    update('textFontWeight', '--multiline-text-font-weight', 'normal');
    update(
      'textFontFamily',
      '--multiline-text-font-family',
      "'Helvetica', 'Arial', sans-serif"
    );
    update('textFontStyle', '--multiline-text-font-style', 'normal');

    update('placeholderColor', '--multiline-text-placeholder-color', 'gray');
    update(
      'placeholderFontFamily',
      '--multiline-text-placeholder-font-family',
      "'FiraMono', monospace"
    );
    update(
      'placeholderFontWeight',
      '--multiline-text-placeholder-font-weight',
      'normal'
    );
    update(
      'placeholderFontStyle',
      '--multiline-text-placeholder-font-style',
      'italic'
    );

    update('userSelect', '--multiline-text-user-select', 'none');
  }

  render() {
    const placeholderClass: string = this.text ? '' : 'placeholder';

    return html`<span class=${placeholderClass} @click=${this.handleClick}
      >${this.text || this.placeholder}</span
    >`;
  }
}
