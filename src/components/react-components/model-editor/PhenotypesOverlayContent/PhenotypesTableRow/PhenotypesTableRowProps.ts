import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type PhenotypesTableRowProps = {
  phenotypeId: number;
  phenotypeName: string;
  isSelected: boolean;
  changeActivePhenotype: (id: number) => void;
  handleChange?: (newName: string) => string | undefined;
  handleSubmit?: (newName: string) => string | undefined;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
