import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('non-extendable-content')
export class NonExtendableContent extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare contHeight?: string;
  @property({ type: String }) declare contWidth?: string;
  @property({ type: String }) declare contJustifyC?: string;
  @property({ type: String }) declare contAlignI?: string;
  @property({ type: String }) declare contOverflowX?: string;
  @property({ type: String }) declare contOverflowY?: string;
  @property({ type: String }) declare contBorder?: string;
  @property({ type: String }) declare contBorderRadius?: string;
  @property({ type: String }) declare contColor?: string;
  @property({ type: String }) declare contShadow?: string;
  @property({ type: String }) declare contPadding?: string;

  @property({ type: String }) declare contHoverBorder?: string;
  @property({ type: String }) declare contHoverColor?: string;

  @property({ type: String }) declare contActiveBorder?: string;
  @property({ type: String }) declare contActiveColor?: string;

  @property({ type: String }) declare contentHeight?: string;
  @property({ type: String }) declare contentWidth?: string;
  @property({ type: String }) declare contentMaxHeight?: string;
  @property({ type: String }) declare contentMaxWidth?: string;
  @property({ type: String }) declare contentJustifyC?: string;
  @property({ type: String }) declare contentAlignI?: string;
  @property({ type: String }) declare contentOverflowX?: string;
  @property({ type: String }) declare contentOverflowY?: string;

  @property({ type: Boolean }) declare active?: boolean;
  @property({ type: Boolean }) declare hover?: boolean;

  @property({ type: Function }) declare handleMouseEnter: () => void;
  @property({ type: Function }) declare handleMouseLeave: () => void;

  static styles = css`
    :host {
      display: block;
      height: var(--non-extendable-content-comp-height, 39px);
      width: var(--non-extendable-content-comp-width, 500px);
      max-height: var(--non-extendable-content-comp-height, 39px);
      max-width: var(--non-extendable-content-comp-width, 500px);
    }

    #container {
      display: flex;
      flex-direction: column;
      justify-content: var(--non-extendable-content-justify-content, center);
      align-items: var(--non-extendable-content-align-items, center);

      height: var(--non-extendable-content-cont-height, 100%);
      width: var(--non-extendable-content-cont-width, 100%);

      overflow-x: var(--non-extendable-content-cont-overflow-x, hidden);
      overflow-y: var(--non-extendable-content-cont-overflow-y, hidden);

      border: var(--non-extendable-content-cont-border, 2px #fafafa solid);
      border-radius: var(--non-extendable-content-cont-border-radius, 8px);
      background-color: var(--non-extendable-content-cont-bg-color, #f5f5f5);
      box-shadow: var(
        --non-extendable-content-cont-shadow,
        0px 2px 5px #d0d0d0
      );

      box-sizing: border-box;
      padding: var(--non-extendable-content-cont-padding, 5px);
      gap: var(--non-extendable-content-top-bottom-gap, 5px);
    }

    #container:hover,
    #container.hover {
      border: var(
        --non-extendable-content-cont-hover-border,
        2px #6a7ea5 dashed
      );
      background-color: var(--non-extendable-content-hover-bg-color, #f5f5f5);
    }

    #container.active {
      border: var(--non-extendable-content-active-border, 2px #6a7ea5 solid);
      background-color: var(--non-extendable-content-active-bg-color, #add8e6);
    }

    #content {
      display: flex;

      justify-content: var(
        --non-extendable-content-content-justify-content,
        space-between
      );
      align-items: var(--non-extendable-content-content-align-items, center);

      height: var(--non-extendable-content-content-height, 100%);
      width: var(--non-extendable-content-content-width, calc(100% - 8px));
      max-height: var(--non-extendable-content-content-max-height, 100%);
      max-width: var(--non-extendable-content-content-max-width, 100%);

      overflow-x: var(--non-extendable-content-content-overflow-x, hidden);
      overflow-y: var(--non-extendable-content-content-overflow-y, hidden);
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

    update('compHeight', '--non-extendable-content-comp-height', '39px');
    update('compWidth', '--non-extendable-content-comp-width', '500px');

    update('contHeight', '--non-extendable-content-cont-height', '100%');
    update('contWidth', '--non-extendable-content-cont-width', '100%');

    update(
      'contJustifyC',
      '--non-extendable-content-cont-justify-content',
      'center'
    );
    update('contAlignI', '--non-extendable-content-cont-align-items', 'center');
    update(
      'contOverflowX',
      '--non-extendable-content-cont-overflow-x',
      'hidden'
    );
    update(
      'contOverflowY',
      '--non-extendable-content-cont-overflow-y',
      'hidden'
    );
    update(
      'contBorder',
      '--non-extendable-content-cont-border',
      '2px #fafafa solid'
    );
    update(
      'contBorderRadius',
      '--non-extendable-content-cont-border-radius',
      '8px'
    );
    update('contColor', '--non-extendable-content-cont-bg-color', '#f5f5f5');
    update(
      'contShadow',
      '--non-extendable-content-cont-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update('contPadding', '--non-extendable-content-cont-padding', '5px');

    update(
      'contHoverBorder',
      '--non-extendable-content-cont-hover-border',
      '2px #6a7ea5 dashed'
    );
    update(
      'contHoverColor',
      '--non-extendable-content-hover-bg-color',
      '#f5f5f5'
    );

    update(
      'contActiveBorder',
      '--non-extendable-content-active-border',
      '2px #6a7ea5 solid'
    );
    update(
      'contActiveColor',
      '--non-extendable-content-active-bg-color',
      '#add8e6'
    );

    update('contentHeight', '--non-extendable-content-content-height', '100%');
    update(
      'contentWidth',
      '--non-extendable-content-content-width',
      'calc(100% - 8px)'
    );
    update(
      'contentMaxHeight',
      '--non-extendable-content-content-max-height',
      '100%'
    );
    update(
      'contentMaxWidth',
      '--non-extendable-content-content-max-width',
      '100%'
    );
    update(
      'contentJustifyC',
      '--non-extendable-content-content-justify-content',
      'space-between'
    );
    update(
      'contentAlignI',
      '--non-extendable-content-content-align-items',
      'center'
    );
    update(
      'contentOverflowX',
      '--non-extendable-content-content-overflow-x',
      'hidden'
    );
    update(
      'contentOverflowY',
      '--non-extendable-content-content-overflow-y',
      'hidden'
    );
  }

  render() {
    const active = this.active ? 'active' : '';
    const hover = this.hover ? 'hover' : '';

    return html`<div
      id="container"
      part="container"
      class="${active} ${hover}"
      @mouseenter=${this.handleMouseEnter}
      @mouseleave=${this.handleMouseLeave}
    >
      <slot id="content" part="content"></slot>
    </div> `;
  }
}
