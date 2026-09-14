import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type StyleProperty =
  | 'contWidth'
  | 'contBorder'
  | 'contBorderRadius'
  | 'contColor'
  | 'contShadow'
  | 'contPadding'
  | 'contHoverBorder'
  | 'contHoverColor'
  | 'contActiveBorder'
  | 'contActiveColor'
  | 'topBottomGap'
  | 'topHeight'
  | 'topWidth'
  | 'topContentHeight'
  | 'topContentWidth'
  | 'topContentJustifyC'
  | 'topContentAlignI'
  | 'topContentOverflowX'
  | 'topContentOverflowY'
  | 'extendContentHeight'
  | 'extendContentWidth'
  | 'extendContentJustifyC'
  | 'extendContentAlignI'
  | 'extendContentOverflowX'
  | 'extendContentOverflowY'
  | 'buttonHeight'
  | 'buttonWidth'
  | 'buttonBorderRadius'
  | 'buttonColor'
  | 'buttonHoverColor'
  | 'buttonIconSrc'
  | 'buttonIconHeight'
  | 'buttonIconWidth';

@customElement('extendable-content')
export class ExtendableContent extends LitElement {
  @property({ type: String }) declare contWidth?: string;
  @property({ type: String }) declare contBorder?: string;
  @property({ type: String }) declare contBorderRadius?: string;
  @property({ type: String }) declare contColor?: string;
  @property({ type: String }) declare contShadow?: string;
  @property({ type: String }) declare contPadding?: string;

  @property({ type: String }) declare contHoverBorder?: string;
  @property({ type: String }) declare contHoverColor?: string;

  @property({ type: String }) declare contActiveBorder?: string;
  @property({ type: String }) declare contActiveColor?: string;

  @property({ type: String }) declare topBottomGap?: string;

  @property({ type: String }) declare topHeight?: string;
  @property({ type: String }) declare topWidth?: string;

  @property({ type: String }) declare topContentHeight?: string;
  @property({ type: String }) declare topContentWidth?: string;
  @property({ type: String }) declare topContentJustifyC?: string;
  @property({ type: String }) declare topContentAlignI?: string;
  @property({ type: String }) declare topContentOverflowX?: string;
  @property({ type: String }) declare topContentOverflowY?: string;

  @property({ type: String }) declare extendContentHeight?: string;
  @property({ type: String }) declare extendContentWidth?: string;
  @property({ type: String }) declare extendContentJustifyC?: string;
  @property({ type: String }) declare extendContentAlignI?: string;
  @property({ type: String }) declare extendContentOverflowX?: string;
  @property({ type: String }) declare extendContentOverflowY?: string;

  @property({ type: String }) declare buttonHeight?: string;
  @property({ type: String }) declare buttonWidth?: string;
  @property({ type: String }) declare buttonBorderRadius?: string;
  @property({ type: String }) declare buttonColor?: string;

  @property({ type: String }) declare buttonHoverColor?: string;

  @property({ type: String }) declare buttonIconSrc?: string;
  @property({ type: String }) declare buttonIconHeight?: string;
  @property({ type: String }) declare buttonIconWidth?: string;

  @property({ type: Boolean }) declare extended?: boolean;
  @property({ type: Boolean }) declare active?: boolean;
  @property({ type: Boolean }) declare hover?: boolean;

  @property({ type: Function }) declare handleMouseEnter: () => void;
  @property({ type: Function }) declare handleMouseLeave: () => void;

  @property({ type: Function }) declare exposeSetExtend?: (
    extendFunctionSetter: (extend: boolean) => void
  ) => void;

  static styles = css`
    :host {
      display: inline-block;
      height: fit-content;
      width: var(--extendable-content-cont-width, 500px);
    }

    #container {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;

      height: fit-content;
      width: var(--extendable-content-cont-width, 500px);

      overflow-x: visible;
      overflow-y: visible;

      border: var(--extendable-content-cont-border, 2px #fafafa solid);
      border-radius: var(--extendable-content-cont-border-radius, 8px);
      background-color: var(--extendable-content-cont-bg-color, #f5f5f5);
      box-shadow: var(--extendable-content-cont-shadow, 0px 2px 5px #d0d0d0);

      box-sizing: border-box;
      padding: var(--extendable-content-cont-padding, 5px);
      gap: var(--extendable-content-top-bottom-gap, 5px);
    }

    #container:hover,
    #container.hover {
      border: var(--extendable-content-cont-hover-border, 2px #6a7ea5 dashed);
      background-color: var(--extendable-content-hover-bg-color, #f5f5f5);
    }

    #container.active {
      border: var(--extendable-content-active-border, 2px #6a7ea5 solid);
      background-color: var(--extendable-content-active-bg-color, #add8e6);
    }

    #top-container {
      display: flex;

      justify-content: space-between;
      align-items: center;

      height: var(--extendable-content-top-height, 25px);
      width: var(--extendable-content-top-width, 100%);

      overflow-x: visible;
      overflow-y: visible;
    }

    #top-content {
      display: flex;

      justify-content: var(
        --extendable-content-top-content-justify-content,
        space-between
      );
      align-items: var(--extendable-content-top-content-align-items, center);

      height: var(--extendable-content-top-content-height, 100%);
      width: var(--extendable-content-top-content-width, calc(100% - 30px));

      overflow-x: var(--extendable-content-top-content-overflow-x, hidden);
      overflow-y: var(--extendable-content-top-content-overflow-y, hidden);
    }

    #extended-content {
      display: flex;
      flex-direction: column;

      justify-content: var(
        --extendable-content-extended-content-justify-content,
        start
      );
      align-items: var(
        --extendable-content-extended-content-align-items,
        center
      );

      height: var(--extendable-content-extended-content-height, fit-content);
      width: var(--extendable-content-extended-content-width, 100%);

      overflow-x: var(--extendable-content-extended-content-overflow-x, hidden);
      overflow-y: var(--extendable-content-extended-content-overflow-y, hidden);
    }

    #extend-button {
      display: flex;

      justify-content: center;
      align-items: center;

      height: var(--extendable-content-button-height, 24px);
      width: var(--extendable-content-button-width, 24px);

      border-radius: var(--extendable-content-button-border-radius, 24px);
      background-color: var(--extendable-content-button-bg-color, #eceff1);

      border: none;
      transition: background-color 0.3s;
      cursor: pointer;

      padding: 0;
      overflow: hidden;
    }

    #extend-button:hover {
      background-color: var(
        --extendable-content-button-hover-bg-color,
        #b0bec5
      );
    }

    #extend-icon {
      height: var(--extendable-content-button-icon-height, 12px);
      width: var(--extendable-content-button-icon-width, 12px);
      max-height: var(--extendable-content-button-icon-height, 12px);
      max-width: var(--extendable-content-button-icon-width, 12px);
    }

    #extend-icon.extended {
      transform: rotate(180deg);
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

    update('contWidth', '--extendable-content-cont-width', '500px');
    update(
      'contBorder',
      '--extendable-content-cont-border',
      '2px #fafafa solid'
    );
    update(
      'contBorderRadius',
      '--extendable-content-cont-border-radius',
      '8px'
    );
    update('contColor', '--extendable-content-cont-bg-color', '#f5f5f5');
    update(
      'contShadow',
      '--extendable-content-cont-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update('contPadding', '--extendable-content-cont-padding', '5px');

    update(
      'contHoverBorder',
      '--extendable-content-cont-hover-border',
      '2px #6a7ea5 dashed'
    );
    update('contHoverColor', '--extendable-content-hover-bg-color', '#f5f5f5');

    update(
      'contActiveBorder',
      '--extendable-content-active-border',
      '2px #6a7ea5 solid'
    );
    update(
      'contActiveColor',
      '--extendable-content-active-bg-color',
      '#add8e6'
    );

    update('topBottomGap', '--extendable-content-top-bottom-gap', '5px');

    update('topHeight', '--extendable-content-top-height', '25px');
    update('topWidth', '--extendable-content-top-width', '100%');

    update(
      'topContentHeight',
      '--extendable-content-top-content-height',
      '100%'
    );
    update(
      'topContentWidth',
      '--extendable-content-top-content-width',
      'calc(100% - 30px)'
    );
    update(
      'topContentJustifyC',
      '--extendable-content-top-content-justify-content',
      'space-between'
    );
    update(
      'topContentAlignI',
      '--extendable-content-top-content-align-items',
      'center'
    );
    update(
      'topContentOverflowX',
      '--extendable-content-top-content-overflow-x',
      'hidden'
    );
    update(
      'topContentOverflowY',
      '--extendable-content-top-content-overflow-y',
      'hidden'
    );

    update(
      'extendContentHeight',
      '--extendable-content-extended-content-height',
      'fit-content'
    );
    update(
      'extendContentWidth',
      '--extendable-content-extended-content-width',
      '100%'
    );
    update(
      'extendContentJustifyC',
      '--extendable-content-extended-content-justify-content',
      'start'
    );
    update(
      'extendContentAlignI',
      '--extendable-content-extended-content-align-items',
      'center'
    );
    update(
      'extendContentOverflowX',
      '--extendable-content-extended-content-overflow-x',
      'hidden'
    );
    update(
      'extendContentOverflowY',
      '--extendable-content-extended-content-overflow-y',
      'hidden'
    );

    update('buttonHeight', '--extendable-content-button-height', '24px');
    update('buttonWidth', '--extendable-content-button-width', '24px');
    update(
      'buttonBorderRadius',
      '--extendable-content-button-border-radius',
      '24px'
    );
    update('buttonColor', '--extendable-content-button-bg-color', '#eceff1');

    update(
      'buttonHoverColor',
      '--extendable-content-button-hover-bg-color',
      '#b0bec5'
    );

    update(
      'buttonIconHeight',
      '--extendable-content-button-icon-height',
      '12px'
    );
    update('buttonIconWidth', '--extendable-content-button-icon-width', '12px');
  }

  private setExtendFunction(extend: boolean) {
    this.extended = extend;
  }

  private toggleExtend = () => {
    this.extended = !this.extended;
  };

  static arrowIcon =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgLTQuNSAyMCAyMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICANCiAgICA8dGl0bGU+YXJyb3dfZG93biBbIzMzOF08L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzPg0KDQo8L2RlZnM+DQogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIGlkPSJEcmliYmJsZS1MaWdodC1QcmV2aWV3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIwLjAwMDAwMCwgLTY2ODQuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCI+DQogICAgICAgICAgICA8ZyBpZD0iaWNvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU2LjAwMDAwMCwgMTYwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNjQuMjkyMzA4LDY1MjQuMzY1ODMgTDE2NC4yOTIzMDgsNjUyNC4zNjU4MyBDMTYzLjkwMjU2NCw2NTI0Ljc3MDcxIDE2My45MDI1NjQsNjUyNS40MjYxOSAxNjQuMjkyMzA4LDY1MjUuODMwMDQgTDE3Mi41NTU4NzMsNjUzNC4zOTI2NyBDMTczLjMzNjM2LDY1MzUuMjAyNDQgMTc0LjYwMjUyOCw2NTM1LjIwMjQ0IDE3NS4zODMwMTQsNjUzNC4zOTI2NyBMMTgzLjcwNzU0LDY1MjUuNzY3OTEgQzE4NC4wOTMyODYsNjUyNS4zNjcxNiAxODQuMDk4MjgzLDY1MjQuNzE5OTcgMTgzLjcxNzUzMyw2NTI0LjMxNDA1IEMxODMuMzI4Nzg5LDY1MjMuODk5ODUgMTgyLjY4ODIxLDY1MjMuODk0NjcgMTgyLjI5MzQ3LDY1MjQuMzAyNjYgTDE3NC42NzY0NzksNjUzMi4xOTYzNiBDMTc0LjI4NTczNiw2NTMyLjYwMTI0IDE3My42NTMxNTIsNjUzMi42MDEyNCAxNzMuMjYyNDA5LDY1MzIuMTk2MzYgTDE2NS43MDUzNzksNjUyNC4zNjU4MyBDMTY1LjMxNTYzNSw2NTIzLjk2MDk0IDE2NC42ODMwNTEsNjUyMy45NjA5NCAxNjQuMjkyMzA4LDY1MjQuMzY1ODMiIGlkPSJhcnJvd19kb3duLVsjMzM4XSI+DQoNCjwvcGF0aD4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg==';

  render() {
    if (this.exposeSetExtend) {
      this.exposeSetExtend(this.setExtendFunction.bind(this));
    }

    const extended = this.extended ? 'extended' : '';
    const active = this.active ? 'active' : '';
    const hover = this.hover ? 'hover' : '';

    return html`<div
      id="container"
      part="container"
      class="${active} ${hover}"
      @mouseenter=${this.handleMouseEnter}
      @mouseleave=${this.handleMouseLeave}
    >
      <div id="top-container" part="top-container">
        <button
          id="extend-button"
          part="extend-button"
          @click=${this.toggleExtend}
        >
          <img
            id="extend-icon"
            class=${extended}
            src="${this.buttonIconSrc ?? ExtendableContent.arrowIcon}"
          />
        </button>

        <slot id="top-content" name="top-content" part="top-content"></slot>
      </div>

      ${this.extended
        ? html` <slot
            id="extended-content"
            name="extended-content"
            part="extended-content"
          ></slot>`
        : ''}
    </div> `;
  }
}
