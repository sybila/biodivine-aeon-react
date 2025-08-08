import { createComponent } from '@lit/react';
import { LoadingIndicator } from '../../lit-components/loading-indicator';
import React from 'react';

const LoadingIndicatorReact = createComponent({
  tagName: 'loading-indicator',
  elementClass: LoadingIndicator,
  react: React,
});

export default LoadingIndicatorReact;
