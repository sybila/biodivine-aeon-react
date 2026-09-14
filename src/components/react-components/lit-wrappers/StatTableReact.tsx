import { createComponent } from '@lit/react';
import React from 'react';
import { StatTable } from '../../lit-components/stat-table';

const StatTableReact = createComponent({
  tagName: 'stat-table',
  elementClass: StatTable,
  react: React,
});

export default StatTableReact;
