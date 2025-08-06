import { createComponent } from '@lit/react';
import { NonExtendableContent } from '../../lit-components/non-extendable-content';
import React from 'react';

const NonExtendableContentReact = createComponent({
  tagName: 'non-extendable-content',
  elementClass: NonExtendableContent,
  react: React,
});

export default NonExtendableContentReact;
