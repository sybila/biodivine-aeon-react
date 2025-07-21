import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("pop-up-bar")
export class PopUpBar extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare barHeight?: string;
  @property({ type: String }) declare barWidth?: string;
  @property({ type: String }) declare barColor?: string;
  @property({ type: String }) declare barShadow?: string;

  @property({ type: String }) declare butHeight?: string;
  @property({ type: String }) declare butWidth?: string;
  @property({ type: String }) declare butColor?: string;
  @property({ type: String }) declare butHoverColor?: string;
  @property({ type: String }) declare butShadow?: string;

  @property({ type: String }) declare iconHeight?: string;
  @property({ type: String }) declare iconWidth?: string;
  @property({ type: String }) declare iconSrc?: string;
  @property({ type: String }) declare iconAlt?: string;

  @property({ type: String }) declare gapSize?: string;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--pop-up-bar-comp-height, fit-content);
      width: var(--pop-up-bar-comp-width, fit-content);
      max-height: var(--pop-up-bar-comp-height, fit-content);
      max-width: var(--pop-up-bar-comp-width, fit-content);
      pointer-events: none;
    }

    #container {
      display: flex;
      flex-direction: column-reverse;
      justify-content: end;
      align-items: center;
      pointer-events: none;
    }

    #bar {
      margin-bottom: var(--pop-up-bar-gap, 10px);
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--pop-up-bar-height, 100px);
      width: var(--pop-up-bar-width, fit-content);
      overflow: auto;
      box-sizing: border-box;
      padding: 0 10px;
      border: none;
      border-radius: 10px;
      box-shadow: var(--pop-up-bar-shadow, 0px 2px 5px #d0d0d0);
      background-color: var(--pop-up-bar-color, #eceff1);
      pointer-events: auto;
    }

    #bar-container {
      opacity: 0;
      height: calc(
        var(--pop-up-bar-height, 100px) + var(--pop-up-bar-gap, 10px)
      );
      width: var(--pop-up-bar-width, fit-content);
      visibility: hidden;
      transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
      pointer-events: none;
    }

    #bar-container:hover {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    slot {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      width: 100%;
    }

    #display-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--pop-up-bar-button-height, 30px);
      width: var(--pop-up-bar-button-width, 200px);
      border-radius: 10px;
      box-shadow: var(--pop-up-bar-button-shadow, 0px 2px 5px #d0d0d0);
      background-color: var(--pop-up-bar-button-color, #eceff1);
      cursor: pointer;
      pointer-events: auto;
    }

    #display-button:hover {
      background-color: var(--pop-up-bar-button-hover-color, #cfd8dc);
    }

    #display-button:hover + #bar-container {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    img {
      height: var(--pop-up-bar-icon-height, 70%);
      width: var(--pop-up-bar-icon-width, 70%);
    }

    #arrow-up {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      font-family: "Segoe UI", "Helvetica", "Arial", sans-serif;
      line-height: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--pop-up-bar-icon-height, 90%);
      width: var(--pop-up-bar-icon-width, 90%);
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

    update("compHeight", "--pop-up-bar-comp-height", "fit-content");
    update("compWidth", "--pop-up-bar-comp-width", "fit-content");

    update("barHeight", "--pop-up-bar-height", "100px");
    update("barWidth", "--pop-up-bar-width", "fit-content");
    update("barColor", "--pop-up-bar-color", "#eceff1");
    update("barShadow", "--pop-up-bar-shadow", "0px 2px 5px #d0d0d0");

    update("butHeight", "--pop-up-bar-button-height", "30px");
    update("butWidth", "--pop-up-bar-button-width", "200px");
    update("butColor", "--pop-up-bar-button-color", "#eceff1");
    update("butHoverColor", "--pop-up-bar-button-hover-color", "#cfd8dc");
    update("butShadow", "--pop-up-bar-button-shadow", "0px 2px 5px #d0d0d0");

    update("gapSize", "--pop-up-bar-gap", "10px");

    update("iconHeight", "--pop-up-bar-icon-height", "70%");
    update("iconWidth", "--pop-up-bar-icon-width", "70%");
  }

  render() {
    return html`
      <div id="container" part="container">
        <div id="display-button" part="button">
          ${this.iconSrc
            ? html`<img
                part="icon"
                src="${this.iconSrc}"
                alt="${this.iconAlt ?? "icon"}"
              />`
            : html`<span id="arrow-up" part="arrow">^</span>`}
        </div>
        <div id="bar-container" part="bar-container">
          <div id="bar" part="bar">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
