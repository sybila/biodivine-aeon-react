import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type StyleProperty =
  | 'contMinHeight'
  | 'contMinWidth'
  | 'contMaxHeight'
  | 'contMaxWidth'
  | 'contStatsGap'
  | 'contOverflowY'
  | 'contOverflowX'
  | 'statHeight'
  | 'statWidth'
  | 'statNameValueGap'
  | 'statPadX'
  | 'statPadY'
  | 'statBgColor'
  | 'statBorderRadius'
  | 'nameContHeight'
  | 'nameFontSize'
  | 'nameLineHeight'
  | 'nameFontWeight'
  | 'nameFontFamily'
  | 'nameOverflowX'
  | 'valueContHeight'
  | 'valueFontSize'
  | 'valueLineHeight'
  | 'valueFontWeight'
  | 'valueFontFamily'
  | 'valueOverflowX';

@customElement('stat-table')
export class StatTable extends LitElement {
  @property({ attribute: false }) declare stats: {
    name: string;
    value: string;
    nameWidth: string;
    valueWidth: string;
  }[];
  @property({ type: String }) declare separator?: string;

  @property({ type: String }) declare contMinHeight?: string;
  @property({ type: String }) declare contMinWidth?: string;
  @property({ type: String }) declare contMaxHeight?: string;
  @property({ type: String }) declare contMaxWidth?: string;
  @property({ type: String }) declare contStatsGap?: string;
  @property({ type: String }) declare contOverflowY?: string;
  @property({ type: String }) declare contOverflowX?: string;

  @property({ type: String }) declare statHeight?: string;
  @property({ type: String }) declare statWidth?: string;
  @property({ type: String }) declare statNameValueGap?: string;
  @property({ type: String }) declare statPadX?: string;
  @property({ type: String }) declare statPadY?: string;
  @property({ type: String }) declare statBgColor?: string;
  @property({ type: String }) declare statBorderRadius?: string;

  @property({ type: String }) declare nameContHeight?: string;
  @property({ type: String }) declare nameFontSize?: string;
  @property({ type: String }) declare nameLineHeight?: string;
  @property({ type: String }) declare nameFontWeight?: string;
  @property({ type: String }) declare nameFontFamily?: string;
  @property({ type: String }) declare nameOverflowX?: string;

  @property({ type: String }) declare valueContHeight?: string;
  @property({ type: String }) declare valueFontSize?: string;
  @property({ type: String }) declare valueLineHeight?: string;
  @property({ type: String }) declare valueFontWeight?: string;
  @property({ type: String }) declare valueFontFamily?: string;
  @property({ type: String }) declare valueOverflowX?: string;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      min-height: var(--stat-table-cont-min-height, 100px);
      min-width: var(--stat-table-cont-min-width, 200px);
      max-height: var(--stat-table-cont-max-height, 400px);
      max-width: var(--stat-table-cont-max-width, 200px);
      gap: var(--stat-table-cont-stats-gap, 2px);
      overflow-y: var(--stat-table-cont-overflow-y, auto);
      overflow-x: var(--stat-table-cont-overflow-x, hidden);
    }

    div {
      display: flex;
      height: var(--stat-table-stat-height, fit-content);
      width: var(--stat-table-stat-width, 100%);
      gap: var(--stat-table-stat-name-value-gap, 1px);
      justify-content: var(--stat-table-stat-justify, space-between);
      align-items: var(--stat-table-stat-align, center);
      padding: var(--stat-table-stat-pad-y, 5px)
        var(--stat-table-stat-pad-x, 10px);
      box-sizing: border-box;
      overflow-y: var(--stat-table-stat-overflow-y, hidden);
      overflow-x: var(--stat-table-stat-overflow-x, hidden);
      background-color: var(--stat-table-stat-bg-color, #cfd8dc);
      border-radius: var(--stat-table-stat-border-radius, 3px);
      flex-shrink: 0;
    }

    #name {
      height: var(--stat-table-name-cont-height, fit-content);
      wrap: nowrap;
      text-align: left;
      font-size: var(--stat-table-name-font-size, 17px);
      line-height: var(--stat-table-name-line-height, 20px);
      font-weight: var(--stat-table-name-font-weight, normal);
      font-family: var(--stat-table-name-font-family, 'FiraMono', sans-serif);
      overflow-x: var(--stat-table-name-overflow-x, auto);
      overflow-y: hidden;
      user-select: none;
    }

    #value {
      height: var(--stat-table-value-cont-height, fit-content);
      wrap: nowrap;
      text-align: right;
      font-size: var(--stat-table-value-font-size, 17px);
      line-height: var(--stat-table-value-line-height, 20px);
      font-weight: var(--stat-table-value-font-weight, normal);
      font-family: var(--stat-table-value-font-family, 'FiraMono', sans-serif);
      overflow-x: var(--stat-table-value-overflow-x, auto);
      overflow-y: hidden;
      user-select: none;
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

    update('contMinHeight', '--stat-table-cont-min-height', '100px');
    update('contMinWidth', '--stat-table-cont-min-width', '200px');
    update('contMaxHeight', '--stat-table-cont-max-height', '400px');
    update('contMaxWidth', '--stat-table-cont-max-width', '200px');
    update('contStatsGap', '--stat-table-cont-stats-gap', '2px');
    update('contOverflowY', '--stat-table-cont-overflow-y', 'auto');
    update('contOverflowX', '--stat-table-cont-overflow-x', 'hidden');

    update('statHeight', '--stat-table-stat-height', 'fit-content');
    update('statWidth', '--stat-table-stat-width', '100%');
    update('statNameValueGap', '--stat-table-stat-name-value-gap', '1px');
    update('statPadX', '--stat-table-stat-pad-x', '10px');
    update('statPadY', '--stat-table-stat-pad-y', '5px');
    update('statBgColor', '--stat-table-stat-bg-color', '#cfd8dc');
    update('statBorderRadius', '--stat-table-stat-border-radius', '3px');

    update('nameContHeight', '--stat-table-name-cont-height', 'fit-content');
    update('nameFontSize', '--stat-table-name-font-size', '17px');
    update('nameLineHeight', '--stat-table-name-line-height', '20px');
    update('nameFontWeight', '--stat-table-name-font-weight', 'normal');
    update(
      'nameFontFamily',
      '--stat-table-name-font-family',
      "'FiraMono', sans-serif"
    );
    update('nameOverflowX', '--stat-table-name-overflow-x', 'auto');

    update('valueContHeight', '--stat-table-value-cont-height', 'fit-content');
    update('valueFontSize', '--stat-table-value-font-size', '17px');
    update('valueLineHeight', '--stat-table-value-line-height', '20px');
    update('valueFontWeight', '--stat-table-value-font-weight', 'normal');
    update(
      'valueFontFamily',
      '--stat-table-value-font-family',
      "'FiraMono', sans-serif"
    );
    update('valueOverflowX', '--stat-table-value-overflow-x', 'auto');
  }

  render() {
    return html`
      ${this.stats
        ? this.stats.map(
            (stat) => html`
              <div>
                <span id="name" style="width: ${stat.nameWidth};"
                  >${stat.name}${this.separator ?? ':'}
                </span>
                <span id="value" style="width: ${stat.valueWidth}"
                  >${stat.value}</span
                >
              </div>
            `
          )
        : null}
    `;
  }
}
