import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('page-selector')
export class PageSelector extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare contHeight?: string;
  @property({ type: String }) declare contWidth?: string;
  @property({ type: String }) declare contOverflowX?: string;
  @property({ type: String }) declare contOverflowY?: string;

  @property({ type: String }) declare buttonsCenterGap?: string;

  @property({ type: String }) declare buttonHeight?: string;
  @property({ type: String }) declare buttonWidth?: string;
  @property({ type: String }) declare buttonColor?: string;
  @property({ type: String }) declare buttonHoverColor?: string;
  @property({ type: String }) declare buttonDisabledColor?: string;
  @property({ type: String }) declare buttonRadius?: string;
  @property({ type: String }) declare buttonShadow?: string;

  @property({ type: String }) declare leftButtonIconHeight?: string;
  @property({ type: String }) declare leftButtonIconWidth?: string;
  @property({ type: String }) declare leftButtonIconSrc?: string;

  @property({ type: String }) declare rightButtonIconHeight?: string;
  @property({ type: String }) declare rightButtonIconWidth?: string;
  @property({ type: String }) declare rightButtonIconSrc?: string;

  @property({ type: String }) declare centerHeight?: string;
  @property({ type: String }) declare centerMinWidth?: string;
  @property({ type: String }) declare centerMaxWidth?: string;
  @property({ type: String }) declare centerColor?: string;
  @property({ type: String }) declare centerRadius?: string;
  @property({ type: String }) declare centerShadow?: string;

  @property({ type: String }) declare centerFontSize?: string;
  @property({ type: String }) declare centerFontWeight?: string;
  @property({ type: String }) declare centerFontFamily?: string;
  @property({ type: String }) declare centerTextColor?: string;

  @property({ type: Number }) declare initialPage?: number;
  @property({ type: Boolean }) declare nextPageExists?: boolean;
  @property({ type: Function }) declare handlePageChange?: (
    page: number
  ) => void;

  @state() declare currentPage: number;

  static styles = css`
    :host {
      display: block;
      height: var(--page-selector-comp-height, 50px);
      width: var(--page-selector-comp-width, 100px);
      max-height: var(--page-selector-comp-height, 50px);
      max-width: var(--page-selector-comp-width, 100px);
    }

    #container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--page-selector-buttons-center-gap, 8px);
      height: var(--page-selector-container-height, 100%);
      width: var(--page-selector-container-width, 100%);
      position: relative;
      overflow-x: var(--page-selector-container-overflow-x, hidden);
      overflow-y: var(--page-selector-container-overflow-y, hidden);
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--page-selector-button-height, 30px);
      width: var(--page-selector-button-width, 30px);
      background-color: var(--page-selector-button-color, #eceff1);
      border: none;
      border-radius: var(--page-selector-button-radius, 4px);
      box-shadow: var(--page-selector-button-shadow, 0px 2px 5px #d0d0d0);
    }

    button:hover {
      background-color: var(--page-selector-button-hover-color, #b0bec5);
      cursor: pointer;
    }

    button.disabled {
      background-color: var(--page-selector-button-disabled-color, #b1b1b1ff);
      cursor: not-allowed;
    }

    #left-button-icon {
      height: var(--page-selector-left-button-icon-height, 70%);
      width: var(--page-selector-left-button-icon-width, 70%);
      user-select: none;
    }

    #right-button-icon {
      height: var(--page-selector-right-button-icon-height, 70%);
      width: var(--page-selector-right-button-icon-width, 70%);
      user-select: none;
    }

    #center-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--page-selector-center-height, 30px);
      min-width: var(--page-selector-center-min-width, 30px);
      max-width: var(--page-selector-center-max-width, fit-content);
      background-color: var(--page-selector-center-color, #f3f2f1);
      border-radius: var(--page-selector-center-radius, 4px);
      box-shadow: var(--page-selector-center-shadow, 0px 2px 5px #d0d0d0);
      font-size: var(--page-selector-center-font-size, 14px);
      font-weight: var(--page-selector-center-font-weight, 600);
      font-family: var(
        --page-selector-center-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      color: var(--page-selector-center-text-color, #000000);
      user-select: none;
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

    update('compHeight', '--page-selector-comp-height', '50px');
    update('compWidth', '--page-selector-comp-width', '100px');

    update('contHeight', '--page-selector-container-height', '100%');
    update('contWidth', '--page-selector-container-width', '100%');
    update('contOverflowX', '--page-selector-container-overflow-x', 'hidden');
    update('contOverflowY', '--page-selector-container-overflow-y', 'hidden');

    update('buttonsCenterGap', '--page-selector-buttons-center-gap', '8px');

    update('buttonHeight', '--page-selector-button-height', '30px');
    update('buttonWidth', '--page-selector-button-width', '30px');
    update('buttonColor', '--page-selector-button-color', '#eceff1');
    update('buttonHoverColor', '--page-selector-button-hover-color', '#b0bec5');
    update(
      'buttonDisabledColor',
      '--page-selector-button-disabled-color',
      '#b1b1b1ff'
    );
    update('buttonRadius', '--page-selector-button-radius', '4px');
    update(
      'buttonShadow',
      '--page-selector-button-shadow',
      '0px 2px 5px #d0d0d0'
    );

    update(
      'leftButtonIconHeight',
      '--page-selector-left-button-icon-height',
      '70%'
    );
    update(
      'leftButtonIconWidth',
      '--page-selector-left-button-icon-width',
      '70%'
    );

    update(
      'rightButtonIconHeight',
      '--page-selector-right-button-icon-height',
      '70%'
    );
    update(
      'rightButtonIconWidth',
      '--page-selector-right-button-icon-width',
      '70%'
    );

    update('centerHeight', '--page-selector-center-height', '30px');
    update('centerMinWidth', '--page-selector-center-min-width', '30px');
    update('centerMaxWidth', '--page-selector-center-max-width', 'fit-content');
    update('centerColor', '--page-selector-center-color', '#f3f2f1');
    update('centerRadius', '--page-selector-center-radius', '4px');
    update(
      'centerShadow',
      '--page-selector-center-shadow',
      '0px 2px 5px #d0d0d0'
    );

    update('centerFontSize', '--page-selector-center-font-size', '14px');
    update('centerFontWeight', '--page-selector-center-font-weight', '600');
    update(
      'centerFontFamily',
      '--page-selector-center-font-family',
      "'Helvetica', 'Arial', sans-serif"
    );
    update('centerTextColor', '--page-selector-center-text-color', '#000000');
  }

  private changePage(increment: number) {
    const newPage = (this.currentPage ?? this.initialPage ?? 1) + increment;
    if (
      (increment < 0 && newPage >= 1) ||
      (increment > 0 && this.nextPageExists)
    ) {
      this.currentPage = newPage;
      if (this.handlePageChange) this.handlePageChange(newPage);
    }
  }

  private leftButtonArrow =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xNjguODM3LDI1NkwzODguNDE4LDM2LjQxOGM4LjMzMS04LjMzMSw4LjMzMS0yMS44MzksMC0zMC4xN2MtOC4zMzEtOC4zMzEtMjEuODM5LTguMzMxLTMwLjE3LDBMMTIzLjU4MiwyNDAuOTE1DQoJCQljLTguMzMxLDguMzMxLTguMzMxLDIxLjgzOSwwLDMwLjE3bDIzNC42NjcsMjM0LjY2N2M4LjMzMSw4LjMzMSwyMS44MzksOC4zMzEsMzAuMTcsMGM4LjMzMS04LjMzMSw4LjMzMS0yMS44MzksMC0zMC4xNw0KCQkJTDE2OC44MzcsMjU2eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg==';
  private rightButtonArrow =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDUxMi4wMDUgNTEyLjAwNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM4OC40MTgsMjQwLjkyM0wxNTMuNzUxLDYuMjU2Yy04LjM0MS04LjM0MS0yMS44MjQtOC4zNDEtMzAuMTY1LDBzLTguMzQxLDIxLjgyNCwwLDMwLjE2NUwzNDMuMTcsMjU2LjAwNQ0KCQkJTDEyMy41ODYsNDc1LjU4OWMtOC4zNDEsOC4zNDEtOC4zNDEsMjEuODI0LDAsMzAuMTY1YzQuMTYsNC4xNiw5LjYyMSw2LjI1MSwxNS4wODMsNi4yNTFjNS40NjEsMCwxMC45MjMtMi4wOTEsMTUuMDgzLTYuMjUxDQoJCQlsMjM0LjY2Ny0yMzQuNjY3QzM5Ni43NTksMjYyLjc0NywzOTYuNzU5LDI0OS4yNjQsMzg4LjQxOCwyNDAuOTIzeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg==';
  render() {
    const leftButtonDisabled =
      (!this.currentPage && (!this.initialPage || this.initialPage <= 1)) ||
      this.currentPage <= 1
        ? 'disabled'
        : '';

    const rightButtonDisabled = !this.nextPageExists ? 'disabled' : '';

    return html`
      <div id="container" part="container">
        <button
          class=${leftButtonDisabled}
          id="left-button"
          part="left-button"
          @click=${() => this.changePage(-1)}
        >
          <img
            id="left-button-icon"
            part="left-button-icon"
            src="${this.leftButtonIconSrc ?? this.leftButtonArrow}"
          />
        </button>

        <div id="center-indicator" part="center-indicator">
          ${this.currentPage ?? this.initialPage ?? 1}
        </div>

        <button
          class=${rightButtonDisabled}
          id="right-button"
          part="right-button"
          @click=${() => this.changePage(1)}
        >
          <img
            id="right-button-icon"
            part="right-button-icon"
            src="${this.rightButtonIconSrc ?? this.rightButtonArrow}"
          />
        </button>
      </div>
    `;
  }
}
