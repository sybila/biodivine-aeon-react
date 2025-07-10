import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('content-window')
export class ContentWindow extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

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
  @property({ type: Function }) declare onCloseClick?: () => void;
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
      display: inline-block;
      height: var(--content-window-comp-height, fit-content);
      width: var(--content-window-comp-width, 505px);
      max-height: var(--content-window-comp-height, fit-content);
      max-width: var(--content-window-comp-width, 100%);
    }

    #window {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      height: var(--content-window-height, fit-content);
      width: var(--content-window-width, 100%);
      max-height: var(--content-window-max-height, 100%);
      max-width: var(--content-window-max-width, 100%);
      padding: var(--content-window-padding, 8px);
      gap: var(--content-window-gap, 5px);
      border-radius: 8px;
      background-color: var(--content-window-bg-color, #f5f5f5);
      box-shadow: var(--content-window-shadow, 0px 2px 5px #d0d0d0);
      overflow-x: var(--content-window-overflow-x, auto);
      overflow-y: var(--content-window-overflow-y, auto);
      resize: var(--content-window-resize, none);
    }

    #header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: var(--content-window-header-height, fit-content);
      width: var(--content-window-header-width, 100%);
      gap: var(--content-window-header-gap, 5px);
    }

    #header-text {
      margin: 0;
      font-size: var(--content-window-tag-font-size, 24px);
      font-weight: var(--content-window-tag-font-weight, bold);
      font-family: var(
        --content-window-tag-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(--content-window-tag-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--content-window-tag-color, black);
      text-transform: var(--content-window-tag-text-transform, none);
      cursor: default;
    }

    #close-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--content-window-close-height, fit-content);
      width: var(--content-window-close-width, fit-content);
      border-radius: 8px;
      background-color: var(--content-window-bg-color, #f5f5f5);
      transition: background-color 0.3s;
    }

    #close-button:hover {
      background-color: var(--content-window-close-hover-color, #cfd8dc);
    }

    #close-button-icon {
      height: var(--content-window-close-icon-height, fit-content);
      width: var(--content-window-close-icon-width, fit-content);
      max-height: var(--content-window-close-icon-height, fit-content);
      max-width: var(--content-window-close-icon-width, fit-content);
    }

    slot {
      display: flex;
      flex-direction: column;
      justify-content: var(--content-window-content-justify-content, start);
      align-items: var(--content-window-content-align-items, center);
      height: var(--content-window-content-height, fit-content);
      width: var(--content-window-content-width, 100%);
      max-height: var(--content-window-content-max-height, 100%);
      max-width: var(--content-window-content-max-width, 100%);
      gap: var(--content-window-content-gap, 5px);
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

    update('compHeight', '--content-window-comp-height', 'fit-content');
    update('compWidth', '--content-window-comp-width', '505px');

    update('windHeight', '--content-window-height', 'fit-content');
    update('windWidth', '--content-window-width', '100%');
    update('windMaxHeight', '--content-window-max-height', '100%');
    update('windMaxWidth', '--content-window-max-width', '100%');
    update('windPad', '--content-window-padding', '8px');
    update('gapSize', '--content-window-gap', '5px');
    update('windColor', '--content-window-bg-color', '#f5f5f5');
    update('windShadow', '--content-window-shadow', '0px 2px 5px #d0d0d0');
    update('windOverflowX', '--content-window-overflow-x', 'auto');
    update('windOverflowY', '--content-window-overflow-y', 'auto');
    update('windResize', '--content-window-resize', 'none');

    update('headerHeight', '--content-window-header-height', 'fit-content');
    update('headerWidth', '--content-window-header-width', '100%');
    update('headerGap', '--content-window-header-gap', '5px');

    update('headerTextFontSize', '--content-window-tag-font-size', '24px');
    update('headerTextFontWeight', '--content-window-tag-font-weight', 'bold');
    update(
      'headerTextFontFamily',
      '--content-window-tag-font-family',
      `'Helvetica', 'Arial', sans-serif`
    );
    update(
      'headerTextShadow',
      '--content-window-tag-text-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update('headerTextColor', '--content-window-tag-color', 'black');
    update(
      'headerTextTransform',
      '--content-window-tag-text-transform',
      'none'
    );

    update('closeHeight', '--content-window-close-height', 'fit-content');
    update('closeWidth', '--content-window-close-width', 'fit-content');
    update('closeHoverColor', '--content-window-close-hover-color', '#cfd8dc');
    update(
      'closeIconHeight',
      '--content-window-close-icon-height',
      'fit-content'
    );
    update(
      'closeIconWidth',
      '--content-window-close-icon-width',
      'fit-content'
    );

    update('contentHeight', '--content-window-content-height', 'fit-content');
    update('contentWidth', '--content-window-content-width', '100%');
    update('contentMaxHeight', '--content-window-content-max-height', '100%');
    update('contentMaxWidth', '--content-window-content-max-width', '100%');
    update(
      'contentJustifyC',
      '--content-window-content-justify-content',
      'start'
    );
    update('contentAlignI', '--content-window-content-align-items', 'center');
    update('contentGap', '--content-window-content-gap', '5px');
  }

  static closeIcon: string =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyeiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=';

  render() {
    return html`
      <div id="window" part="window">
        ${this.showHeader
          ? html`<div id="header" part="header">
              ${this.showCloseButton
                ? html`<div id="close-button" part="close-button" @click=${
                    this.onCloseClick
                  }>
                    <img id="close-button-icon" part="close-button-icon" src=${
                      this.closeButtonSrc ?? ContentWindow.closeIcon
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
    `;
  }
}
