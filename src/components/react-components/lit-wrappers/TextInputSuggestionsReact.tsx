import { createComponent } from '@lit/react';
import React from 'react';
import { TextInputSuggestions } from '../../lit-components/text-input-suggestions';

const TextInputSuggestionsReact = createComponent({
  tagName: 'text-input-suggestions',
  elementClass: TextInputSuggestions,
  react: React,
});

export default TextInputSuggestionsReact;
