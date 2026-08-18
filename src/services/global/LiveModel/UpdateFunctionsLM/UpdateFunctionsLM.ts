import type { RegulationsStatus } from '../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import {
  EdgeMonotonicity,
  type UpdateFunctionMetadata,
  type UpdateFunctionStatus,
} from '../../../../types/types';
import type { ComputationManagerInt } from '../../ComputationManager/ComputationManagerInt';
import type { WarningInt } from '../../Warning/WarningInt';
import type { LiveModelInt } from '../LiveModelInt';
import type { UpdateFunctionsLMInt } from './UpdateFunctionsLMInt';

type TokenizationData = {
  token: string;
  data?: TokenizationData | string | TokenizationData[];
  text: string;
};

class UpdateFunctionsLM implements UpdateFunctionsLMInt {
  // #region --- Properties + Constructor ---
  private liveModel: LiveModelInt;
  private computationManagerServ: ComputationManagerInt;
  private warningServ: WarningInt;

  private regulationsStore: ZustandStore<RegulationsStatus>;
  private updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private modelUndoRedoStore: ZustandStore<UndoRedoState>;

  constructor(
    liveModel: LiveModelInt,
    computationManagerServ: ComputationManagerInt,
    warningServ: WarningInt,
    regulationsStore: ZustandStore<RegulationsStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    variablesStore: ZustandStore<VariablesStatus>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>
  ) {
    this.liveModel = liveModel;
    this.computationManagerServ = computationManagerServ;
    this.warningServ = warningServ;

    this.regulationsStore = regulationsStore;
    this.updateFunctionsStore = updateFunctionsStore;
    this.variablesStore = variablesStore;
    this.modelUndoRedoStore = modelUndoRedoStore;
  }

  // #endregion

  // #region --- Update Function Operations ---

  /** Sets update function for a variable.
   *  @param id ID of the variable to set the update function for.
   *  @param functionString The update function as a string.
   *  @param force If true, bypasses model modification checks. (Warning - Doesn't bypass update function validation checks)
   *  @returns An error message if the operation fails, otherwise undefined.
   */
  public setUpdateFunction(
    id: number,
    functionString: string,
    addIntoUndoRedo: boolean,
    force: boolean = false
  ): string | undefined {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return 'Model cannot be modified at the moment.';
    }

    const variable = this.variablesStore.getState().variableFromId(id);
    if (!variable) {
      return `Unknown variable '${id}'.`;
    }

    const check = this.checkUpdateFunction(id, functionString);
    if (typeof check === 'string') {
      return check;
    }

    const existing = this.updateFunctionsStore
      .getState()
      .getUpdateFunctionId(id);

    if (functionString.length === 0) {
      this.updateFunctionsStore.getState().deleteUpdateFunctionId(id);
    } else {
      this.updateFunctionsStore.getState().setUpdateFunction(id, {
        functionString: functionString.replace(/\s+/, ' '),
        metadata: check,
      });
    }

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () => {
          if (existing) {
            this.setUpdateFunction(id, existing.functionString, false, false);
          } else {
            this.deleteUpdateFunctionId(id);
          }
        },
        redo: () => {
          if (functionString.length === 0) {
            this.deleteUpdateFunctionId(id);
          } else {
            this.setUpdateFunction(id, functionString, false, false);
          }
        },
      });
    }

    this.validateUpdateFunction(id);
    this.liveModel.Export.saveModel();
    return undefined;
  }

  /** Deletes the update function for a variable.
   *  @param id ID of the variable to delete the update function for.
   */
  public deleteUpdateFunctionId(id: number): void {
    this.updateFunctionsStore.getState().deleteUpdateFunctionId(id);
  }

  // #endregion

  // #region --- Validation ---

  /** Validates all update functions if the number of variables has changed since the last validation. */
  public validateUpdateFunctionsIfNeeded(): void {
    if (
      this.liveModel.disable_dynamic_validation ||
      !this.computationManagerServ.isComputeEngineConnected()
    )
      return;

    if (
      this.variablesStore.getState().getAllVariables().length !==
      Object.keys(this.updateFunctionsStore.getState().updateFunctionStatus)
        .length
    ) {
      this.validateAllUpdateFunctions();
    }
  }

  /** Validates all update functions and sets state of each update function in the ModelEditor tab. */
  public validateAllUpdateFunctions(): void {
    if (this.liveModel.disable_dynamic_validation) return;

    this.updateFunctionsStore.getState().resetUpdateFunctionStatus();
    for (const variable of this.variablesStore.getState().getAllVariables()) {
      this.validateUpdateFunction(variable.id);
    }
  }

  /**  Validates the update function for a specific variable ID and sets its status in the ModelEditor tab.
   *   @param id (number) id of variable whichs update function we want to validate
   *   @param setStatusFunction ( (status: UpdateFunctionStatus) => void ) optional setter which is used for setting the new update function status (if not set defautlu sets update function status into the update function store)
   *   @param updateFunction (string?) optional parameter which overwrites the current update function of variable specified by the id parameter (used for validation of update function before it was set)
   */
  public validateUpdateFunction(
    id: number,
    setStatusFunction: (status: UpdateFunctionStatus) => void = (
      status: UpdateFunctionStatus
    ) => {
      this.updateFunctionsStore.getState().setUpdateFunctionStatus(id, status);
    },
    updateFunction?: string
  ): void {
    if (this.liveModel.disable_dynamic_validation) return;

    const modelFragment = this.updateFunctionModelFragment(id, updateFunction);
    if (!modelFragment) {
      setStatusFunction({
        isError: false,
        status: 'No regulators',
      });
      return;
    }

    this.computationManagerServ.validateUpdateFunction(
      id,
      modelFragment,
      setStatusFunction
    );
  }

  // #endregion

  // #region --- Create Metadata + Check Update Function Validity ---

  /** Checks the validity of an update function and creates metadata about it.
   *  @param id ID of the variable whose update function is to be checked.
   *  @param functionString The update function as a string.
   *  @returns An error message if the function is invalid, otherwise metadata about the function.
   */
  public checkUpdateFunction(
    id: number,
    functionString: string
  ): string | UpdateFunctionMetadata {
    if (functionString.length === 0) return { parameters: new Set() };

    let tokens = this.tokenizeUpdateFunction(functionString);
    if (typeof tokens === 'string') return tokens;

    tokens = this.processFunctionCalls(tokens as any[]);
    if (typeof tokens === 'string') return tokens;

    const names = new Set<{ name: string; cardinality: number }>();
    this.extractNamesWithCardinalities(tokens, names);

    const parameters = new Set<{ name: string; cardinality: number }>();
    for (const item of names) {
      const variable = this.variablesStore
        .getState()
        .variableFromName(item.name);
      if (!variable) {
        for (const existing of parameters) {
          if (
            existing.name === item.name &&
            existing.cardinality !== item.cardinality
          ) {
            return `Parameter '${item.name}' used with ${item.cardinality} and ${existing.cardinality} arguments.`;
          }
        }
        parameters.add(item);
      }

      if (item.cardinality > 0 && variable) {
        return `Variable '${item.name}' used as parameter.`;
      }

      if (variable) {
        const regulation = this.regulationsStore
          .getState()
          .getRegulationId(variable.id, id);
        if (!regulation) {
          const myName =
            this.variablesStore.getState().getVariableName(id) ?? 'Unknown';
          this.warningServ.addCreateMissingRegulationWarning(
            variable.name,
            myName,
            () =>
              this.liveModel.Regulations.addRegulation(
                false,
                false,
                variable.id,
                id,
                true,
                EdgeMonotonicity.unspecified
              )
          );
          return `Variable '${variable.name}' does not regulate '${myName}'.`;
        }
      }
    }

    for (const [k, existing] of this.updateFunctionsStore
      .getState()
      .getAllUpdateFunctions()) {
      const functionVariableId: number = parseInt(k, 10);
      if (functionVariableId === id) continue;

      for (const parameter of existing.metadata.parameters) {
        for (const myParam of parameters) {
          if (
            parameter.name === myParam.name &&
            parameter.cardinality !== myParam.cardinality
          ) {
            return `Parameter '${myParam.name}' used with ${
              myParam.cardinality
            } args, but '${this.variablesStore
              .getState()
              .getVariableName(functionVariableId)}' uses it with ${
              parameter.cardinality
            }.`;
          }
        }
      }
    }

    return { parameters };
  }

  // #endregion

  // #region --- Reformatting ---

  /** Constructs a model fragment containing the update function and its regulators for validation purposes.
   *  @param id ID of the variable whose update function is to be validated.
   *  @param updateFunction (string?) optional parameter which overwrites the current update function of variable specified by the id parameter (used for example for validation of update function which wasn't yet set)
   *  @returns A string representing the model fragment, or undefined if there are no regulators.
   */
  private updateFunctionModelFragment(
    id: number,
    updateFunction?: string
  ): string | undefined {
    const name = this.variablesStore.getState().getVariableName(id);
    let fragment = '';
    const regulations = this.regulationsStore.getState().regulationsOf(id);
    const varNames = new Set<string>();

    if (regulations.length === 0) return undefined;

    for (const reg of regulations) {
      if (reg.regulator !== id) {
        varNames.add(
          this.variablesStore.getState().getVariableName(reg.regulator)!
        );
      }
      fragment += this.liveModel.Regulations.regulationToString(reg) + '\n';
    }

    for (const name of varNames) {
      fragment += `$${name}: false\n`;
    }

    const fun =
      updateFunction ??
      this.updateFunctionsStore.getState().getUpdateFunctionId(id)
        ?.functionString;

    if (fun) {
      fragment += `$${name}: ${fun}\n`;
    }

    return fragment;
  }

  /** Extracts variable names and their cardinalities from the given tokens. */
  private extractNamesWithCardinalities(
    tokens: any[],
    names: Set<{ name: string; cardinality: number }>
  ) {
    for (const token of tokens) {
      if (token.token === 'name') {
        names.add({ name: token.data, cardinality: 0 });
      }
      if (token.token === 'call') {
        names.add({ name: token.data, cardinality: token.args.length });
        for (const arg of token.args) {
          names.add({ name: arg, cardinality: 0 });
        }
      }
      if (token.token === 'group') {
        this.extractNamesWithCardinalities(token.data, names);
      }
    }
  }

  /** Tokenizes the given update function string into a structured format.
   *  @param str The update function as a string.
   *  @returns An array of tokens representing the structure of the update function, or an error message if tokenization fails.
   */
  private tokenizeUpdateFunction(
    str: string
  ): string | TokenizationData[] | TokenizationData {
    const result = this.tokenizeUpdateFunctionRecursive(str, 0, true);
    return result.error
      ? result.error
      : result.data
        ? result.data
        : 'Internal Error: Failed to tokenize update function string. Please try to restart the application.';
  }

  /** Helper function to tokenize the update function recursively. */
  private tokenizeUpdateFunctionRecursive(
    str: string,
    i: number,
    top: boolean
  ): {
    data?: TokenizationData[];
    continue_at?: number;
    error?: string;
  } {
    const result: TokenizationData[] = [];

    while (i < str.length) {
      const c = str[i++];
      if (/\s/.test(c)) continue;

      if (c === '!') result.push({ token: 'not', text: '!' });
      else if (c === ',') result.push({ token: 'comma', text: ',' });
      else if (c === '&') result.push({ token: 'and', text: '&' });
      else if (c === '|') result.push({ token: 'or', text: '|' });
      else if (c === '^') result.push({ token: 'xor', text: '^' });
      else if (c === '=' && str[i] === '>') {
        i++;
        result.push({ token: 'imp', text: '=>' });
      } else if (c === '<' && str[i] === '=' && str[i + 1] === '>') {
        i += 2;
        result.push({ token: 'iff', text: '<=>' });
      } else if (c === '>') return { error: "Unexpected '>'." };
      else if (c === ')')
        return top
          ? { error: "Unexpected ')'." }
          : { data: result, continue_at: i };
      else if (c === '(') {
        const nested = this.tokenizeUpdateFunctionRecursive(str, i, false);
        if (nested.error) return { error: nested.error };

        if (nested.continue_at == undefined) {
          return {
            error:
              "Internal Error: Failed to tokenize update function string. Please try to restart the application.'",
          };
        }

        i = nested.continue_at;
        result.push({ token: 'group', data: nested.data, text: '(...)' });
      } else if (/[a-zA-Z0-9{}_]/.test(c)) {
        let name = c;
        while (i < str.length && /[a-zA-Z0-9{}_]/.test(str[i]))
          name += str[i++];
        result.push(
          name === 'true'
            ? { token: 'true', text: name }
            : name === 'false'
              ? { token: 'false', text: name }
              : { token: 'name', data: name, text: name }
        );
      } else {
        return { error: "Unexpected '" + c + "'." };
      }
    }

    return top ? { data: result, continue_at: i } : { error: "Expected ')'." };
  }

  /** Processes function calls in the tokenized update function.
   *  @param tokens The tokenized update function.
   */
  private processFunctionCalls(tokens: any[]): string | any[] {
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (
        token.token === 'name' &&
        i + 1 < tokens.length &&
        tokens[i + 1].token === 'group'
      ) {
        const argTokens = tokens[i + 1].data;
        const args: string[] = [];

        if (argTokens.length === 0) {
          // no args
        } else {
          let j = 0;
          while (j < argTokens.length) {
            const arg = argTokens[j];

            if (arg.token !== 'name') {
              return `Expected name, but found '${arg.text}'.`;
            }

            const variable = this.variablesStore
              .getState()
              .variableFromName(arg.data);
            if (!variable) {
              return `Unknown argument '${arg.data}'. Only variables allowed as arguments.`;
            }

            args.push(arg.data);
            j += 1;

            if (j < argTokens.length) {
              const next = argTokens[j];
              if (next.token !== 'comma') {
                return `Expected ',', but found '${next.text}'.`;
              }

              j += 1;

              if (j === argTokens.length) {
                return "Unexpected ',' at the end of an argument list.";
              }
            }
          }
        }

        token.token = 'call';
        token.args = args;

        tokens.splice(i + 1, 1);
      } else if (token.token === 'group') {
        const result = this.processFunctionCalls(token.data);
        if (typeof result === 'string') return result;
      }
    }

    return tokens;
  }

  // #endregion
}

export default UpdateFunctionsLM;
