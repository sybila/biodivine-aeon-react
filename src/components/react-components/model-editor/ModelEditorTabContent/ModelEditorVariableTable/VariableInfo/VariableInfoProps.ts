import type { Variable } from '../../../../../../types';

export type VariableInfoProps = Variable & {
  hover: boolean;
  selected: boolean;
};
