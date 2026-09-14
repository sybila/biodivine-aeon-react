import { createComponent } from '@lit/react';
import React from 'react';
import { HorizontalHidableContent } from '../../lit-components/horizontal-hidable-content';

const HorizontalHidableContentReact = createComponent({
  tagName: 'horizontal-hidable-content',
  elementClass: HorizontalHidableContent,
  react: React,
});

export default HorizontalHidableContentReact;
