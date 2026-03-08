import type { ReactNode } from 'react';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type NavigationDockContentProps = {
  helpHoverStore: ZustandStore<HelpHoverState>;
  children?: ReactNode;
  handleResultsClick?: () => void;
  handleComputeEngineClick?: () => void;
  setNavBarHelpHover?: (event: MouseEvent, text: string) => void;
};
