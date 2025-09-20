import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('value-slider')
export class ValueSlider extends LitElement {
  @property({ type: String }) declare compHeight?: string;
  @property({ type: String }) declare compWidth?: string;

  @property({ type: String }) declare bodyHeight?: string;
  @property({ type: String }) declare bodyWidth?: string;
  @property({ type: String }) declare bodyBackgroundColor?: string;
  @property({ type: String }) declare bodyBorderRadius?: string;

  @property({ type: String }) declare sliderThumbHeight?: string;
  @property({ type: String }) declare sliderThumbWidth?: string;
  @property({ type: String }) declare sliderThumbBackgroundColor?: string;
  @property({ type: String }) declare sliderThumbBorderRadius?: string;

  @property({ type: Function }) declare handleChange?: (value: number) => void;
  @property({ type: Function }) declare handleInput?: (value: number) => void;

  @property({ type: Number }) declare value?: number;
  @property({ type: Number }) declare minValue?: number;
  @property({ type: Number }) declare maxValue?: number;
  @property({ type: Number }) declare step?: number;

  static styles = css`
    :host {
      display: inline-block;
      height: var(--value-slider-comp-height, 25px);
      width: var(--value-slider-comp-width, 100px);
      max-height: var(--value-slider-comp-height, 25px);
      max-width: var(--value-slider-comp-width, 100px);
    }

    #slider {
      -webkit-appearance: none; /* Override default CSS styles */
      appearance: none;
      width: var(--value-slider-body-width, 100%); /* Full-width */
      height: var(--value-slider-body-height, 100%); /* Specified height */
      background: var(
        --value-slider-body-background-color,
        #d3d3d3
      ); /* Grey background */
      outline: none; /* Remove outline */
      opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
      -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
      transition: opacity 0.2s;
      border-radius: var(--value-slider-body-border-radius, 4px);
    }

    /* Mouse-over effects */
    #slider:hover {
      opacity: 1; /* Fully shown on mouse-over */
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    #slider::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      width: var(
        --value-slider-thumb-width,
        25px
      ); /* Set a specific slider handle width */
      height: var(--value-slider-thumb-height, 25px); /* Slider handle height */
      background: var(
        --value-slider-thumb-background-color,
        #3a568c
      ); /* Blue background */
      cursor: pointer; /* Cursor on hover */
      border-radius: var(--value-slider-thumb-border-radius, 4px);
    }

    #slider::-moz-range-thumb {
      width: var(
        --value-slider-thumb-width,
        25px
      ); /* Set a specific slider handle width */
      height: var(--value-slider-thumb-height, 25px); /* Slider handle height */
      background: var(
        --value-slider-thumb-background-color,
        #3a568c
      ); /* Blue background */
      cursor: pointer; /* Cursor on hover */
      border-radius: var(--value-slider-thumb-border-radius, 4px);
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

    update('compHeight', '--value-slider-comp-height', '25px');
    update('compWidth', '--value-slider-comp-width', '100px');

    update('bodyHeight', '--value-slider-body-height', '100%');
    update('bodyWidth', '--value-slider-body-width', '100%');
    update(
      'bodyBackgroundColor',
      '--value-slider-body-background-color',
      '#d3d3d3'
    );
    update('bodyBorderRadius', '--value-slider-body-border-radius', '4px');

    update('sliderThumbHeight', '--value-slider-thumb-height', '25px');
    update('sliderThumbWidth', '--value-slider-thumb-width', '25px');

    update(
      'sliderThumbBackgroundColor',
      '--value-slider-thumb-background-color',
      '#3a568c'
    );
    update(
      'sliderThumbBorderRadius',
      '--value-slider-thumb-border-radius',
      '4px'
    );
  }

  private changeHandler(event: Event) {
    if (this.handleChange) {
      const numberValue = Number((event.target as HTMLInputElement).value);

      if (!isNaN(numberValue)) {
        this.handleChange(numberValue);
      }
    }
  }

  private inputHandler(event: Event) {
    if (this.handleInput) {
      const numberValue = Number((event.target as HTMLInputElement).value);

      if (!isNaN(numberValue)) {
        this.handleInput(numberValue);
      }
    }
  }

  render() {
    return html`
      <input
        id="slider"
        part="slider"
        type="range"
        .value=${this.value ?? 0}
        .min=${this.minValue ?? 0}
        .max=${this.maxValue ?? 100}
        .step=${this.step ?? 1}
        @change=${this.changeHandler}
        @input=${this.inputHandler}
      />
    `;
  }
}
