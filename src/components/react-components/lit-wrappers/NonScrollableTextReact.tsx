import { createComponent } from '@lit/react';
import React from 'react';
import { NonScrollableText } from '../../lit-components/non-scrollable-text';

const NonScrollableTextReact = createComponent({
  tagName: 'non-scrollable-text',
  elementClass: NonScrollableText,
  react: React,
});

export default NonScrollableTextReact;
