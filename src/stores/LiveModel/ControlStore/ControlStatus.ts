import type {
  ControlEnabledStats,
  ControlInfo,
  Phenotype,
  PhenotypeStats,
} from '../../../types';

/** Zustand store for managing control information of variables in LiveModel
 Provides actions for adding, removing, updating, and querying control info and phenotypes */
export type ControlStatus = {
  /** Property containing control-enabled status information for each variable. */
  controlEnabled: Record<number, boolean>;

  /** Property containing currently selected phenotype. */
  currentPhenotype: {
    id: number;
    name: string;
    variables: Record<number, Phenotype>;
  };
  /** Property containing phenotype status information for each variable. */
  phenotypes: Record<
    number,
    { name: string; variables: Record<number, Phenotype> }
  >;

  /** Adds control information for a variable. */
  addInfo: (id: number, controlInfo: ControlInfo) => number;
  /** Removes all control information (accross all phenotypes) for a variable.
   */
  removeInfo: (id: number) => void;

  /** Function which swithes the currently active phenotype (currentPhenotype).
   *  @param id (number) - id of the phenotype which should be active
   *  @returns if succesful returns id of the newly created phenotype, else if phenotype with id doesn't exist returns undefined.
   */
  switchPhenotype: (id: number) => number | undefined;
  /** Creates new empty phenotype and makes it currently active.
   *  @param name (string) - name of the phenotype.
   *  @returns if succesful returns id of the newly created phenotype, else returns undefined if the phenotype with this name already exists.
   */
  createPhenotype: (name: string) => number | undefined;
  /** Removes phenotype and makes it currently active.
   *  @param id (number) - id of the phenotype which should be removed
   *  @returns if succesful returns id of the removed phenotype, else returns undefined if the phenotype cannot be removed (ex. is default phenotype).
   */
  removePhenotype: (id: number) => number | undefined;

  /** Retrieves control-enabled status of all variables without their ids. */
  getAllControlEnabled: () => boolean[];
  /** Retrieves control-enabled status of all variables with their corresponding IDs.
   *  @returns [id, boolean] - An array of tuples, where each tuple contains the variable ID and its control-enabled status.
   */
  getAllControlEnabledIds: () => Array<[number, boolean]>;
  /** Sets the control enabled state for a variable. */
  setControlEnabled: (id: number, controlEnabled: boolean) => void;
  /** Retrieves phenotype status of all variables in the currently selected phenotype (without ids of the variables). */
  getAllCurrentPhenotype: () => Phenotype[];
  /** Retrieves phenotype status of all variables in the currently selected phenotype with their corresponding IDs.
   *  @returns [id, Phenotype] - An array of tuples, where each tuple contains the variable ID and its phenotype status in the currently selected phenotype.
   */
  getAllCurrentPhenotypeIds: () => Array<[number, Phenotype]>;
  /** Sets the phenotype status for a variable in the currently active phenotype. */
  setPhenotype: (id: number, phenotype: Phenotype) => void;
  /** Retrieves control information for a specific variable by ID. (control-enabled status + phenotype status in the currently active phenotype) */
  getVariableControlInfo: (id: number) => ControlInfo | undefined;
  /** Retrieves control-enabled status for a specific variable by ID. */
  getVariableControlEnabled: (id: number) => boolean | undefined;
  /** Retrieves phenotype status in the currently active phenotype for a specific variable by ID. */
  getVariableCurrentPhenotype: (id: number) => Phenotype | undefined;

  /** Retrieves IDs of variables based on their control enabled state. */
  getControlEnabledIds: (controlEnabled: boolean) => number[];
  /** Retrieves IDs of variables based on their phenotype state in the currently active phenotype. */
  getPhenotypeIds: (phenotype: Phenotype) => number[];

  /** Returns how many control enabled / not control enabled variable there is. */
  getControlEnabledStats: () => ControlEnabledStats;
  /** Returns how many variables have certain phenotype status in the currently active phenotype. */
  getPhenotypeStats: () => PhenotypeStats;
  /** Returns the number of variables set as Control-Enabled and in Phenotype .
   * @returns A tuple with the first element being the count of Control-Enabled variables,
   * and the second element being the count of variables in Phenotype.
   */
  getNumberOfSetControl: () => [number, number];

  /** Checks if the control information is empty. */
  isEmpty: () => boolean;
  /** Clears all control information. */
  clear: () => void;
};
