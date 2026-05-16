import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type StyleProperty =
  | 'compHeight'
  | 'compBgColor'
  | 'compBorder'
  | 'compBorderRadius'
  | 'compShadow'
  | 'contentWidth'
  | 'contentJustifyContent'
  | 'contentAlignItems'
  | 'contentPadding'
  | 'contentOverflowX'
  | 'contentOverflowY'
  | 'buttonWidth'
  | 'buttonHoverColor'
  | 'iconHeight'
  | 'iconWidth'
  | 'iconVisibilityTransform';

@customElement('horizontal-hidable-content')
export class HorizontalHidableContent extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compBgColor?: string;
  @property({ type: String }) declare compBorder?: string;
  @property({ type: String }) declare compBorderRadius?: string;
  @property({ type: String }) declare compShadow?: string;

  @property({ type: String }) declare contentWidth?: string;
  @property({ type: String }) declare contentJustifyContent?: string;
  @property({ type: String }) declare contentAlignItems?: string;
  @property({ type: String }) declare contentPadding?: string;
  @property({ type: String }) declare contentOverflowX?: string;
  @property({ type: String }) declare contentOverflowY?: string;

  @property({ type: String }) declare buttonWidth?: string;
  @property({ type: String }) declare buttonHoverColor?: string;

  @property({ type: String }) declare iconHeight?: string;
  @property({ type: String }) declare iconWidth?: string;
  @property({ type: String }) declare iconSrc?: string;
  @property({ type: String }) declare iconAlt?: string;
  @property({ type: String }) declare iconVisibilityTransform?: string;

  @property({ type: Boolean }) declare buttonRight?: boolean;

  @property({ type: Boolean }) declare contentVisible?: boolean;

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;

      height: fit-content;
      width: fit-content;
      overflow: hidden;

      background-color: var(--hidable-content-comp-bg-color, #eceff1);
      border: var(--hidable-content-comp-border, none);
      border-radius: var(--hidable-content-comp-border-radius, 5px);
      box-shadow: var(--hidable-content-comp-shadow, none);
    }

    #content {
      display: flex;
      flex-direction: row;

      height: var(--hidable-content-component-height, 200px);
      width: var(--hidable-content-content-width, 200px);

      justify-content: var(--hidable-content-content-justify-content, start);
      align-items: var(--hidable-content-content-align-items, center);

      box-sizing: border-box;

      overflow-x: var(--hidable-content-content-overflow-x, hidden);
      overflow-y: var(--hidable-content-content-overflow-y, hidden);

      padding: var(--hidable-content-content-padding, 8px);
    }

    #visibility-button {
      display: flex;

      justify-content: center;
      align-items: center;

      height: var(--hidable-content-component-height, 200px);
      width: var(--hidable-content-button-width, 20px);

      background-color: transparent;

      border: none;
      transition: background-color 0.3s;
      cursor: pointer;

      padding: 0;
      overflow: hidden;
    }

    #visibility-button:hover {
      background-color: var(--hidable-content-button-hover-bg-color, #b0bec5);
    }

    #visibility-icon {
      height: var(--hidable-content-button-icon-height, 12px);
      width: var(--hidable-content-button-icon-width, 12px);
      max-height: var(--hidable-content-button-icon-height, 12px);
      max-width: var(--hidable-content-button-icon-width, 12px);
    }

    #visibility-icon.visible,
    #visibility-icon.buttonRight {
      transform: var(
        --hidable-content-icon-visibility-transform,
        rotate(180deg)
      );
    }

    #visibility-icon.visible.buttonRight {
      transform: rotate(0deg);
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

    update('compHeight', '--hidable-content-component-height', '200px');
    update('compBgColor', '--hidable-content-comp-bg-color', '#eceff1');
    update('compBorder', '--hidable-content-comp-border', 'none');
    update('compBorderRadius', '--hidable-content-comp-border-radius', '5px');
    update('compShadow', '--hidable-content-comp-shadow', 'none');

    update('contentWidth', '--hidable-content-content-width', '200px');
    update(
      'contentJustifyContent',
      '--hidable-content-content-justify-content',
      'start'
    );
    update(
      'contentAlignItems',
      '--hidable-content-content-align-items',
      'center'
    );
    update('contentPadding', '--hidable-content-content-padding', '8px');
    update(
      'contentOverflowX',
      '--hidable-content-content-overflow-x',
      'hidden'
    );
    update(
      'contentOverflowY',
      '--hidable-content-content-overflow-y',
      'hidden'
    );

    update('buttonWidth', '--hidable-content-button-width', '20px');
    update(
      'buttonHoverColor',
      '--hidable-content-button-hover-bg-color',
      '#b0bec5'
    );

    update('iconHeight', '--hidable-content-button-icon-height', '12px');
    update('iconWidth', '--hidable-content-button-icon-width', '12px');
    update(
      'iconVisibilityTransform',
      '--hidable-content-icon-visibility-transform',
      'rotate(180deg)'
    );
  }

  static arrowIcon =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDUxMi4wMDUgNTEyLjAwNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM4OC40MTgsMjQwLjkyM0wxNTMuNzUxLDYuMjU2Yy04LjM0MS04LjM0MS0yMS44MjQtOC4zNDEtMzAuMTY1LDBzLTguMzQxLDIxLjgyNCwwLDMwLjE2NUwzNDMuMTcsMjU2LjAwNQ0KCQkJTDEyMy41ODYsNDc1LjU4OWMtOC4zNDEsOC4zNDEtOC4zNDEsMjEuODI0LDAsMzAuMTY1YzQuMTYsNC4xNiw5LjYyMSw2LjI1MSwxNS4wODMsNi4yNTFjNS40NjEsMCwxMC45MjMtMi4wOTEsMTUuMDgzLTYuMjUxDQoJCQlsMjM0LjY2Ny0yMzQuNjY3QzM5Ni43NTksMjYyLjc0NywzOTYuNzU5LDI0OS4yNjQsMzg4LjQxOCwyNDAuOTIzeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg==';

  private toggleVisibility = () => {
    this.contentVisible = !this.contentVisible;
  };

  render() {
    const visibleContentClass = this.contentVisible ? 'visible' : '';
    const buttonRightClass = this.buttonRight ? 'buttonRight' : '';

    return html` ${this.contentVisible && this.buttonRight
        ? html` <slot id="content" name="content" part="content"></slot>`
        : ''}
      <button
        id="visibility-button"
        part="visibility-button"
        @click=${this.toggleVisibility}
      >
        <img
          id="visibility-icon"
          part="visibility-icon"
          class="${visibleContentClass} ${buttonRightClass}"
          src="${this.iconSrc ?? HorizontalHidableContent.arrowIcon}"
        />
      </button>
      ${this.contentVisible && !this.buttonRight
        ? html` <slot id="content" name="content" part="content"></slot>`
        : ''}`;
  }
}

export default HorizontalHidableContent;
