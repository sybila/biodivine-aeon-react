import { createComponent } from '@lit/react';
import { PageSelector } from '../../lit-components/page-selector';
import React from 'react';

const PageSelectorReact = createComponent({
  tagName: 'page-selector',
  elementClass: PageSelector,
  react: React,
});

export default PageSelectorReact;
