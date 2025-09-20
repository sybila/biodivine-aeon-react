import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('stat-entry')
export class StatEntry extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare contHeight?: string;
  @property({ type: String }) declare contWidth?: string;
  @property({ type: String }) declare contJustify?: string;
  @property({ type: String }) declare contAlign?: string;
  @property({ type: String }) declare contPadX?: string;
  @property({ type: String }) declare contBgColor?: string;
  @property({ type: String }) declare contBorderRadius?: string;

  @property({ type: String }) declare valNameGap?: string;
  @property({ type: String }) declare statName?: string;
  @property({ type: String }) declare statValue?: string;

  @property({ type: String }) declare nameHeight?: string;
  @property({ type: String }) declare nameMaxHeight?: string;
  @property({ type: String }) declare nameWidth?: string;
  @property({ type: String }) declare nameMaxWidth?: string;
  @property({ type: String }) declare nameJustify?: string;
  @property({ type: String }) declare nameOverflowX?: string;

  @property({ type: Boolean }) declare addColon?: boolean;

  @property({ type: String }) declare valueHeight?: string;
  @property({ type: String }) declare valueMaxHeight?: string;
  @property({ type: String }) declare valueWidth?: string;
  @property({ type: String }) declare valueMaxWidth?: string;
  @property({ type: String }) declare valueJustify?: string;
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
      display: inline-block;
      height: var(--stat-entry-comp-height, fit-content);
      width: var(--stat-entry-comp-width, 50px);
      max-height: var(--stat-entry-comp-height, fit-content);
      max-width: var(--stat-entry-comp-width, 50px);
    }

    div {
      display: flex;
      width: var(--stat-entry-cont-width, 100%);
      height: var(--stat-entry-cont-height, fit-content);
      justify-content: var(--stat-entry-justify-content, space-between);
      align-items: var(--stat-entry-align-items, center);
      box-sizing: border-box;
      gap: var(--stat-entry-name-value-gap, 15px);
      padding-inline: var(--stat-entry-padding-x, 5px);
      background-color: var(--stat-entry-bg-color, #cfd8dc);
      border-radius: var(--stat-entry-border-radius, 3px);
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      white-space: nowrap;
      line-height: var(--stat-entry-line-height, 20px);
      font-size: var(--stat-entry-font-size, 17px);
      font-weight: var(--stat-entry-font-weight, normal);
      font-family: var(--stat-entry-font-family, 'FiraMono', sans-serif);
      text-shadow: var(--stat-entry-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--stat-entry-color, black);
      text-transform: var(--stat-entry-text-transform, none);
      cursor: default;
    }

    #name {
      height: var(--stat-entry-name-height, auto);
      width: var(--stat-entry-name-width, auto);
      max-height: var(--stat-entry-name-max-height, fit-content);
      max-width: var(--stat-entry-name-max-width, 50%);
      justify-content: var(--stat-entry-name-justify-content, safe center);
      overflow-x: var(--stat-entry-name-overflow-x, hidden);
    }

    #value {
      height: var(--stat-entry-value-height, auto);
      width: var(--stat-entry-value-width, auto);
      max-height: var(--stat-entry-value-max-height, fit-content);
      max-width: var(--stat-entry-value-max-width, 50%);
      justify-content: var(--stat-entry-value-justify-content, safe center);
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
    update('compWidth', '--stat-entry-comp-width', '50px');

    update('valNameGap', '--stat-entry-name-value-gap', '15px');

    update('contHeight', '--stat-entry-cont-height', 'fit-content');
    update('contWidth', '--stat-entry-cont-width', '100%');
    update('contJustify', '--stat-entry-justify-content', 'space-between');
    update('contAlign', '--stat-entry-align-items', 'safe center');
    update('contPadX', '--stat-entry-padding-x', '5px');
    update('contBgColor', '--stat-entry-bg-color', '#cfd8dc');
    update('contBorderRadius', '--stat-entry-border-radius', '3px');

    update('nameHeight', '--stat-entry-name-height', 'auto');
    update('nameMaxHeight', '--stat-entry-name-max-height', 'fit-content');
    update('nameWidth', '--stat-entry-name-width', 'auto');
    update('nameMaxWidth', '--stat-entry-name-max-width', '50%');
    update('nameJustify', '--stat-entry-name-justify-content', 'safe center');
    update('nameOverflowX', '--stat-entry-name-overflow-x', 'hidden');

    update('valueHeight', '--stat-entry-value-height', 'auto');
    update('valueMaxHeight', '--stat-entry-value-max-height', 'fit-content');
    update('valueWidth', '--stat-entry-value-width', 'auto');
    update('valueMaxWidth', '--stat-entry-value-max-width', '50%');
    update('valueJustify', '--stat-entry-value-justify-content', 'safe center');
    update('valueOverflowX', '--stat-entry-value-overflow-x', 'auto');

    update('lineHeight', '--stat-entry-line-height', '20px');
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
    return html`<div>
      <span id="name" part="name"
        >${(this.statName ?? '') + (this.addColon ? ' :' : '')}</span
      ><span id="value" part="value"
        >${this.statValue && this.statValue != '' ? this.statValue : '–'}</span
      >
    </div>`;
  }
}
