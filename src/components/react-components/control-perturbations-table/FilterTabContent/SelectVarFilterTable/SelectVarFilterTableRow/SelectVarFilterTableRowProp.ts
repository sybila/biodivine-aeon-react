import type { PertVariableFilterStatus } from '../../../../../../types';

export type SelectVarFilterTableRowProp = {
  varName: string;
  isSelected: boolean;
  toggleSelect: (varName: string) => void;
  pertStatus: PertVariableFilterStatus;
};
