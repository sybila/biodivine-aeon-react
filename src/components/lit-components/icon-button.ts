import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("icon-button")
export class IconButton extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare buttonSize?: string;
  @property({ type: String }) declare sizeBy?: "height" | "width";
  @property({ type: String }) declare buttonBorderRadius?: string;
  @property({ type: String }) declare buttonColor?: string;
  @property({ type: String }) declare buttonHoverColor?: string;
  @property({ type: String }) declare buttonActiveColor?: string;
  @property({ type: String }) declare buttonShadow?: string;
  @property({ type: String }) declare iconSize?: string;
  @property({ type: Function }) declare onClick?: () => void;
  @property({ type: String }) declare iconSrc?: string;
  @property({ type: String }) declare iconAlt?: string;

  @property({ type: Boolean }) declare showTag?: boolean;
  @property({ type: String }) declare tagText?: string;
  @property({ type: String }) declare tagWidth?: string;
  @property({ type: String }) declare tagPadX?: string;

  @property({ type: String }) declare tagTextFontSize?: string;
  @property({ type: String }) declare tagTextFontWeight?: string;
  @property({ type: String }) declare tagTextFontFamily?: string;
  @property({ type: String }) declare tagTextColor?: string;
  @property({ type: String }) declare tagTextShadow?: string;
  @property({ type: String }) declare tagTextTransform?: string;
  @property({ type: String }) declare tagTextAlign?: string;
  @property({ type: String }) declare tagTextDelay?: string;

  @property({ type: Boolean }) declare isActive?: boolean;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--icon-button-comp-height, 60px);
      width: var(--icon-button-comp-width, fit-content);
      max-height: var(--icon-button-comp-height, 60px);
      max-width: var(--icon-button-comp-width, fit-content);
    }

    div {
      display: flex;
      align-items: center;
      aspect-ratio: 1 / 1;
      border: none;
      box-shadow: var(--icon-button-shadow, 0px 2px 5px #d0d0d0);
      border-radius: var(--icon-button-border-radius, 24px);
      background-color: var(--icon-button-bg-color, #eceff1);
      transition: width 0.5s ease;
      overflow: hidden;
    }

    div.size-by-height {
      height: var(--icon-button-size, 100%);
      max-height: var(--icon-button-size, 100%);
    }

    div.size-by-width {
      width: var(--icon-button-size, 100%);
    }

    div.has-tag:has(button:not(.active):hover) {
      aspect-ratio: none;
      width: var(--icon-button-tag-width, 300px);
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      border: none;
      border-radius: var(--icon-button-border-radius, 24px);
      background-color: var(--icon-button-bg-color, #eceff1);
      transition: background-color 0.3s;
      cursor: pointer;
    }

    button.active {
      background-color: var(--icon-button-active-bg-color, #cfd8dc);
    }

    button.size-by-height {
      height: 100%;
    }

    button.size-by-width {
      width: 100%;
    }

    button:hover {
      background-color: var(--icon-button-hover-bg-color, #b0bec5);
    }

    img {
      height: var(--icon-button-icon-size, 70%);
      aspect-ratio: 1 / 1;
    }

    span {
      display: flex;
      justify-content: var(--icon-button-tag-text-align, center);
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      opacity: 0;
      height: 100%;
      width: var(--icon-button-tag-width, 300px);
      padding-left: var(--icon-button-tag-padx, 10px);
      padding-right: var(--icon-button-tag-padx, 10px);
      pointer-events: none;
      font-size: var(--icon-button-tag-font-size, 20px);
      font-weight: var(--icon-button-tag-font-weight, bold);
      font-family: var(
        --icon-button-tag-font-family,
        "Helvetica",
        "Arial",
        sans-serif
      );
      text-shadow: var(--icon-button-tag-text-shadow, 0px 2px 5px #d0d0d0);
      color: var(--icon-button-tag-color, black);
      text-transform: var(--icon-button-tag-text-transform, none);
    }

    button:not(.active):hover + span {
      opacity: 1;
      transition: opacity 0.3s ease;
      transition-delay: var(--icon-button-tag-text-delay, 0.1s);
      pointer-events: none;
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

    update("compHeight", "--icon-button-comp-height", "60px");
    update("compWidth", "--icon-button-comp-width", "fit-content");

    update("buttonSize", "--icon-button-size", "100%");
    update("buttonBorderRadius", "--icon-button-border-radius", "24px");
    update("buttonColor", "--icon-button-bg-color", "#eceff1");
    update("buttonHoverColor", "--icon-button-hover-bg-color", "#B0BEC5");
    update("buttonActiveColor", "--icon-button-active-bg-color", "#cfd8dc");
    update("buttonShadow", "--icon-button-shadow", "0px 2px 5px #d0d0d0");
    update("iconSize", "--icon-button-icon-size", "70%");

    update("tagPadX", "--icon-button-tag-padx", "10px");
    update("tagWidth", "--icon-button-tag-width", "300px");

    update("tagTextFontSize", "--icon-button-tag-font-size", "20px");
    update("tagTextFontWeight", "--icon-button-tag-font-weight", "bold");
    update(
      "tagTextFontFamily",
      "--icon-button-tag-font-family",
      `'Helvetica', 'Arial', sans-serif`
    );
    update("tagTextColor", "--icon-button-tag-color", "black");
    update(
      "tagTextShadow",
      "--icon-button-tag-text-shadow",
      "0px 2px 5px #d0d0d0"
    );
    update("tagTextTransform", "--icon-button-tag-text-transform", "none");
    update("tagTextAlign", "--icon-button-tag-text-align", "center");
    update("tagTextDelay", "--icon-button-tag-text-delay", "0.1s");
  }

  render() {
    const sizeClass =
      this.sizeBy === "width" ? "size-by-width" : "size-by-height";
    const hasTagClass = this.showTag ? "has-tag" : "";
    const active = this.isActive ? "active" : "";

    return html`
      <div class="${hasTagClass} ${sizeClass} ">
        <button
          part="button"
          class="${sizeClass} ${active}"
          @click=${this.onClick}
        >
          ${this.iconSrc
            ? html`<img
                part="icon"
                src="${this.iconSrc}"
                alt="${this.iconAlt ?? "icon"}"
              />`
            : ""}
        </button>
        ${this.showTag
          ? html`<span part="tag-text">${this.tagText ?? ""}</span>`
          : ""}
      </div>
    `;
  }
}
