import type { Result } from '../../../types/result';
import type {
  ControlEnabledStats,
  ControlInfo,
  Phenotype,
  PhenotypeNoId,
  PhenotypeStats,
  PhenotypeStatus,
} from '../../../types/types';

/** Zustand store for managing control information of variables in LiveModel
 Provides actions for adding, removing, updating, and querying control info and phenotypes */
export type ControlStatus = {
  // #region --- Props ---

  /** Property containing control-enabled status information for each variable. */
  controlEnabled: Record<number, boolean>;

  /** Property containing currently edited phenotype. */
  currentlyEditedPhenotype: Phenotype;
  /** Set of IDs for phenotypes that are currently selected and used in computations. */
  phenotypesUsedInComputation: Set<number>;
  /** Property containing phenotype status information for each variable. */
  phenotypes: Record<number, PhenotypeNoId>;

  /** Counter used for naming phenotypes with no name. */
  noNamePhenotypeCounter: number;
  /** Name prefix for phenotypes without specified name. */
  noNamePhenotypePrefix: string;

  // #endregion

  // #region --- Variable Control-Info (Control-Enabled + Phenotype) ---

  /** Adds control information for a variable. */
  addInfo: (id: number, controlInfo: ControlInfo) => number;
  /** Removes all control information (accross all phenotypes) for a variable.
   */
  removeInfo: (id: number) => void;

  /** Retrieves control information for a specific variable by ID. (control-enabled status + phenotype status in the currently active phenotype) */
  getVariableControlInfo: (id: number) => ControlInfo | undefined;

  /** Returns the number of variables set as Control-Enabled and in Phenotype .
   * @returns A tuple with the first element being the count of Control-Enabled variables,
   * and the second element being the count of variables in Phenotype.
   */
  getNumberOfSetControl: () => [number, number];

  // #endregion

  // #region --- Multiple Phenotype Operations ---

  /** Function which swithes the currently active phenotype (currentPhenotype).
   *  @param id (number) - id of the phenotype which should be active
   *  @returns if succesful returns id of the newly created phenotype, else if phenotype with id doesn't exist returns undefined.
   */
  switchPhenotype: (id: number) => number | undefined;
  /**
   * Creates a new empty phenotype and makes it currently active.
   * @param name (string | undefined) - optional name for the phenotype. If not provided, a default name will be generated.
   * @param id (number | undefined) - optional ID for the phenotype. If not provided, a new ID will be generated.
   * @param variables (Record<number, PhenotypeStatus> | undefined) -  optional variables for the newlu created phenotype.
   * @returns Returns a Result object. If successful value property is set to the ID of the new phenotype. Otherwise, the error property contains an error message string.
   */
  createPhenotype: (
    name?: string,
    id?: number,
    variables?: Record<number, PhenotypeStatus>
  ) => Result<number>;

  /** Removes phenotype and makes it currently active.
   *  @param id (number) - id of the phenotype which should be removed
   *  @returns if succesful returns id of the removed phenotype, else Result object error property contains error messsage string. (ex. when deleted phenotype is default phenotype).
   */
  removePhenotype: (id: number) => Result<number>;

  /** Renames phenotype specified by id to a new name.
   *  @param id (number) = id of the renamed phenotype
   *  @param newName (string) = new name for the phenotype.
   *  @returns Result<string> where if the renaming is succesful returns new name as value, else returns error message.
   */
  renamePhenotype: (id: number, newName: string) => Result<string>;

  /**
   * Adds a phenotype to the set of phenotypes used in computation.
   * @param id (number) - ID of the phenotype to be added.
   * @returns Result<number> where if the phenotype is successfully added, the id of the added phenotype is returned. Otherwise, an error message is returned.
   */
  includePhenotypeInComp: (id: number) => Result<number>;

  /**
   * Removes a phenotype from the set of phenotypes used in computation.
   * @param id (number) - ID of the phenotype to be removed.
   * @returns Result<number> where if the phenotype is successfully removed, the id of the removed phenotype is returned. Otherwise, an error message is returned.
   */
  removePhenotypeFromComp: (id: number) => Result<number>;

  /** Shifts variables from phenotype to the other phenotype.
   *  Phenotype specified by fromId should be empty after this, and phenotype specified by toId should contain only the variables previouslu present in fromId Phenotype.
   *  @returns If succesful returns true, else returns error message.
   */
  shiftPhenotype: (fromId: number, toId: number) => Result<boolean>;

  /** Returns all existing phenotypes. */
  getAllPhenotypes: () => Record<number, PhenotypeNoId>;

  /** Finds first phenotype with matching name.
   *  @returns If phenotype with specified name exists returns it, else returns undefined.
   */
  getPhenotypeByName: (name: string) => Phenotype | undefined;

  /** Checks if name maches name format connected with phenotype which was created without explicit name.
   *  If yes and noNamePhenotypeCounter is lower then the phenotype number specified in the name, returns new value of noNamePhenotypeCounter, else returns undeifned. */
  checkNoNamePhenotype: (name: string) => number | undefined;

  /** Creates new phenotype name based on the noNamePhenotypePrefix and noNamePhenotypeCounter.
   * @returns Object containing name of the phenotype and new value for the noNamePhenotypeCounter.
   */
  getNewPhenotypeName: () => { name: string; newCounterValue: number };

  // #endregion

  // #region --- Control-Enabled Variable Operations ---

  /** Retrieves control-enabled status of all variables without their ids. */
  getAllControlEnabled: () => boolean[];
  /** Retrieves control-enabled status of all variables with their corresponding IDs.
   *  @returns [id, boolean] - An array of tuples, where each tuple contains the variable ID and its control-enabled status.
   */
  getAllControlEnabledIds: () => Array<[number, boolean]>;
  /** Sets the control enabled state for a variable. */
  setControlEnabled: (id: number, controlEnabled: boolean) => void;
  /** Retrieves IDs of variables based on their control enabled state. */
  getControlEnabledIds: (controlEnabled: boolean) => number[];
  /** Returns how many control enabled / not control enabled variable there is. */
  getControlEnabledStats: () => ControlEnabledStats;
  /** Retrieves control-enabled status for a specific variable by ID. */
  getVariableControlEnabled: (id: number) => boolean | undefined;

  // #endregion

  // #region --- Phenotype Operations ---

  /** Retrieves phenotype status of all variables in the currently selected phenotype (without ids of the variables). */
  getAllCurrentPhenotype: () => PhenotypeStatus[];
  /** Retrieves phenotype status of all variables in the currently selected phenotype with their corresponding IDs.
   *  @returns [id, Phenotype] - An array of tuples, where each tuple contains the variable ID and its phenotype status in the currently selected phenotype.
   */
  getAllCurrentPhenotypeIds: () => Array<[number, PhenotypeStatus]>;
  /**
   * Sets the phenotype status for a variable in phenotype.
   *
   * @param id - The identifier of the variable to update.
   * @param phenotypeStatus - The new phenotype status for the variable.
   * @param phenotypeId - (Optional) The identifier of the phenotype. If not provided, the current phenotype is assumed.
   */
  setPhenotype: (
    id: number,
    phenotypeStatus: PhenotypeStatus,
    phenotypeId?: number
  ) => Result<number>;

  /** Retrieves the phenotype status for a specific variable by ID, either in the currently active phenotype or in a phenotype specified by the 
  `phenotypeId`. If no `phenotypeId` is provided, the function will default to the currently active phenotype.

  @param id (number): The ID of the variable for which to retrieve the phenotype status.
  @param phenotypeId (number, optional): The ID of the phenotype in which to retrieve the phenotype status. If not provided, the function will use the 
  currently active phenotype.

  @returns `PhenotypeStatus | undefined`: The phenotype status for the specified variable in the given phenotype, or `undefined` if no phenotype status is 
  found.
 */
  getVariablePhenotype: (
    id: number,
    phenotypeId?: number
  ) => PhenotypeStatus | undefined;

  /** Retrieves IDs of variables based on their phenotype state in the currently active phenotype. */
  getPhenotypeIds: (phenotype: PhenotypeStatus) => number[];

  /** Returns how many variables have certain phenotype status in the currently active phenotype. */
  getPhenotypeStats: () => PhenotypeStats;

  // #endregion

  /** Checks if the control information is empty. */
  isEmpty: () => boolean;
  /** Clears all control information. */
  clear: () => void;
};
