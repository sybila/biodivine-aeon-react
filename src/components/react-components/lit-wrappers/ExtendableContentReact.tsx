import { createComponent } from '@lit/react';
import { ExtendableContent } from '../../lit-components/extendable-content';
import React from 'react';

const ExtendableContentReact = createComponent({
  tagName: 'extendable-content',
  elementClass: ExtendableContent,
  react: React,
});

export default ExtendableContentReact;
