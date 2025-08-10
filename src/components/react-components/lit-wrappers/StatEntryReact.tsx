import { createComponent } from '@lit/react';
import { StatEntry } from '../../lit-components/stat-entry';
import React from 'react';

const StatEntryReact = createComponent({
  tagName: 'stat-entry',
  elementClass: StatEntry,
  react: React,
});

export default StatEntryReact;
