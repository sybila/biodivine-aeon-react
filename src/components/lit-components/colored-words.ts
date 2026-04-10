import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type StyleProperty =
  | 'contJustifyContent'
  | 'contMinWidth'
  | 'contMaxWidth'
  | 'contMinHeight'
  | 'contMaxHeight'
  | 'contMarginTop'
  | 'contMarginLeft'
  | 'contMarginRight'
  | 'contMarginBottom'
  | 'contOverflowY'
  | 'wordGap'
  | 'fontSize'
  | 'fontFamily'
  | 'lineHeight';

@customElement('colored-words')
export class ColoredWords extends LitElement {
  @property({ attribute: false }) declare words: {
    text: string;
    color: string;
    weight: string;
  }[];
  @property({ type: String }) declare separator?: string;

  @property({ type: String }) declare contJustifyContent?: string;
  @property({ type: String }) declare contMinWidth?: string;
  @property({ type: String }) declare contMaxWidth?: string;
  @property({ type: String }) declare contMinHeight?: string;
  @property({ type: String }) declare contMaxHeight?: string;
  @property({ type: String }) declare contMarginTop?: string;
  @property({ type: String }) declare contMarginLeft?: string;
  @property({ type: String }) declare contMarginRight?: string;
  @property({ type: String }) declare contMarginBottom?: string;
  @property({ type: String }) declare contOverflowY?: string;

  @property({ type: String }) declare fontSize?: string;
  @property({ type: String }) declare fontFamily?: string;
  @property({ type: String }) declare lineHeight?: string;
  @property({ type: String }) declare wordGap?: string;

  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: var(--colored-words-cont-justify-content, center);
      min-width: var(--colored-words-cont-min-width, 200px);
      max-width: var(--colored-words-cont-max-width, 300px);
      min-height: var(--colored-words-cont-min-height, 35px);
      max-height: var(--colored-words-cont-max-height, 400px);
      margin-top: var(--colored-words-cont-margin-top, 10px);
      margin-left: var(--colored-words-cont-margin-left, 10px);
      margin-right: var(--colored-words-cont-margin-right, 10px);
      margin-bottom: var(--colored-words-cont-margin-bottom, 10px);
      overflow-x: hidden;
      overflow-y: var(--colored-words-cont-overflow-y, auto);
      gap: var(--colored-words-word-gap, 0.5rem);
      font-size: var(--colored-words-font-size, 21px);
      font-family: var(
        --colored-words-font-family,
        "'Arial', sans-serif"
      );
      line-height: var(--colored-words-line-height, 22px);
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

  updated(changed: Map<string, StyleProperty>): void {
    const update = (prop: StyleProperty, cssVar: string, fallback: string) =>
      changed.has(prop) && this.updateStyleVariable(prop, cssVar, fallback);

    update(
      'contJustifyContent',
      '--colored-words-cont-justify-content',
      'center'
    );
    update('contMinWidth', '--colored-words-cont-min-width', '200px');
    update('contMaxWidth', '--colored-words-cont-max-width', '300px');
    update('contMinHeight', '--colored-words-cont-min-height', '35px');
    update('contMaxHeight', '--colored-words-cont-max-height', '400px');
    update('contMarginTop', '--colored-words-cont-margin-top', '10px');
    update('contMarginLeft', '--colored-words-cont-margin-left', '10px');
    update('contMarginRight', '--colored-words-cont-margin-right', '10px');
    update('contMarginBottom', '--colored-words-cont-margin-bottom', '10px');
    update('contOverflowY', '--colored-words-cont-overflow-y', 'auto');
    update('wordGap', '--colored-words-word-gap', '0.5rem');
    update('fontSize', '--colored-words-font-size', '21px');
    update(
      'fontFamily',
      '--colored-words-font-family',
      "'Arial', sans-serif"
    );
    update('lineHeight', '--colored-words-line-height', '22px');
  }

  render() {
    return html` ${this.words.map(
      (word) =>
        html`<span style="color: ${word.color}; font-weight: ${word.weight};"
            >${word.text}</span
          >
          ${this.separator ? html`<span>${this.separator}</span>` : ''}`
    )}`;
  }
}
