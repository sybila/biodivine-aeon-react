import type { RegulationVariables, Variable } from '../../../../../../types';

export type VariableInfoProps = Variable & {
  hoverVariable: boolean;
  selectedVariable: boolean;
  hoverRegulation: RegulationVariables | undefined;
  selectedRegulation: RegulationVariables | undefined;
};
