import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type SelectionButtonsProps<T extends string | number> = {
  keys: T[];
  selectedVariables: Set<T>;
  setSelectedVariables: (selectedVariables: Set<T>) => void;
  /** Size of the buttons border radius in the form of Css length (e.g. '8px', '0.5rem') */
  buttonBorderRadius?: string;
  /** Size of the buttons in the form of Css length (e.g. '29px', '1.5rem') */
  buttonSize?: string;

  stringProviderServ: StringProviderInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
