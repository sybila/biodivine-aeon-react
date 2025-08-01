import { createComponent } from '@lit/react';
import { TextIconButton } from '../../lit-components/text-icon-button';
import React from 'react';

const TextIconButtonReact = createComponent({
  tagName: 'text-icon-button',
  elementClass: TextIconButton,
  react: React,
});

export default TextIconButtonReact;
