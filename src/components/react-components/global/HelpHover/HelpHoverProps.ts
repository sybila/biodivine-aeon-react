import type { HelpHoverState } from "../../../../stores/HelpHover/HelpHoverState";
import type { ZustandStore } from "../../../../stores/ZustandStoreType";

export type HelpHoverProps = {
  zIndex: number;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
