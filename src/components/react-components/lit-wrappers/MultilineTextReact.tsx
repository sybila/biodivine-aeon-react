import { createComponent } from '@lit/react';
import React from 'react';
import { MultilineText } from '../../lit-components/multiline-text';

const MultilineTextReact = createComponent({
  tagName: 'multiline-text',
  elementClass: MultilineText,
  react: React,
});

export default MultilineTextReact;
