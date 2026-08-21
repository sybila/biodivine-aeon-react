import { createComponent } from '@lit/react';
import React from 'react';
import { SemitransparentOverlayWindow } from '../../lit-components/semitransparent-overlay-window';

const SemitransparentOverlayWindowReact = createComponent({
  tagName: 'semitransparent-overlay-window',
  elementClass: SemitransparentOverlayWindow,
  react: React,
});

export default SemitransparentOverlayWindowReact;
