import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('loading-indicator')
export class LoadingIndicator extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare loadBoxHeight?: string;
  @property({ type: String }) declare loadBoxWidth?: string;
  @property({ type: String }) declare loadBoxColor?: string;
  @property({ type: String }) declare loadBoxShadow?: string;
  @property({ type: String }) declare loadBoxPad?: string;
  @property({ type: String }) declare loadBoxGap?: string;

  @property({ type: String }) declare loadingSpinnerSrc?: string;
  @property({ type: String }) declare loadingSpinnerHeight?: string;
  @property({ type: String }) declare loadingSpinnerWidth?: string;

  @property({ type: String }) declare loadingMessage?: string;
  @property({ type: String }) declare loadingMessageFontSize?: string;
  @property({ type: String }) declare loadingMessageFontWeight?: string;
  @property({ type: String }) declare tagTextFontFamily?: string;
  @property({ type: String }) declare tagTextColor?: string;
  @property({ type: String }) declare tagTextShadow?: string;
  @property({ type: String }) declare tagTextTransform?: string;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--loading-indicator-comp-height, fit-content);
      width: var(--loading-indicator-comp-width, fit-content);
      max-height: var(--loading-indicator-comp-height, fit-content);
      max-width: var(--loading-indicator-comp-width, fit-content);
    }

    #loading-indicator {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: var(--loading-indicator-height, fit-content);
      width: var(--loading-indicator-width, fit-content);
      padding: var(--loading-indicator-pad, 15px);
      gap: var(--loading-indicator-gap, 10px);
      background-color: var(--loading-indicator-bg-color, #fff);
      border-radius: 24px;
      box-sizing: border-box;
      box-shadow: var(--loading-indicator-shadow, 0px 2px 5px #d0d0d0);
      pointer-events: none;
      transition: 0.3s;
    }

    #loading-spinner {
      height: var(--loading-indicator-spinner-height, fit-content);
      width: var(--loading-indicator-spinner-width, fit-content);
    }

    #loading-message {
      margin: 0;
      font-size: var(--loading-indicator-tag-font-size, 16px);
      font-weight: var(--loading-indicator-tag-font-weight, 400);
      font-family: var(
        --loading-indicator-tag-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      text-shadow: var(
        --loading-indicator-tag-text-shadow,
        0px 2px 5px #d0d0d0
      );
      color: var(--loading-indicator-tag-color, black);
      text-transform: var(--loading-indicator-tag-text-transform, none);
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

    update('compHeight', '--loading-indicator-comp-height', 'fit-content');
    update('compWidth', '--loading-indicator-comp-width', 'fit-content');

    update('loadBoxHeight', '--loading-indicator-height', 'fit-content');
    update('loadBoxWidth', '--loading-indicator-width', 'fit-content');
    update('loadBoxColor', '--loading-indicator-bg-color', '#fff');
    update(
      'loadBoxShadow',
      '--loading-indicator-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update('loadBoxPad', '--loading-indicator-pad', '15px');
    update('loadBoxGap', '--loading-indicator-gap', '10px');

    update(
      'loadingSpinnerHeight',
      '--loading-indicator-spinner-height',
      'fit-content'
    );
    update(
      'loadingSpinnerWidth',
      '--loading-indicator-spinner-width',
      'fit-content'
    );

    update(
      'loadingMessageFontSize',
      '--loading-indicator-tag-font-size',
      '16px'
    );
    update(
      'loadingMessageFontWeight',
      '--loading-indicator-tag-font-weight',
      '400'
    );
    update(
      'tagTextFontFamily',
      '--loading-indicator-tag-font-family',
      `'Helvetica', 'Arial', sans-serif`
    );
    update('tagTextColor', '--loading-indicator-tag-color', 'black');
    update(
      'tagTextShadow',
      '--loading-indicator-tag-text-shadow',
      '0px 2px 5px #d0d0d0'
    );
    update(
      'tagTextTransform',
      '--loading-indicator-tag-text-transform',
      'none'
    );
  }

  static loadingGif: string =
    'data:image/gif;base64,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';

  render() {
    return html`
      <div id="loading-indicator" part="box">
        <img
          id="loading-spinner"
          part="loading-spinner"
          src="${this.loadingSpinnerSrc || LoadingIndicator.loadingGif}"
          alt="Loading Spinner"
        />
        ${this.loadingMessage
          ? html`<p id="loading-message" part="loading-message">
              ${this.loadingMessage}
            </p>`
          : ''}
      </div>
    `;
  }
}
