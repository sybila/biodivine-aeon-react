export type Variable = {
  id: number;
  name: string;
};

export type Position = [number, number];

export type UpdateFunctionMetadata = {
  parameters: Set<{ name: string; cardinality: number }>;
};

export type UpdateFunction = {
  functionString: string;
  metadata: UpdateFunctionMetadata;
};

// #region --- Edge/Regulation ---

export type RegulationVariables = {
  regulator: number;
  target: number;
};

export type Regulation = RegulationVariables & {
  observable: boolean;
  monotonicity: EdgeMonotonicity;
};

export type EdgeMonotonicity = 'unspecified' | 'activation' | 'inhibition';

export const EdgeMonotonicity = {
  unspecified: 'unspecified' as EdgeMonotonicity,
  activation: 'activation' as EdgeMonotonicity,
  inhibition: 'inhibition' as EdgeMonotonicity,
};

// #endregion

export type ModelStats = {
  maxInDegree: number;
  maxOutDegree: number;
  variableCount: number;
  parameterVariables: number;
  regulationCount: number;
  explicitParameters: string[];
};

export type ComputationModes = 'Attractor Analysis' | 'Control';

export type fileType = '.aeon' | '.sbml' | '.bnet';

// #region --- Control ---

export type Phenotype = boolean | null;

export type ControlInfo = {
  controlEnabled: boolean;
  phenotype: Phenotype;
};

export type ControlStats = {
  controlEnabled: number;
  notControlEnabled: number;
  inPhenotypeTrue: number;
  inPhenotypeFalse: number;
  notInPhenotype: number;
};

export type ControlComputationParams = {
  minRobustness: number;
  maxSize: number | undefined;
  maxNumberOfResults: number;
};

export type Oscillation = 'allowed' | 'forbidden' | 'required';

export type ControlComputationStats = {
  allColorsCount: number;
  perturbationCount: number;
  minimalPerturbationSize: number;
  maximalPerturbationRobustness: number;
  elapsed: number;
};

export type Perturbation = Record<string, number>;

export type ControlResult = {
  color_count: number;
  robustness: number;
  perturbation: Perturbation;
};

export type ControlResults = {
  perturbations: Array<ControlResult>;
  stats: ControlComputationStats;
};

// #endregion

// #region --- Attractor Analysis ---

export type AttractorBehavior = 'Stability' | 'Oscillation' | 'Disorder';

export type AttractorResult = {
  sat_count: number;
  phenotype: Array<AttractorBehavior>;
};

export type AttractorResults = {
  isPartial: boolean;
  data: Array<AttractorResult>;
  elapsed: number;
};

// #endregion

// #region --- Navigation Tabs ---

export type TabType = 'Model Editor' | 'Attractor Bifurcation Explorer';

export type TabInfo = {
  /** Unique identifier for the tab */
  id: number;
  /** Type of the tab */
  type: TabType;
  /** Path of the tab */
  path: string;
  /** Indicates if the tab is currently active */
  active: boolean;
};

// #endregion

// #region --- Bifurcation Explorer ---

export type AttractorClassBE = {
  cardinality: number;
  class: string;
};

export type NodeDataBE = {
  id: number;
  attribute_name?: string;
  cardinality: number;
  class?: string;
  classes?: Array<AttractorClassBE>;
  left?: number;
  right?: number;
  type: NodeTypeBE;
};

export type NodeTypeBE = 'unprocessed' | 'decision' | 'leaf';

export type NodeSubTypeBE = 'stability' | 'disorder' | 'oscillation';

export type CytoscapeNodeDataBE = {
  id: string;
  targetId?: string;
  label?: string;
  opacity?: number;
  treeData?: NodeDataBE;
  type?: NodeTypeBE;
  subtype?: NodeSubTypeBE;
  action?: 'remove';
};

export type DecisionMixedNode = {
  id: number;
  label: string;
  type: 'decision' | 'unprocessed';
  cardinality: number;
  classes: Array<AttractorClassBE>;
};

export type VariableStability = {
  colors: number;
  vector: Array<string>;
};

export type StabilityAnalysisVariable = {
  variable: string;
  data: Array<VariableStability>;
};

export type StabilityAnalysisModes = 'total' | 'S' | 'O' | 'D';

// #endregion
export type TimestampResponse = {
  timestamp: number | undefined;
};

export type ComputationStatus = {
  status: string;
  /** Indicates if the computation is currently running */
  running: boolean;
  /**
   * Time information for the computation.
   * - If there's an error: undefined or -1.
   * - If computation is running: contains elapsed time.
   */
  timestamp?: number | undefined;
  computationMode?: ComputationModes;
  additionalInfo?: Array<string>;
};
