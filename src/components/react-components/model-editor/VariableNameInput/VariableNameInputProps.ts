import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type VariableNameInputProps = {
  height: string;
  width: string;
  fontSize: string;
  varId: number;
  varName: string;
  onUpdate: (id: number, newName: string) => boolean;
};
