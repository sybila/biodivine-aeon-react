import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type StyleProperty =
  | 'compHeight'
  | 'compWidth'
  | 'compZIndex'
  | 'compBackgroundColor'
  | 'backgroundUserSelect'
  | 'backgroundPointerEvents'
  | 'windMinHeight'
  | 'windMinWidth'
  | 'windMaxHeight'
  | 'windMaxWidth'
  | 'windPad'
  | 'windColor'
  | 'windShadow'
  | 'windowUserSelect'
  | 'windowPointerEvents'
  | 'gapSize'
  | 'headerHeight'
  | 'headerWidth'
  | 'headerGap'
  | 'headerText'
  | 'headerTextFontSize'
  | 'headerTextFontWeight'
  | 'headerTextFontFamily'
  | 'headerTextColor'
  | 'headerTextShadow'
  | 'headerTextTransform'
  | 'closeButtonSrc'
  | 'closeHeight'
  | 'closeWidth'
  | 'closeHoverColor'
  | 'closeIconHeight'
  | 'closeIconWidth'
  | 'contentJustifyC'
  | 'contentAlignI'
  | 'contentGap'
  | 'contentOverflowY';

@customElement('semitransparent-overlay-window')
export class SemitransparentOverlayWindow extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;
  @property({ type: String }) declare compZIndex?: string;

  @property({ type: String }) declare compBackgroundColor?: string;
  @property({ type: String }) declare backgroundUserSelect?: string;
  @property({ type: String }) declare backgroundPointerEvents?: string;
  @property({ type: Function }) declare handleBackgroundClick?: () => void;

  @property({ type: String }) declare windMinHeight?: string;
  @property({ type: String }) declare windMinWidth?: string;
  @property({ type: String }) declare windMaxHeight?: string;
  @property({ type: String }) declare windMaxWidth?: string;
  @property({ type: String }) declare windPad?: string;
  @property({ type: String }) declare windColor?: string;
  @property({ type: String }) declare windShadow?: string;
  @property({ type: String }) declare windowUserSelect?: string;
  @property({ type: String }) declare windowPointerEvents?: string;

  @property({ type: Boolean }) declare showHeader?: boolean;
  @property({ type: String }) declare headerHeight?: string;
  @property({ type: String }) declare headerWidth?: string;
  @property({ type: String }) declare headerGap?: string;
  @property({ type: String }) declare headerText?: string;
  @property({ type: String }) declare headerTextFontSize?: string;
  @property({ type: String }) declare headerTextFontWeight?: string;
  @property({ type: String }) declare headerTextFontFamily?: string;
  @property({ type: String }) declare headerTextColor?: string;
  @property({ type: String }) declare headerTextShadow?: string;
  @property({ type: String }) declare headerTextTransform?: string;

  @property({ type: Boolean }) declare showCloseButton?: boolean;
  @property({ type: Function }) declare handleCloseClick?: () => void;
  @property({ type: String }) declare closeButtonSrc?: string;
  @property({ type: String }) declare closeHeight?: string;
  @property({ type: String }) declare closeWidth?: string;
  @property({ type: String }) declare closeHoverColor?: string;
  @property({ type: String }) declare closeIconHeight?: string;
  @property({ type: String }) declare closeIconWidth?: string;

  @property({ type: String }) declare contentJustifyC?: string;
  @property({ type: String }) declare contentAlignI?: string;
  @property({ type: String }) declare contentGap?: string;
  @property({ type: String }) declare contentOverflowY?: string;

  @property({ type: String }) declare gapSize?: string;

  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      height: var(--semitransparent-overlay-window-comp-height, 100vh);
      width: var(--semitransparent-overlay-window-comp-width, 100vw);
      z-index: var(--semitransparent-overlay-window-comp-z-index, 999999990);
      user-select: var(--semitransparent-overlay-window-bg-user-select, none);
      pointer-events: var(
        --semitransparent-overlay-window-bg-pointer-events,
        none
      );
    }

    #background {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(
        --semitransparent-overlay-window-background-color,
        transparent
      );
      overflow: hidden;
      user-select: var(--semitransparent-overlay-window-bg-user-select, none);
      pointer-events: var(
        --semitransparent-overlay-window-bg-pointer-events,
        none
      );
    }

    #window {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      max-height: var(--semitransparent-overlay-window-max-height, 90vh);
      max-width: var(--semitransparent-overlay-window-max-width, 90vw);
      min-height: var(--semitransparent-overlay-window-min-height, 1vh);
      min-width: var(--semitransparent-overlay-window-min-width, 1vw);
      padding: var(--semitransparent-overlay-window-padding, 8px);
      gap: var(--semitransparent-overlay-window-gap, 5px);
      border-radius: 8px;
      background-color: var(--semitransparent-overlay-window-bg-color, #646464);
      box-shadow: var(
        --semitransparent-overlay-window-shadow,
        0px 2px 5px #d0d0d0
      );
      overflow-x: hidden;
      overflow-y: hidden;
      resize: none;
      box-sizing: border-box;
      opacity: 0.5;
      user-select: var(--semitransparent-overlay-window-win-user-select, none);
      pointer-events: var(
        --semitransparent-overlay-window-win-pointer-events,
        none
      );
    }

    #header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: var(--semitransparent-overlay-window-header-height, fit-content);
      width: var(--semitransparent-overlay-window-header-width, 100%);
      gap: var(--semitransparent-overlay-window-header-gap, 5px);
    }

    #header-text {
      margin: 0;
      font-size: var(--semitransparent-overlay-window-tag-font-size, 24px);
      font-weight: var(--semitransparent-overlay-window-tag-font-weight, bold);
      font-family: var(
        --semitransparent-overlay-window-tag-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(--semitransparent-overlay-window-tag-text-shadow, none);
      color: var(--semitransparent-overlay-window-tag-color, white);
      text-transform: var(
        --semitransparent-overlay-window-tag-text-transform,
        none
      );
      cursor: default;
    }

    #close-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--semitransparent-overlay-window-close-height, fit-content);
      width: var(--semitransparent-overlay-window-close-width, fit-content);
      border-radius: 8px;
      background-color: var(--semitransparent-overlay-window-bg-color, #646464);
      transition: background-color 0.3s;
    }

    #close-button:hover {
      background-color: var(
        --semitransparent-overlay-window-close-hover-color,
        #cfd8dc
      );
    }

    #close-button-icon {
      height: var(
        --semitransparent-overlay-window-close-icon-height,
        fit-content
      );
      width: var(
        --semitransparent-overlay-window-close-icon-width,
        fit-content
      );
      max-height: var(
        --semitransparent-overlay-window-close-icon-height,
        fit-content
      );
      max-width: var(
        --semitransparent-overlay-window-close-icon-width,
        fit-content
      );
    }

    slot {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      justify-content: var(
        --semitransparent-overlay-window-content-justify-content,
        start
      );
      align-items: var(
        --semitransparent-overlay-window-content-align-items,
        center
      );
      overflow-x: hidden;
      overflow-y: var(
        --semitransparent-overlay-window-content-overflow-y,
        auto
      );
      gap: var(--semitransparent-overlay-window-content-gap, 5px);
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

    update(
      'compHeight',
      '--semitransparent-overlay-window-comp-height',
      '100vh'
    );
    update('compWidth', '--semitransparent-overlay-window-comp-width', '100vw');
    update(
      'compZIndex',
      '--semitransparent-overlay-window-comp-z-index',
      '999999990'
    );

    update(
      'compBackgroundColor',
      '--semitransparent-overlay-window-background-color',
      'transparent'
    );
    update(
      'backgroundUserSelect',
      '--semitransparent-overlay-window-bg-user-select',
      'none'
    );
    update(
      'backgroundPointerEvents',
      '--semitransparent-overlay-window-bg-pointer-events',
      'none'
    );

    update(
      'windMinHeight',
      '--semitransparent-overlay-window-min-height',
      '1vh'
    );
    update('windMinWidth', '--semitransparent-overlay-window-min-width', '1vh');
    update(
      'windMaxHeight',
      '--semitransparent-overlay-window-max-height',
      '90vh'
    );
    update(
      'windMaxWidth',
      '--semitransparent-overlay-window-max-width',
      '90vh'
    );
    update('windPad', '--semitransparent-overlay-window-padding', '8px');
    update('gapSize', '--semitransparent-overlay-window-gap', '5px');
    update('windColor', '--semitransparent-overlay-window-bg-color', '#646464');
    update(
      'windShadow',
      '--semitransparent-overlay-window-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update(
      'windowUserSelect',
      '--semitransparent-overlay-window-win-user-select',
      'none'
    );
    update(
      'windowPointerEvents',
      '--semitransparent-overlay-window-win-pointer-events',
      'none'
    );

    update(
      'headerHeight',
      '--semitransparent-overlay-window-header-height',
      'fit-content'
    );
    update(
      'headerWidth',
      '--semitransparent-overlay-window-header-width',
      '100%'
    );
    update('headerGap', '--semitransparent-overlay-window-header-gap', '5px');

    update(
      'headerTextFontSize',
      '--semitransparent-overlay-window-tag-font-size',
      '24px'
    );
    update(
      'headerTextFontWeight',
      '--semitransparent-overlay-window-tag-font-weight',
      'bold'
    );
    update(
      'headerTextFontFamily',
      '--semitransparent-overlay-window-tag-font-family',
      `'Helvetica', 'Arial', sans-serif`
    );
    update(
      'headerTextShadow',
      '--semitransparent-overlay-window-tag-text-shadow',
      'none'
    );
    update(
      'headerTextColor',
      '--semitransparent-overlay-window-tag-color',
      'white'
    );
    update(
      'headerTextTransform',
      '--semitransparent-overlay-window-tag-text-transform',
      'none'
    );

    update(
      'closeHeight',
      '--semitransparent-overlay-window-close-height',
      'fit-content'
    );
    update(
      'closeWidth',
      '--semitransparent-overlay-window-close-width',
      'fit-content'
    );
    update(
      'closeHoverColor',
      '--semitransparent-overlay-window-close-hover-color',
      '#cfd8dc'
    );
    update(
      'closeIconHeight',
      '--semitransparent-overlay-window-close-icon-height',
      'fit-content'
    );
    update(
      'closeIconWidth',
      '--semitransparent-overlay-window-close-icon-width',
      'fit-content'
    );

    update(
      'contentJustifyC',
      '--semitransparent-overlay-window-content-justify-content',
      'start'
    );
    update(
      'contentAlignI',
      '--semitransparent-overlay-window-content-align-items',
      'center'
    );
    update('contentGap', '--semitransparent-overlay-window-content-gap', '5px');
    update(
      'contentOverflowY',
      '--semitransparent-overlay-window-content-overflow-y',
      'auto'
    );
  }

  static closeIcon: string =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyeiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=';

  render() {
    return html`
      <div
        id="background"
        part="background"
        @click=${(e: Event) => {
          if (e.target === e.currentTarget && this.handleBackgroundClick) {
            this.handleBackgroundClick();
          }
        }}
      >
        <div id="window" part="window">
          ${this.showHeader != false
            ? html`<div id="header" part="header">
                ${this.showCloseButton
                  ? html`<div id="close-button" part="close-button" @click=${
                      this.handleCloseClick
                    }>
                    <img id="close-button-icon" part="close-button-icon" src=${
                      this.closeButtonSrc ??
                      SemitransparentOverlayWindow.closeIcon
                    } ></img>
                </div>`
                  : html`<div></div>`}
                <p id="header-text" part="header-text">
                  ${this.headerText ?? ''}
                </p>
                <div></div>
              </div>`
            : ''}
          <slot part="content"></slot>
        </div>
      </div>
    `;
  }
}
