import type { OverlayWindowState } from '../../../../stores/ContentOverlayWindow/OverlayWindowState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ContentOverlayWindowProps = {
  zIndex: string;
  overlayWindowStore: ZustandStore<OverlayWindowState>;
};
