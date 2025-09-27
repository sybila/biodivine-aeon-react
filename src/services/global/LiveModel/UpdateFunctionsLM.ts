import useRegulationsStore from '../../../stores/LiveModel/useRegulationsStore';
import useUpdateFunctionsStore from '../../../stores/LiveModel/useUpdateFunctionsStore';
import useVariablesStore from '../../../stores/LiveModel/useVariablesStore';
import { EdgeMonotonicity, type UpdateFunctionMetadata } from '../../../types';
import type { LiveModelClass } from './LiveModel';

// import {
//   ModelEditor,
//   ComputeEngine,
//   Strings,
// } from "./Todo-imports";

class UpdateFunctionsLM {
  private _liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  public setUpdateFunction(
    id: number,
    functionString: string
  ): string | undefined {
    const variable = useVariablesStore.getState().variableFromId(id);
    if (!variable) {
      return `Unknown variable '${id}'.`;
    }

    const check = this._checkUpdateFunction(id, functionString);
    if (typeof check === 'string') {
      return variable.name + ' ' + check; //Strings.invalidUpdateFunction(variable.name)
    }

    if (functionString.length === 0) {
      useUpdateFunctionsStore.getState().deleteUpdateFunctionId(id);
    } else {
      useUpdateFunctionsStore.getState().setUpdateFunction(id, {
        functionString: functionString.replace(/\s+/, ' '),
        metadata: check,
      });
    }

    this._validateUpdateFunction(id);
    this._liveModel.Export.saveModel();
    return undefined;
  }

  private _updateFunctionModelFragment(id: number): string | undefined {
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
      fragment += this._liveModel.Regulations._regulationToString(reg) + '\n';
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

  public validateAllUpdateFunctions(): void {
    for (const variable of useVariablesStore.getState().getAllVariables()) {
      this._validateUpdateFunction(variable.id);
    }
  }

  public _validateUpdateFunction(id: number): void {
    if (this._liveModel._disable_dynamic_validation) return;

    const modelFragment = this._updateFunctionModelFragment(id);
    if (!modelFragment) {
      //ModelEditor.setUpdateFunctionStatus(id, "", false);
      return;
    }

    //Todo fix type
    /*ComputeEngine.validateUpdateFunction(modelFragment, (error: string, result: any) => {
      if (error !== undefined) {
        //ModelEditor.setUpdateFunctionStatus(id, `Error: ${error}`, true);
      } else {
        ModelEditor.setUpdateFunctionStatus(
          id,
          `Possible instantiations: ${result.cardinality}`,
          false
        );
      }
    });*/
  }

  public _checkUpdateFunction(
    id: number,
    functionString: string
  ): string | UpdateFunctionMetadata {
    if (functionString.length === 0) return { parameters: new Set() };

    let tokens = this._tokenize_update_function(functionString);
    if (typeof tokens === 'string') return tokens;

    tokens = this._process_function_calls(tokens);
    if (typeof tokens === 'string') return tokens;

    const names = new Set<{ name: string; cardinality: number }>();
    this._extract_names_with_cardinalities(tokens, names);

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
          const myName = useVariablesStore.getState().getVariableName(id);
          const message = `Variable '${variable.name}' does not regulate '${myName}'.`;
          if (confirm(message + ' Do you want to create the regulation now?')) {
            this._liveModel.Regulations.addRegulation(
              false,
              variable.id,
              id,
              true,
              EdgeMonotonicity.unspecified
            );
          } else {
            return message;
          }
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

  public deleteUpdateFunctionId(id: number): void {
    useUpdateFunctionsStore.getState().deleteUpdateFunctionId(id);
  }

  private _process_function_calls(tokens: any[]): string | any[] {
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
        const result = this._process_function_calls(token.data);
        if (typeof result === 'string') return result;
      }
    }

    return tokens;
  }

  private _extract_names_with_cardinalities(
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
        this._extract_names_with_cardinalities(token.data, names);
      }
    }
  }

  private _tokenize_update_function(str: string): string | any[] {
    const result = this._tokenize_update_function_recursive(str, 0, true);
    return result.error ? result.error : result.data;
  }

  private _tokenize_update_function_recursive(
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
        const nested = this._tokenize_update_function_recursive(str, i, false);
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
}

export default UpdateFunctionsLM;
