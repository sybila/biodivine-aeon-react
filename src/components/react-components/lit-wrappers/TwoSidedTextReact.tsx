import { createComponent } from '@lit/react';
import { TwoSidedText } from '../../lit-components/two-sided-text';
import React from 'react';

const TwoSidedTextReact = createComponent({
  tagName: 'two-sided-text',
  elementClass: TwoSidedText,
  react: React,
});

export default TwoSidedTextReact;
