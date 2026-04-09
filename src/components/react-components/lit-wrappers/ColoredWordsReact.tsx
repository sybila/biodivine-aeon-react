import { createComponent } from '@lit/react';
import React from 'react';
import { ColoredWords } from '../../lit-components/colored-words';

const ColoredWordsReact = createComponent({
  tagName: 'colored-words',
  elementClass: ColoredWords,
  react: React,
});

export default ColoredWordsReact;
