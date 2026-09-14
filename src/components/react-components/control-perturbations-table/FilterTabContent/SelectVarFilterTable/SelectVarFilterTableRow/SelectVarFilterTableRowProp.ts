import type { PertVariableFilterStatus } from '../../../../../../types/types';

export type SelectVarFilterTableRowProp = {
  varName: string;
  isSelected: boolean;
  toggleSelect: (varName: string) => void;
  pertStatus: PertVariableFilterStatus;
};
