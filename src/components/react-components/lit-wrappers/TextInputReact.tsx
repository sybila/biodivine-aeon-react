import { createComponent } from '@lit/react';
import { TextInput } from '../../lit-components/text-input';
import React from 'react';

const TextInputReact = createComponent({
  tagName: 'text-input',
  elementClass: TextInput,
  react: React,
});

export default TextInputReact;
