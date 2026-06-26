import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type StyleProperty =
  | 'inputHeight'
  | 'inputWidth'
  | 'inputBorderColor'
  | 'inputBorderRadius'
  | 'inputColor'
  | 'textColor'
  | 'textFontSize'
  | 'textFontWeight'
  | 'textFontFamily'
  | 'componentZIndex'
  | 'containerGap'
  | 'suggListMinHeight'
  | 'suggListMaxHeight'
  | 'suggListWidth'
  | 'suggListBorderRadius'
  | 'suggListBgColor'
  | 'suggListOverflowY'
  | 'suggLineHeight'
  | 'suggFontSize'
  | 'suggFontWeight'
  | 'suggFontFamily'
  | 'suggItemBorderRadius'
  | 'suggPadding'
  | 'suggHoverBgColor';

@customElement('text-input-suggestions')
export class TextInputSuggestions extends LitElement {
  @property({ type: String }) declare inputHeight?: string;
  @property({ type: String }) declare inputWidth?: string;
  @property({ type: String }) declare inputBorderColor?: string;
  @property({ type: String }) declare inputBorderRadius?: string;
  @property({ type: String }) declare inputColor?: string;
  @property({ type: Function }) declare onWrite?: (value: string) => void;
  @property({ type: Function }) declare onSubmit?: (value: string) => void;

  @property({ type: String }) declare textColor?: string;
  @property({ type: String }) declare textFontSize?: string;
  @property({ type: String }) declare textFontWeight?: string;
  @property({ type: String }) declare textFontFamily?: string;

  @property({ type: String }) declare componentZIndex?: string;
  @property({ type: String }) declare containerGap?: string;

  @property({ type: String }) declare suggListMinHeight?: string;
  @property({ type: String }) declare suggListMaxHeight?: string;
  @property({ type: String }) declare suggListWidth?: string;
  @property({ type: String }) declare suggListBorderRadius?: string;
  @property({ type: String }) declare suggListBgColor?: string;
  @property({ type: String }) declare suggListOverflowY?: string;

  @property({ type: String }) declare suggLineHeight?: string;
  @property({ type: String }) declare suggFontSize?: string;
  @property({ type: String }) declare suggFontWeight?: string;
  @property({ type: String }) declare suggFontFamily?: string;

  @property({ type: String }) declare suggItemBorderRadius?: string;
  @property({ type: String }) declare suggPadding?: string;
  @property({ type: String }) declare suggHoverBgColor?: string;

  @property({ type: Function }) declare filterSuggPredicate?: (
    suggestion: string,
    currentInputStrings: Array<string>
  ) => boolean;
  @property({ type: Function }) declare filterSuggTextTransform?: (
    text: string
  ) => string;
  @property({ type: Function }) declare isSeparator?: (char: string) => boolean;

  @property({ type: String })
  declare placeholder?: string;
  @property({ type: String }) declare value?: string;
  @property({ type: Array }) declare suggestionStrings?: Array<string>;

  private isFocused = false;

  static styles = css`
    :host {
      display: block;
      height: var(--text-input-suggestions-height, 26px);
      width: var(--text-input-suggestions-width, 500px);
      overflow: visible;
      z-index: var(--text-input-suggestions-z-index, 100);
    }

    #container {
      display: flex;
      flex-direction: column;
      height: fit-content;
      width: fit-content;
      align-items: center;
      justify-content: start;
      gap: var(--text-input-suggestions-gap, 3px);
    }

    #text-input {
      display: block;
      height: var(--text-input-suggestions-height, 26px);
      width: var(--text-input-suggestions-width, 500px);
      box-sizing: border-box;
      border-color: var(--text-input-suggestions-border-color, #cfd8dc);
      border-radius: var(--text-input-suggestions-border-radius, 8px);
      background-color: var(--text-input-suggestions-background-color, #fafafa);
      color: var(--text-input-suggestions-text-color, #333);
      font-size: var(--text-input-suggestions-input-font-size, 14px);
      font-weight: var(--text-input-suggestions-input-font-weight, normal);
      font-family: var(
        --text-input-suggestions-input-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );
    }

    #suggestions-list {
      display: block;
      min-height: var(--text-input-suggestions-sugg-list-min-height, 16px);
      max-height: var(--text-input-suggestions-sugg-list-max-height, 200px);
      width: var(--text-input-suggestions-sugg-list-width, 495px);
      border-radius: var(
        --text-input-suggestions-sugg-list-border-radius,
        15px
      );
      background-color: var(
        --text-input-suggestions-sugg-list-bg-color,
        #eceff1
      );
      border: 1px solid #ddd;
      margin: 0;
      padding: 0;
      list-style: none;
      overflow-x: hidden;
      overflow-y: var(--text-input-suggestions-sugg-list-overflow-y, auto);
    }

    #suggestions-list li {
      height: fit-content;
      width: 100%;
      box-sizing: border-box;
      line-height: var(--text-input-suggestions-sugg-line-height, 28px);
      font-size: var(--text-input-suggestions-sugg-font-size, 18px);
      font-weight: var(--text-input-suggestions-sugg-font-weight, normal);
      font-family: var(
        --text-input-suggestions-sugg-font-family,
        'Helvetica',
        'Arial',
        sans-serif
      );

      border-radius: var(--text-input-suggestions-sugg-border-radius, 15px);
      padding: var(--text-input-suggestions-sugg-padding, 6px 10px);
      cursor: pointer;
    }

    #suggestions-list li:hover {
      background-color: var(
        --text-input-suggestions-sugg-hover-bg-color,
        white
      );
    }
  `;

  private writeHandler(event: KeyboardEvent) {
    const writenText = (event.target as HTMLInputElement).value;

    if (this.onWrite) {
      this.onWrite(writenText);
    }

    this.value = writenText;
  }

  private submitHandler(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.onSubmit) {
      this.onSubmit((event.target as HTMLInputElement).value);
    }
  }

  private updateStyleVariable(
    propertyName: StyleProperty,
    cssVar: string,
    fallback: string
  ) {
    const value = this[propertyName] ?? fallback;
    this.style.setProperty(cssVar, value);
  }

  private findLastChar(
    text: string,
    predicate: (char: string) => boolean
  ): number | undefined {
    for (let i = text.length - 1; i >= 0; i--) {
      if (predicate(text[i])) {
        return i;
      }
    }
    return undefined;
  }

  /** Select suggestion and use it to replace text written in text-input after the last separator. */
  private selectSuggestion(selectedSuggestion: string) {
    if (!this.isSeparator) {
      this.value = selectedSuggestion;
    } else {
      /** Find the first separator and after it insert the suggestion. */
      const currentVal = this.value ?? '';
      const lastSeparatorIndex = this.findLastChar(
        currentVal,
        this.isSeparator
      );

      if (lastSeparatorIndex === undefined) {
        this.value = selectedSuggestion;
      } else {
        this.value =
          currentVal.slice(0, lastSeparatorIndex + 1) +
          ' ' +
          selectedSuggestion;
      }
    }

    if (this.onWrite) {
      this.onWrite(this.value ?? '');
    }
  }

  /** Helper function which is used for separating text-input text by separator. */
  private splitByPredicate(
    text: string,
    isSeparator: (char: string) => boolean
  ): string[] {
    if (!text || text.length === 0) {
      return [''];
    }

    const result: string[] = [];
    let previouslySeparator: boolean = false;
    let current = '';

    for (const char of text) {
      if (isSeparator(char)) {
        previouslySeparator = true;
        if (current) result.push(current);
        current = '';
      } else {
        previouslySeparator = false;
        current += char;
      }
    }

    if (current || previouslySeparator) result.push(current);

    return result;
  }

  /** Getter which returns suggestions filtered by the current input of the text-input. */
  private get filteredSuggestions(): string[] {
    if (!this.isFocused || !this.suggestionStrings) return [];

    const textTransform =
      this.filterSuggTextTransform ?? ((s) => s.toLowerCase().trim());

    const text = this.value ?? '';

    const v = this.isSeparator
      ? this.splitByPredicate(text, this.isSeparator).map((s) =>
          textTransform(s)
        )
      : [textTransform(text)];

    if (!v || v.length < 1) return this.suggestionStrings;

    const suggSelectedSuggSet = new Set(v.slice(0, v.length - 1));

    const filterFunction = this.filterSuggPredicate
      ? this.filterSuggPredicate
      : (
          suggestion: string,
          inputedTextArray: Array<string>,
          alreadySearchedStrings: Set<string>
        ) => {
          // Do not include the suggestion if the suggestion is already in search or doesnt match text after the last separator.
          return (
            !alreadySearchedStrings.has(suggestion) &&
            suggestion.includes(inputedTextArray[inputedTextArray.length - 1])
          );
        };

    return this.suggestionStrings.filter((s) =>
      filterFunction(textTransform(s), v, suggSelectedSuggSet)
    );
  }

  public async focus() {
    await this.updateComplete;
    const input = this.renderRoot?.querySelector(
      'input'
    ) as HTMLInputElement | null;
    input?.focus();
  }

  private handleFocus() {
    this.isFocused = true;
    this.requestUpdate();
  }

  private handleBlur() {
    // small delay prevents click on suggestion from being blocked
    setTimeout(() => {
      this.isFocused = false;
      this.requestUpdate();
    }, 100);
  }

  updated(changed: Map<string, unknown>) {
    const update = (prop: StyleProperty, cssVar: string, fallback: string) =>
      changed.has(prop) && this.updateStyleVariable(prop, cssVar, fallback);

    // input
    update('inputHeight', '--text-input-suggestions-height', '26px');
    update('inputWidth', '--text-input-suggestions-width', '500px');
    update(
      'inputBorderColor',
      '--text-input-suggestions-border-color',
      '#cfd8dc'
    );
    update(
      'inputBorderRadius',
      '--text-input-suggestions-border-radius',
      '8px'
    );
    update(
      'inputColor',
      '--text-input-suggestions-background-color',
      '#fafafa'
    );

    // input text
    update('textColor', '--text-input-suggestions-text-color', '#333');
    update('textFontSize', '--text-input-suggestions-input-font-size', '14px');
    update(
      'textFontWeight',
      '--text-input-suggestions-input-font-weight',
      'normal'
    );
    update(
      'textFontFamily',
      '--text-input-suggestions-input-font-family',
      "'Helvetica', 'Arial', sans-serif"
    );

    // component

    update('componentZIndex', '--text-input-suggestions-z-index', '100');

    // container

    update('containerGap', '--text-input-suggestions-gap', '3px');

    // suggestion list
    update(
      'suggListMinHeight',
      '--text-input-suggestions-sugg-list-min-height',
      '16px'
    );
    update(
      'suggListMaxHeight',
      '--text-input-suggestions-sugg-list-max-height',
      '200px'
    );
    update(
      'suggListWidth',
      '--text-input-suggestions-sugg-list-width',
      '495px'
    );
    update(
      'suggListBorderRadius',
      '--text-input-suggestions-sugg-list-border-radius',
      '15px'
    );
    update(
      'suggListBgColor',
      '--text-input-suggestions-sugg-list-bg-color',
      '#eceff1'
    );
    update(
      'suggListOverflowY',
      '--text-input-suggestions-sugg-list-overflow-y',
      'auto'
    );

    // suggestion items
    update(
      'suggLineHeight',
      '--text-input-suggestions-sugg-line-height',
      '28px'
    );
    update('suggFontSize', '--text-input-suggestions-sugg-font-size', '18px');
    update(
      'suggFontWeight',
      '--text-input-suggestions-sugg-font-weight',
      'normal'
    );
    update(
      'suggFontFamily',
      '--text-input-suggestions-sugg-font-family',
      "'Helvetica', 'Arial', sans-serif"
    );
    update(
      'suggItemBorderRadius',
      '--text-input-suggestions-sugg-border-radius',
      '15px'
    );
    update('suggPadding', '--text-input-suggestions-sugg-padding', '6px 10px');
    update(
      'suggHoverBgColor',
      '--text-input-suggestions-sugg-hover-bg-color',
      'white'
    );
  }

  render() {
    return html`
      <div id="container" part="container">
        <input
          @focus=${() => this.handleFocus()}
          @blur=${() => this.handleBlur()}
          @keyup=${(e: KeyboardEvent) => this.writeHandler(e)}
          @keydown=${(e: KeyboardEvent) => this.submitHandler(e)}
          type="text"
          placeholder=${this.placeholder ?? ''}
          .value=${this.value ?? ''}
          id="text-input"
          part="text-input"
        />

        ${this.filteredSuggestions.length
          ? html`
              <ul id="suggestions-list" part="suggestions-list">
                ${this.filteredSuggestions.map(
                  (s) => html`
                    <li @click=${() => this.selectSuggestion(s)}>${s}</li>
                  `
                )}
              </ul>
            `
          : null}
      </div>
    `;
  }
}
