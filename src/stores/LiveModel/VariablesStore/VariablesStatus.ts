import type { Variable } from '../../../types';

export type VariablesStatus = {
  variables: Record<number, Variable>;
  nameToId: Record<string, number>;
  addVariable: (variable: Variable) => number;
  removeVariable: (id: number, force?: boolean) => void;
  renameVariable: (id: number, newName: string) => string | undefined;
  getAllVariables: () => Variable[];
  isEmpty: () => boolean;
  getVariableName: (id: number) => string | undefined;
  variableFromId: (id: number) => Variable | undefined;
  variableFromName: (name: string) => Variable | undefined;
  clear: () => void;
};
