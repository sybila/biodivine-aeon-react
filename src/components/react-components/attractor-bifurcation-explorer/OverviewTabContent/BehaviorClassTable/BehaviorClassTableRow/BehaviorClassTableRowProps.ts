import type { BehaviorClassOperationsInt } from '../../../../../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';

export type BehaviorClassTableRowProps = {
  distribution: [number, number];
  interpretationCount: number;
  behaviorClassJSON: string;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
  textColor?: string;
};
