import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type MessageType = 'info' | 'success' | 'error';

class MessageHandler {
  instance: MessageWrapper | null = null;

  findGlobalMessage(): MessageWrapper | null {
    if (this.instance) return this.instance;

    let el = document.querySelector('message-wrapper') as MessageWrapper;

    if (!el) return null;

    this.instance = el;
    return el;
  }

  showSuccess(message: string, duration: number = 3000): void {
    const el = this.findGlobalMessage();

    if (!el) {
      return;
    }

    el.show('success', message, duration);
  }

  showError(message: string, duration: number = 3000): void {
    const el = this.findGlobalMessage();

    if (!el) {
      return;
    }

    el.show('error', message, duration);
  }

  showInfo(message: string, duration: number = 3000): void {
    const el = this.findGlobalMessage();

    if (!el) {
      return;
    }

    el.show('info', message, duration);
  }
}

export const Message: MessageHandler = new MessageHandler();

@customElement('message-wrapper')
export class MessageWrapper extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare compZindex?: string;

  @property({ type: String }) declare wrapperHeight?: string;
  @property({ type: String }) declare wrapperWidth?: string;
  @property({ type: String }) declare wrapperOverflowX?: string;
  @property({ type: String }) declare wrapperOverflowY?: string;

  @property({ type: String }) declare messageHeight?: string;
  @property({ type: String }) declare messageWidth?: string;
  @property({ type: String }) declare messageLineHeight?: string;
  @property({ type: String }) declare messagePad?: string;
  @property({ type: String }) declare messageTop?: string;
  @property({ type: String }) declare messageBottom?: string;
  @property({ type: String }) declare messageLeft?: string;
  @property({ type: String }) declare messageRight?: string;
  @property({ type: String }) declare messageColor?: string;
  @property({ type: String }) declare messageShadow?: string;

  @property({ type: String }) declare messageFontSize?: string;
  @property({ type: String }) declare messageFontWeight?: string;
  @property({ type: String }) declare messageFontFamily?: string;
  @property({ type: String }) declare messageTransform?: string;
  @property({ type: String }) declare messageAlign?: string;

  @property({ type: String }) declare infoColor?: string;
  @property({ type: String }) declare successColor?: string;
  @property({ type: String }) declare errorColor?: string;

  @property({ type: String }) declare contentHeight?: string;
  @property({ type: String }) declare contentWidth?: string;
  @property({ type: String }) declare contentZindex?: string;

  @state() declare type?: MessageType;
  @state() declare message?: string;
  @state() declare visible?: boolean;

  static styles = css`
    :host {
      display: block;
      height: var(--message-wrapper-comp-height, 100%);
      width: var(--message-wrapper-comp-width, 100%);
      max-height: var(--message-wrapper-comp-height, 100%);
      max-width: var(--message-wrapper-comp-width, 100%);
    }

    #outer-wrapper {
      display: block;
      height: var(--message-wrapper-height, 100%);
      width: var(--message-wrapper-width, 100%);
      position: relative;
      overflow-x: var(--message-wrapper-overflow-x, hidden);
      overflow-y: var(--message-wrapper-overflow-y, hidden);
    }

    #message-container {
      opacity: 0;
      display: flex;
      justify-content: var(--message-wrapper-message-align, center);
      align-items: center;
      height: var(--message-wrapper-message-height, fit-content);
      width: var(--message-wrapper-message-width, 250px);
      padding: var(--message-wrapper-message-padding, 15px);
      box-sizing: border-box;
      position: absolute;
      top: var(--message-wrapper-message-top, 20px);
      bottom: var(--message-wrapper-message-bottom, auto);
      left: var(--message-wrapper-message-left, 50%);
      right: var(--message-wrapper-message-right, 50%);
      border-radius: 24px;
      box-shadow: var(--message-wrapper-message-shadow, 0px 2px 5px #d0d0d0);
      background-color: var(--message-wrapper-message-color, #eceff1);
      transition: opacity 0.4s ease, transform 0.4s ease;
      pointer-events: none;
      transform: translate(-50%);
      z-index: var(--message-wrapper-z-index, 1000000000);
    }

    #message-container.visible {
      opacity: 1;
    }

    #message {
      margin: 0;
      font-size: var(--message-wrapper-message-font-size, 14px);
      font-weight: var(--message-wrapper-message-font-weight, bold);
      font-family: var(
        --message-wrapper-message-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
      line-height: var(--message-wrapper-message-line-height, 18px);
      text-shadow: var(
        --message-wrapper-message-text-shadow,
        0px 2px 5px #d0d0d0
      );
      color: black;
      text-transform: var(--message-wrapper-message-text-transform, none);
      cursor: default;
    }

    #message.info {
      color: var(--message-wrapper-info-color, black);
    }

    #message.success {
      color: var(--message-wrapper-success-color, green);
    }

    #message.error {
      color: var(--message-wrapper-error-color, red);
    }

    #content {
      display: block;
      height: var(--message-wrapper-content-height, 100%);
      width: var(--message-wrapper-content-width, 100%);
      position: relative;
      z-index: var(--message-wrapper-content-z-index, 1);
    }
  `;

  public show(type: MessageType, message: string, duration: number = 3000) {
    this.type = type;
    this.message = message;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, duration);
  }

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

    update('compHeight', '--message-wrapper-comp-height', '100%');
    update('compWidth', '--message-wrapper-comp-width', '100%');
    update('compZindex', '--message-wrapper-z-index', '1000000000');

    update('wrapperHeight', '--message-wrapper-height', '100%');
    update('wrapperWidth', '--message-wrapper-width', '100%');
    update('wrapperOverflowX', '--message-wrapper-overflow-x', 'hidden');
    update('wrapperOverflowY', '--message-wrapper-overflow-y', 'hidden');

    update('messageHeight', '--message-wrapper-message-height', 'fit-content');
    update('messageWidth', '--message-wrapper-message-width', '250px');
    update(
      'messageLineHeight',
      '--message-wrapper-message-line-height',
      '18px'
    );
    update('messagePad', '--message-wrapper-message-padding', '15px');
    update('messageTop', '--message-wrapper-message-top', '20px');
    update('messageBottom', '--message-wrapper-message-bottom', 'auto');
    update('messageLeft', '--message-wrapper-message-left', '50%');
    update('messageRight', '--message-wrapper-message-right', '50%');

    update('messageColor', '--message-wrapper-message-color', '#eceff1');
    update(
      'messageShadow',
      '--message-wrapper-message-shadow',
      '0px 2px 5px #d0d0d0'
    );

    update('messageFontSize', '--message-wrapper-message-font-size', '14px');
    update(
      'messageFontWeight',
      '--message-wrapper-message-font-weight',
      'bold'
    );
    update(
      'messageFontFamily',
      '--message-wrapper-message-font-family',
      `'Helvetica', 'Arial', sans-serif`
    );
    update(
      'messageTransform',
      '--message-wrapper-message-text-transform',
      'none'
    );
    update('messageAlign', '--message-wrapper-message-align', 'center');

    update('infoColor', '--message-wrapper-info-color', 'black');
    update('successColor', '--message-wrapper-success-color', 'green');
    update('errorColor', '--message-wrapper-error-color', 'red');

    update('contentHeight', '--message-wrapper-content-height', '100%');
    update('contentWidth', '--message-wrapper-content-width', '100%');
    update('contentZindex', '--message-wrapper-content-z-index', '1');
  }

  render() {
    return html`
      <div id="outer-wrapper" part="outer-wrapper">
        <div
          id="message-container"
          part="message-container"
          class="${this.visible ? 'visible' : ''}"
        >
          <p id="message" part="message" class="${this.type ?? 'info'}">
            ${this.message ?? 'No message'}
          </p>
        </div>

        <slot id="content" part="content"></slot>
      </div>
    `;
  }
}
