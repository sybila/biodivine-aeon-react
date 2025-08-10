import { createComponent } from '@lit/react';
import { InvisibleInput } from '../../lit-components/invisible-input';
import React from 'react';

const InvisibleInputReact = createComponent({
  tagName: 'invisible-input',
  elementClass: InvisibleInput,
  react: React,
});

export default InvisibleInputReact;
