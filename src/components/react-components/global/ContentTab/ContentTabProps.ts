import type { ReactNode } from 'react';

export interface ContentTabProps {
  children?: ReactNode;
  headerText?: string;
  showTab?: boolean;
  /** True if is used with the TopButtonMenu component, affects positioning of the menu */
  spaceOnTop?: boolean;
  onClose: () => void;
}
