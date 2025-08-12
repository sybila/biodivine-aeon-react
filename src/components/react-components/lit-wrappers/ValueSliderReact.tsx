import { createComponent } from '@lit/react';
import { ValueSlider } from '../../lit-components/value-slider';
import React from 'react';

const ValueSliderReact = createComponent({
  tagName: 'value-slider',
  elementClass: ValueSlider,
  react: React,
});

export default ValueSliderReact;
