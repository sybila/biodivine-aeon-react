import type { Regulation } from '../../../../../../../types';

export type RegulationInfoProps = Regulation & {
  hover: boolean;
  selected: boolean;
};
