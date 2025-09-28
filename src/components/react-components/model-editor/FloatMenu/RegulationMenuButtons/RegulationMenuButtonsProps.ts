import type { RegulationVariables } from '../../../../../types';

export type RegulationMenuButtonsProps = {
  setHint: (text: string) => void;
  selectedRegulationIds: RegulationVariables;
};
