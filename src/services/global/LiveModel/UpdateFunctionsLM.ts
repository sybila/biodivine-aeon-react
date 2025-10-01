import useRegulationsStore from '../../../stores/LiveModel/useRegulationsStore';
import useUpdateFunctionsStore from '../../../stores/LiveModel/useUpdateFunctionsStore';
import useVariablesStore from '../../../stores/LiveModel/useVariablesStore';
import { EdgeMonotonicity, type UpdateFunctionMetadata } from '../../../types';
import ComputationManager from '../ComputationManager/ComputationManager';
import Warning from '../Warning/Warning';
import type { LiveModelClass } from './LiveModel';

class UpdateFunctionsLM {
  // #region --- Properties + Constructor ---
  private liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this.liveModel = liveModel;
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
    force: boolean = false
  ): string | undefined {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return 'Model cannot be modified at the moment.';
    }

    const variable = useVariablesStore.getState().variableFromId(id);
    if (!variable) {
      return `Unknown variable '${id}'.`;
    }

    const check = this.checkUpdateFunction(id, functionString);
    if (typeof check === 'string') {
      return check;
    }

    if (functionString.length === 0) {
      useUpdateFunctionsStore.getState().deleteUpdateFunctionId(id);
    } else {
      useUpdateFunctionsStore.getState().setUpdateFunction(id, {
        functionString: functionString.replace(/\s+/, ' '),
        metadata: check,
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
    useUpdateFunctionsStore.getState().deleteUpdateFunctionId(id);
  }

  // #endregion

  // #region --- Validation ---

  /** Validates all update functions if the number of variables has changed since the last validation. */
  public validateUpdateFunctionsIfNeeded(): void {
    if (
      this.liveModel.disable_dynamic_validation ||
      !ComputationManager.isComputeEngineConnected()
    )
      return;

    if (
      useVariablesStore.getState().getAllVariables().length !==
      Object.keys(useUpdateFunctionsStore.getState().updateFunctionStatus)
        .length
    ) {
      this.validateAllUpdateFunctions();
    }
  }

  /** Validates all update functions and sets state of each update function in the ModelEditor tab. */
  public validateAllUpdateFunctions(): void {
    if (this.liveModel.disable_dynamic_validation) return;

    useUpdateFunctionsStore.getState().resetUpdateFunctionStatus();
    for (const variable of useVariablesStore.getState().getAllVariables()) {
      this.validateUpdateFunction(variable.id);
    }
  }

  /**  Validates the update function for a specific variable ID and sets its status in the ModelEditor tab. */
  public validateUpdateFunction(id: number): void {
    if (this.liveModel.disable_dynamic_validation) return;

    const modelFragment = this.updateFunctionModelFragment(id);
    if (!modelFragment) {
      useUpdateFunctionsStore.getState().setUpdateFunctionStatus(id, {
        isError: false,
        status: 'No regulators',
      });
      return;
    }

    ComputationManager.validateUpdateFunction(id, modelFragment);
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

    tokens = this.processFunctionCalls(tokens);
    if (typeof tokens === 'string') return tokens;

    const names = new Set<{ name: string; cardinality: number }>();
    this.extractNamesWithCardinalities(tokens, names);

    const parameters = new Set<{ name: string; cardinality: number }>();
    for (const item of names) {
      const variable = useVariablesStore.getState().variableFromName(item.name);
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
        const regulation = useRegulationsStore
          .getState()
          .getRegulationId(variable.id, id);
        if (!regulation) {
          const myName =
            useVariablesStore.getState().getVariableName(id) ?? 'Unknown';
          Warning.addCreateMissingRegulationWarning(variable.name, myName, () =>
            this.liveModel.Regulations.addRegulation(
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

    for (const [k, existing] of useUpdateFunctionsStore
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
            } args, but '${useVariablesStore
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
   *  @returns A string representing the model fragment, or undefined if there are no regulators.
   */
  private updateFunctionModelFragment(id: number): string | undefined {
    const name = useVariablesStore.getState().getVariableName(id);
    let fragment = '';
    const regulations = useRegulationsStore.getState().regulationsOf(id);
    const varNames = new Set<string>();

    if (regulations.length === 0) return undefined;

    for (const reg of regulations) {
      if (reg.regulator !== id) {
        varNames.add(
          useVariablesStore.getState().getVariableName(reg.regulator)!
        );
      }
      fragment += this.liveModel.Regulations.regulationToString(reg) + '\n';
    }

    for (const name of varNames) {
      fragment += `$${name}: false\n`;
    }

    const fun = useUpdateFunctionsStore.getState().getUpdateFunctionId(id);
    if (fun) {
      fragment += `$${name}: ${fun.functionString}\n`;
    }

    return fragment;
  }

  /** Extracts variable names and their cardinalities from the given tokens. */
  private extractNamesWithCardinalities(
    tokens: any[],
    names: Set<{ name: string; cardinality: number }>
  ) {
    for (let token of tokens) {
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
  private tokenizeUpdateFunction(str: string): string | any[] {
    const result = this.tokenizeUpdateFunctionRecursive(str, 0, true);
    return result.error ? result.error : result.data;
  }

  /** Helper function to tokenize the update function recursively. */
  private tokenizeUpdateFunctionRecursive(
    str: string,
    i: number,
    top: boolean
  ): any {
    let result: any[] = [];

    while (i < str.length) {
      let c = str[i++];
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

            const variable = useVariablesStore
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
