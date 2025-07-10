import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('stat-entry')
export class StatEntry extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare justifyContent?: string;
  @property({ type: String }) declare alignItems?: string;

  @property({ type: String }) declare valNameGap?: string;
  @property({ type: String }) declare statName?: string;
  @property({ type: String }) declare statValue?: string;

  @property({ type: String }) declare nameHeight?: string;
  @property({ type: String }) declare nameWidth?: string;
  @property({ type: String }) declare nameAlign?: string;
  @property({ type: String }) declare nameOverflowX?: string;

  @property({ type: String }) declare addColon?: boolean;

  @property({ type: String }) declare valueHeight?: string;
  @property({ type: String }) declare valueWidth?: string;
  @property({ type: String }) declare valueAlign?: string;
  @property({ type: String }) declare valueOverflowX?: string;

  @property({ type: String }) declare lineHeight?: string;
  @property({ type: String }) declare textFontSize?: string;
  @property({ type: String }) declare textFontWeight?: string;
  @property({ type: String }) declare textFontFamily?: string;
  @property({ type: String }) declare textColor?: string;
  @property({ type: String }) declare textShadow?: string;
  @property({ type: String }) declare textTransform?: string;

  static styles = css`
    :host {
      display: flex;
      justify-content: var(--stat-entry-justify-content, center);
      align-items: var(--stat-entry-align-items, center);
      height: var(--stat-entry-comp-height, fit-content);
      width: var(--stat-entry-comp-width, fit-content);
      max-height: var(--stat-entry-comp-height, fit-content);
      max-width: var(--stat-entry-comp-width, fit-content);
      gap: var(--stat-entry-name-value-gap, 15px);
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;

      line-height: var(--stat-entry-line-height, 18px);
      font-size: var(--stat-entry-font-size, 17px);
      font-weight: var(--stat-entry-font-weight, normal);
      font-family: var(--stat-entry-font-family, 'FiraMono', sans-serif);
      text-shadow: var(--stat-entry-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--stat-entry-color, black);
      text-transform: var(--stat-entry-text-transform, none);
    }

    #name {
      height: var(--stat-entry-name-height, fit-content);
      width: var(--stat-entry-name-width, fit-content);
      max-height: var(--stat-entry-name-height, fit-content);
      max-width: var(--stat-entry-name-width, fit-content);
      text-align: var(--stat-entry-name-align, center);
      overflow-x: var(--stat-entry-name-overflow-x, hidden);
    }

    #value {
      height: var(--stat-entry-value-height, fit-content);
      width: var(--stat-entry-value-width, fit-content);
      max-height: var(--stat-entry-value-height, fit-content);
      max-width: var(--stat-entry-value-width, fit-content);
      text-align: var(--stat-entry-value-align, center);
      overflow-x: var(--stat-entry-value-overflow-x, auto);
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

    update('compHeight', '--stat-entry-comp-height', 'fit-content');
    update('compWidth', '--stat-entry-comp-width', 'fit-content');

    update('justifyContent', '--stat-entry-justify-content', 'center');
    update('alignItems', '--stat-entry-align-items', 'center');
    update('valNameGap', '--stat-entry-name-value-gap', '15px');

    update('statName', '--stat-entry-stat-name', '');
    update('statValue', '--stat-entry-stat-value', '-');

    update('nameHeight', '--stat-entry-name-height', 'fit-content');
    update('nameWidth', '--stat-entry-name-width', 'fit-content');
    update('nameAlign', '--stat-entry-name-align', 'center');
    update('nameOverflowX', '--stat-entry-name-overflow-x', 'hidden');

    update('valueHeight', '--stat-entry-value-height', 'fit-content');
    update('valueWidth', '--stat-entry-value-width', 'fit-content');
    update('valueAlign', '--stat-entry-value-align', 'center');
    update('valueOverflowX', '--stat-entry-value-overflow-x', 'auto');

    update('lineHeight', '--stat-entry-line-height', '18px');
    update('textFontSize', '--stat-entry-font-size', '17px');
    update('textFontWeight', '--stat-entry-font-weight', 'normal');
    update(
      'textFontFamily',
      '--stat-entry-font-family',
      "'FiraMono', sans-serif"
    );
    update('textColor', '--stat-entry-color', 'black');
    update('textShadow', '--stat-entry-text-shadow', '0px 2px 5px #d0d0d0');
    update('textTransform', '--stat-entry-text-transform', 'none');
  }

  render() {
    return html`<span id="name" part="name"
        >${(this.statName ?? '') + (this.addColon ? ' :' : '')}</span
      ><span id="value" part="value"
        >${this.statValue && this.statValue != '' ? this.statValue : '–'}</span
      >`;
  }
}
