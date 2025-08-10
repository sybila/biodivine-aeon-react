import { createComponent } from '@lit/react';
import { LoadingWrapper } from '../../lit-components/loading-wrapper';
import React from 'react';

const LoadingWrapperReact = createComponent({
  tagName: 'loading-wrapper',
  elementClass: LoadingWrapper,
  react: React,
});

export default LoadingWrapperReact;
