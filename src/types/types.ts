export type Variable = {
  id: number;
  name: string;
};

export type Position = [number, number];

// #region --- Model Editor Status ---

/** Possible Menus for the Model Editor page without null */
export type MenuTabTypeMENotNull =
  | 'Start Computation'
  | 'Import/Export'
  | 'Export Witness'
  | 'Model Editor'
  | 'Control-Enabled Editor'
  | 'Phenotype Editor'
  | 'Text Editor'
  | 'Visual Options'
  | 'Help';

/** Possible Menus for the Model Editor page */
export type MenuTabTypeME = MenuTabTypeMENotNull | null;

/** Set containing variable ids. */
export type VariableIdSet = Set<number>;

/** A record mapping each target variable id to a set of regulator variable ids */
export type RegulationRecord = Record<number, Set<number>>;

export type ModelEditorItems = {
  variables: VariableIdSet;
  regulations: RegulationRecord;
};

export type ModelEditorVariable = { type: 'variable'; id: number };

export type ModelEditorRegulation = {
  type: 'regulation';
  regulationIds: RegulationVariables;
};

export type ModelEditorItem = ModelEditorVariable | ModelEditorRegulation;

// #endregion

// #region --- Update Function ---

export type UpdateFunctionMetadata = {
  parameters: Set<{ name: string; cardinality: number }>;
};

export type UpdateFunction = {
  functionString: string;
  metadata: UpdateFunctionMetadata;
};

export type UpdateFunctionStatus = { status: string; isError: boolean };

// #endregion

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

// #region --- Models ---

export type ModelStats = {
  maxInDegree: number;
  maxOutDegree: number;
  variableCount: number;
  parameterVariables: number;
  regulationCount: number;
  explicitParameters: string[];
};

export type ModelType = 'main' | 'witness';

export type ModelSave = {
  id: number;
  type: ModelType;
  modelAeonString: string;
};

export type ModelObject = {
  model: string;
};

// #endregion

// #region --- Control ---

// export type Phenotype = boolean | null;

export const IN_PHENOTYPE_STATUS = {
  InPhenotypeTrue: 0,
  InPhenotypeFalse: 1,
} as const;

export const PHENOTYPE_STATUS = {
  ...IN_PHENOTYPE_STATUS,
  NotInPhenotype: 2,
} as const;

type IN_PHENOTYPE_STATUS =
  (typeof IN_PHENOTYPE_STATUS)[keyof typeof IN_PHENOTYPE_STATUS];

type PHENOTYPE_STATUS =
  (typeof PHENOTYPE_STATUS)[keyof typeof PHENOTYPE_STATUS];

export type PhenotypeStatus =
  (typeof PHENOTYPE_STATUS)[keyof typeof PHENOTYPE_STATUS];

export type ControlInfo = {
  controlEnabled: boolean;
  phenotype: PhenotypeStatus;
};

export type PhenotypeNoId = {
  name: string;
  variables: Record<number, PhenotypeStatus>;
};

export type Phenotype = PhenotypeNoId & { id: number };

export type ControlEnabledStats = {
  controlEnabled: number;
  notControlEnabled: number;
};

export type PhenotypeStats = {
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

export type Perturbation = Record<string, boolean>;

export type ControlEnabledVars = Array<string>;

export type PhenotypeVars = Record<string, IN_PHENOTYPE_STATUS>;

export type PhenotypeControlEnabledVars = {
  controlEnabledVars: ControlEnabledVars;
  phenotypeVars: PhenotypeVars;
};

export type ControlPreComputationInfo = PhenotypeControlEnabledVars & {
  oscillation: Oscillation;
};

export type ControlResultNoId = {
  color_count: number;
  robustness: number;
  perturbation: Perturbation;
};

export type ControlResult = ControlResultNoId & {
  id: number;
};

export type ControlResults = {
  perturbations: Array<ControlResult>;
  stats: ControlComputationStats;
  preComputationInfo: ControlPreComputationInfo;
};

export type PerturbationSortFields = 'id' | 'size' | 'interpretations';

export type SortDirection = 'asc' | 'desc';

export type PertTableSort = {
  field: PerturbationSortFields;
  direction: SortDirection;
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

export type TabType =
  | 'Model Editor'
  | 'Attractor Bifurcation Explorer'
  | 'Attractor Visualizer'
  | 'Witness'
  | 'Control Perturbations Table';

export type PossibleTabsTypes = TabType | ComputationModes | string;

export type PossibleTabIds = number | ComputationModes | string;

export type TabInfo<T extends PossibleTabsTypes, R extends PossibleTabIds> = {
  /** Unique identifier for the tab */
  id: R;
  /** Type of the tab */
  type: T;
  /** Path of the tab */
  path: string;
  /** Callback function to be executed when the tab is clicked */
  onClick?: () => void;
  /** Callback function to be executed when the tab is left */
  onLeave?: () => void;
  /** Callback function to be executed when the tab is removed/closed */
  onClose?: () => void;
  /** Indicates if the tab is currently active */
  active: boolean;
  text: string;
};

// #endregion

// #region --- Bifurcation Explorer ---

/** Tab type for the Attractor Bifurcation Explorer */
export type MenuTabTypeABE =
  | 'Overview'
  | 'Stability Analysis'
  | 'Make Decision'
  | 'Visual Options'
  | 'Help'
  | null;

/** Possible Node Stability Analysis Modes */
export type FullStabilityAnalysisMode =
  | 'Total'
  | 'Stability'
  | 'Oscillation'
  | 'Disorder';

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
  all_classes?: Array<AttractorClassBE>;
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

export type LeafNode = {
  id: number;
  label: string;
  type: 'leaf';
  cardinality: number;
  class: string;
  classes?: Array<AttractorClassBE>;
};

export type DecisionMixedNode = {
  id: number;
  label: string;
  type: 'decision' | 'unprocessed';
  cardinality: number;
  classes: Array<AttractorClassBE>;
};

export type NodeStabilityData = {
  computedBehavior: StabilityAnalysisModes;
  stabilityAnalysis: Array<StabilityAnalysisVariable>;
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

export type DecisionBehaviorClass = {
  cardinality: number;
  class: string;
  fraction: number;
};

export type Decision = {
  id: number;
  name: string;
  gain: number;
  left: Array<DecisionBehaviorClass>;
  leftTotal: number;
  right: Array<DecisionBehaviorClass>;
  rightTotal: number;
};

export type Decisions = Array<Decision>;

export type NodeNecessaryConditions = Array<{
  name: string;
  positive: boolean;
}>;

// #endregion

// #region --- Attractor Visualizer ---

export type VisEdge = {
  arrows?: { to: { enabled: boolean } };
  color?: { color: string; opacity: number };
  from: string;
  to: string;
  id: string;
  length?: number;
};

export type VisNode = {
  id: string;
  label: string;
  font?: { face: string; size: number };
  labelHighlightBold?: boolean;
  opacity?: number;
};

export type VisGraphData = {
  nodes: Array<VisNode>;
  edges: Array<VisEdge>;
};

export type AttractorVisualizerAttractor = {
  class: AttractorBehavior;
  edges: number;
  graph: Array<[string, string]>;
  vis: VisGraphData;
};

export type AttractorVisualizerInput = {
  nodeId?: number;
  variableName?: string;
  behavior?: string;
  vector?: string[];
};

export type AttractorData = {
  attractors: AttractorVisualizerAttractor[];
  model: string;
  variables: string[];
  /** List of witness update functions in a form [variableName, updateFunction] */
  witness: Array<[string, string]>;
  has_large_attractors: boolean;
};

// #endregion

// #region --- Control Perturbations Table ---

export const PertVariableFilterStatus = {
  IN_FILTER_PERTURBED: 1,
  IN_FILTER_POSITIVELY_PERTURBED: 2,
  IN_FILTER_NEGATIVELY_PERTURBED: 3,
};

export type PertVariableFilterStatus =
  (typeof PertVariableFilterStatus)[keyof typeof PertVariableFilterStatus];

// #endregion

// #region --- Trap Space Succession Diagram ---

export type MenuTabTypeTrapSpaceSD = 'Overview' | 'Make Decision' | null;

export type NodeDataTSSD = {
  id: number;
  /** Maps variable ids (keys) to state of variable. If variable state is undefined, it means the variable is free (unpercolated). */
  variableValues: Record<string, number | undefined>;
  /** Number of interpretations for which this node is valid */
  cardinality: number;
  /** Ids of nodes which are children of this node */
  childNodeIds: number[];
  type: NodeTypeTSSD;
};

export type VisualizationNodeDataTSSD = {
  id: string;
  label: string;
  action: 'remove';
  treeData: NodeDataTSSD;
  type: NodeTypeTSSD;
};

export type NodeTypeTSSD = 'decision' | 'leaf';

export type DecisionTSSD = {
  id: number;
  /** Maps variable ids (keys) to state of variable. If variable state is undefined, it means the variable is free (unpercolated). */
  variableValues: Record<string, number | undefined>;
  numberOfInterpretations: number;
};

export type DecisionsTSSD = Array<DecisionTSSD>;

// #endregion

// #region --- Visual Options ---

export type VisualOptionsButtonSection = {
  headerText: string;
  buttons: Array<[string, () => void, (e: React.MouseEvent) => void, boolean]>;
};

export type VisualOptionsSwitchableABE = {
  animate: boolean;
  snapLayers: boolean;
  positiveOnLeft: boolean;
};

// #endregion

// #region --- Computation ---

export type ComputationModes = 'Attractor Analysis' | 'Control';

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

// #endregion

// #region --- Files ---

export type fileType = '.aeon' | '.sbml' | '.bnet';

// #endregion

// #region --- Warnings ---

export type TextButton = {
  text: string;
  buttonWidth?: string;
  action: () => void;
};

export type Warning = {
  message: string;
  buttons: Array<TextButton>;
  nextWarning: Warning | null;
};

// #endregion

// #region --- Results Status ---

export type Results = AttractorResults | ControlResults;

export type TimestampedResultsMode = {
  mode: ComputationModes;
  timestamp: number | undefined;
};

// #endregion

// #region --- Undo/Redo ---

/** Functions for undoing/redoing of operation.
 *  The `undo` function should revert the last operation, while the `redo` function should re-apply the last undone operation.
 */
export type UndoRedoFunctions = {
  undo: () => void;
  redo: () => void;
};

// #endregion

// #region --- Visualization Status ---

export type VisualizationStatus = {
  pan: { x: number; y: number };
  zoom: VisualizationZoomStatus;
};

export type VisualizationZoomStatus = {
  minZoom: number;
  maxZoom: number;
  currentZoom: number;
};

// #endregion

// #region --- Global Components ---

/** Type for button which opens tab menu. */
export type MenuTabButton = HTMLElement & { isActive: boolean };

/** Type for components which have content visible attribute for changing visibility. */
export type ContentVisibleComponent = HTMLElement & { contentVisible: boolean };

// #endregion
