export type Variable = {
  id: number;
  name: string;
  controllable: boolean;
  phenotype: boolean | null;
};

export type Position = [number, number];

export type Phenotype = boolean | null;

export type UpdateFunctionMetadata = {
  parameters: Set<{ name: string; cardinality: number }>;
};

export type UpdateFunction = {
  functionString: string;
  metadata: UpdateFunctionMetadata;
};

export type Regulation = {
  regulator: number;
  target: number;
  observable: boolean;
  monotonicity: EdgeMonotonicity;
};

export type EdgeMonotonicity = 'unspecified' | 'activation' | 'inhibition';

export const EdgeMonotonicity = {
  unspecified: 'unspecified' as EdgeMonotonicity,
  activation: 'activation' as EdgeMonotonicity,
  inhibition: 'inhibition' as EdgeMonotonicity,
};

export type ModelStats = {
  maxInDegree: number;
  maxOutDegree: number;
  variableCount: number;
  parameterVariables: number;
  regulationCount: number;
  explicitParameters: string[];
};

export type ComputationModes = 'Attractor Analysis' | 'Control';

export type ControlStats = {
  controlEnabled: number;
  notControlEnabled: number;
  inPhenotypeTrue: number;
  inPhenotypeFalse: number;
  notInPhenotype: number;
};

export type pingInfo = {
  timestamp: number | undefined;
  
}

export type ComputationStatus = {
  status: string;
  /** timestamp of the computation, if there is error is set to undefined */
  timestamp?: number | undefined;
  computationMode?: ComputationModes;
  additionalInfo?: Array<string>;
}