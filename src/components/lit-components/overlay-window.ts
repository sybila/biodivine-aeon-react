import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('overlay-window')
export class OverlayWindow extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;
  @property({ type: String }) declare compMaxHeight?: string;
  @property({ type: String }) declare compMaxWidth?: string;
  @property({ type: String }) declare compZIndex?: string;

  @property({ type: String }) declare compBackgroundColor?: string;
  @property({ type: String }) declare compBackgroundWidth?: string;
  @property({ type: String }) declare compBackgroundHeight?: string;
  @property({ type: Function }) declare handleBackgroundClick?: () => void;

  @property({ type: String }) declare windHeight?: string;
  @property({ type: String }) declare windWidth?: string;
  @property({ type: String }) declare windMaxHeight?: string;
  @property({ type: String }) declare windMaxWidth?: string;
  @property({ type: String }) declare windPad?: string;
  @property({ type: String }) declare windColor?: string;
  @property({ type: String }) declare windShadow?: string;
  @property({ type: String }) declare windOverflowX?: string;
  @property({ type: String }) declare windOverflowY?: string;
  @property({ type: String }) declare windResize?: string;

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

  @property({ type: String }) declare contentHeight?: string;
  @property({ type: String }) declare contentWidth?: string;
  @property({ type: String }) declare contentMaxHeight?: string;
  @property({ type: String }) declare contentMaxWidth?: string;
  @property({ type: String }) declare contentJustifyC?: string;
  @property({ type: String }) declare contentAlignI?: string;
  @property({ type: String }) declare contentGap?: string;

  @property({ type: String }) declare gapSize?: string;

  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      height: var(--overlay-window-comp-height, 100vh);
      width: var(--overlay-window-comp-width, 100vw);
      max-height: var(--overlay-window-comp-max-height, 100vh);
      max-width: var(--overlay-window-comp-max-width, 100vw);
      z-index: var(--overlay-window-comp-z-index, 999999990);
    }

    #background {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: var(--overlay-window-background-width, 100%);
      height: var(--overlay-window-background-height, 100%);
      background-color: var(
        --overlay-window-background-color,
        rgba(0, 0, 0, 0.3)
      );
      overflow: hidden;
    }

    #window {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      height: var(--overlay-window-height, fit-content);
      width: var(--overlay-window-width, 400px);
      max-height: var(--overlay-window-max-height, 100%);
      max-width: var(--overlay-window-max-width, 400px);
      padding: var(--overlay-window-padding, 8px);
      gap: var(--overlay-window-gap, 5px);
      border-radius: 8px;
      background-color: var(--overlay-window-bg-color, #f5f5f5);
      box-shadow: var(--overlay-window-shadow, 0px 2px 5px #d0d0d0);
      overflow-x: var(--overlay-window-overflow-x, auto);
      overflow-y: var(--overlay-window-overflow-y, auto);
      resize: var(--overlay-window-resize, none);
      box-sizing: border-box;
      pointer-events: auto;
    }

    #header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: var(--overlay-window-header-height, fit-content);
      width: var(--overlay-window-header-width, 100%);
      gap: var(--overlay-window-header-gap, 5px);
    }

    #header-text {
      margin: 0;
      font-size: var(--overlay-window-tag-font-size, 24px);
      font-weight: var(--overlay-window-tag-font-weight, bold);
      font-family: var(
        --overlay-window-tag-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(--overlay-window-tag-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--overlay-window-tag-color, black);
      text-transform: var(--overlay-window-tag-text-transform, none);
      cursor: default;
    }

    #close-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--overlay-window-close-height, fit-content);
      width: var(--overlay-window-close-width, fit-content);
      border-radius: 8px;
      background-color: var(--overlay-window-bg-color, #f5f5f5);
      transition: background-color 0.3s;
    }

    #close-button:hover {
      background-color: var(--overlay-window-close-hover-color, #cfd8dc);
    }

    #close-button-icon {
      height: var(--overlay-window-close-icon-height, fit-content);
      width: var(--overlay-window-close-icon-width, fit-content);
      max-height: var(--overlay-window-close-icon-height, fit-content);
      max-width: var(--overlay-window-close-icon-width, fit-content);
    }

    slot {
      display: flex;
      flex-direction: column;
      justify-content: var(--overlay-window-content-justify-content, start);
      align-items: var(--overlay-window-content-align-items, center);
      height: var(--overlay-window-content-height, fit-content);
      width: var(--overlay-window-content-width, 100%);
      max-height: var(--overlay-window-content-max-height, 100%);
      max-width: var(--overlay-window-content-max-width, 100%);
      gap: var(--overlay-window-content-gap, 5px);
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

    update('compHeight', '--overlay-window-comp-height', '100vh');
    update('compWidth', '--overlay-window-comp-width', '100vw');
    update('compMaxHeight', '--overlay-window-comp-max-height', '100vh');
    update('compMaxWidth', '--overlay-window-comp-max-width', '100vw');
    update('compZIndex', '--overlay-window-comp-z-index', '999999990');

    update(
      'compBackgroundColor',
      '--overlay-window-background-color',
      'rgba(0, 0, 0, 0.3)'
    );
    update('compBackgroundWidth', '--overlay-window-background-width', '100%');
    update(
      'compBackgroundHeight',
      '--overlay-window-background-height',
      '100%'
    );

    update('windHeight', '--overlay-window-height', 'fit-content');
    update('windWidth', '--overlay-window-width', '400px');
    update('windMaxHeight', '--overlay-window-max-height', '100%');
    update('windMaxWidth', '--overlay-window-max-width', '400px');
    update('windPad', '--overlay-window-padding', '8px');
    update('gapSize', '--overlay-window-gap', '5px');
    update('windColor', '--overlay-window-bg-color', '#f5f5f5');
    update('windShadow', '--overlay-window-shadow', '0px 2px 5px #d0d0d0');
    update('windOverflowX', '--overlay-window-overflow-x', 'auto');
    update('windOverflowY', '--overlay-window-overflow-y', 'auto');
    update('windResize', '--overlay-window-resize', 'none');

    update('headerHeight', '--overlay-window-header-height', 'fit-content');
    update('headerWidth', '--overlay-window-header-width', '100%');
    update('headerGap', '--overlay-window-header-gap', '5px');

    update('headerTextFontSize', '--overlay-window-tag-font-size', '24px');
    update('headerTextFontWeight', '--overlay-window-tag-font-weight', 'bold');
    update(
      'headerTextFontFamily',
      '--overlay-window-tag-font-family',
      `'Helvetica', 'Arial', sans-serif`
    );
    update(
      'headerTextShadow',
      '--overlay-window-tag-text-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update('headerTextColor', '--overlay-window-tag-color', 'black');
    update(
      'headerTextTransform',
      '--overlay-window-tag-text-transform',
      'none'
    );

    update('closeHeight', '--overlay-window-close-height', 'fit-content');
    update('closeWidth', '--overlay-window-close-width', 'fit-content');
    update('closeHoverColor', '--overlay-window-close-hover-color', '#cfd8dc');
    update(
      'closeIconHeight',
      '--overlay-window-close-icon-height',
      'fit-content'
    );
    update(
      'closeIconWidth',
      '--overlay-window-close-icon-width',
      'fit-content'
    );

    update('contentHeight', '--overlay-window-content-height', 'fit-content');
    update('contentWidth', '--overlay-window-content-width', '100%');
    update('contentMaxHeight', '--overlay-window-content-max-height', '100%');
    update('contentMaxWidth', '--overlay-window-content-max-width', '100%');
    update(
      'contentJustifyC',
      '--overlay-window-content-justify-content',
      'start'
    );
    update('contentAlignI', '--overlay-window-content-align-items', 'center');
    update('contentGap', '--overlay-window-content-gap', '5px');
  }

  static closeIcon: string =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyeiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=';

  render() {
    return html`
      <div
        id="background"
        part="background"
        @click=${this.handleBackgroundClick}
      >
        <div
          id="window"
          part="window"
          @click=${(e: Event) => e.stopPropagation()}
        >
          ${this.showHeader
            ? html`<div id="header" part="header">
                ${this.showCloseButton
                  ? html`<div id="close-button" part="close-button" @click=${
                      this.handleCloseClick
                    }>
                    <img id="close-button-icon" part="close-button-icon" src=${
                      this.closeButtonSrc ?? OverlayWindow.closeIcon
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
