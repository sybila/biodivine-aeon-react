import type { ReactNode } from 'react';

export type SectionWithDotHeaderProps = {
  height?: string;
  width?: string;

  text: string;
  children?: ReactNode;

  textColor?: string;
};
