import { Loading } from '../../../components/lit-components/loading-wrapper';
import { Message } from '../../../components/lit-components/message-wrapper';
import config from '../../../config';
import useVariablesStore from '../../../stores/LiveModel/useVariablesStore';
import { EdgeMonotonicity, type Variable } from '../../../types';
import CytoscapeME from '../../model-editor/CytoscapeME/CytoscapeME';
import { LiveModel, type LiveModelClass } from './LiveModel';

// import {
//   Warning,
//   ModelEditor,
//   Results,
//   UI,
//   Strings,
// } from "./Todo-imports";

class ImportLM {
  private _liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  /** Add variable for importAeon function, returns id of the variable. */
  private _addVariableImport(
    variable: Variable | undefined,
    name: string,
    position: any,
    control: any
  ): number | undefined {
    if (variable !== undefined) {
      return variable.id;
    }

    if (control == undefined) {
      return this._liveModel.Variables.addVariable(true, position, name);
    }

    return this._liveModel.Variables.addVariable(
      true,
      position,
      name,
      control[0],
      control[1]
    );
  }

  /** Adds variables which are not connected to any other variable. */
  private _insertNotConnected(
    positions: Record<string, any>,
    control: Record<string, any>
  ): void {
    const vars = Object.keys(positions);
    for (let variable of vars) {
      const variableId = useVariablesStore
        .getState()
        .variableFromName(variable)?.id;
      if (variableId !== undefined) {
        continue;
      }

      this._addVariableImport(
        useVariablesStore.getState().variableFromName(variable),
        variable,
        positions[variable],
        control[variable]
      );
    }
  }

  /** Add all regulations, creating variables if needed. */
  private _setRegulations(
    regulations: any[],
    positions: Record<string, any>,
    control: Record<string, any>
  ): void {
    for (const template of regulations) {
      const regulator = this._addVariableImport(
        useVariablesStore.getState().variableFromName(template.regulatorName),
        template.regulatorName,
        positions[template.regulatorName],
        control[template.regulatorName]
      );
      const target = this._addVariableImport(
        useVariablesStore.getState().variableFromName(template.targetName),
        template.targetName,
        positions[template.targetName],
        control[template.targetName]
      );

      if (target === undefined || regulator === undefined) {
        Message.showError(
          'Error: Regulation cannot be created. One of the variables is not defined.'
        );
        continue;
      }

      // Create the actual regulation...
      this._liveModel.Regulations.addRegulation(
        true,
        regulator,
        target,
        template.observable,
        template.monotonicity
      );
    }
  }

  /** Set all update functions */
  private _setUpdateFunctions(
    updateFunctions: Record<string, string>,
    positions: Record<string, any>,
    control: Record<string, any>
  ): void {
    let keys = Object.keys(updateFunctions);
    for (let key of keys) {
      const variable = this._addVariableImport(
        useVariablesStore.getState().variableFromName(key),
        key,
        positions[key],
        control[key]
      );

      if (!variable) {
        Message.showError(
          `Error: Update function for variable "${key}" cannot be set. Variable is not defined.`
        );
        continue;
      }

      // We actually have to also set the function in the model because we don't update it from the set method...
      //ModelEditor.setUpdateFunction(variable, updateFunctions[key]);
      let error = this._liveModel.UpdateFunctions.setUpdateFunction(
        variable,
        updateFunctions[key]
      );
      if (error !== undefined) {
        //Warning.displayWarning(error);
      }
    }
  }

  /**
   * Parses model into intermediate objects.
   * Returns model name and model description.
   * modelString is model in the form of Aeon string
   * All the other parameters are empty objects to be filled with data from the parsed Aeon string
   */
  private _parseAeonFile(
    modelString: string,
    regulations: any[],
    positions: Record<string, any>,
    control: Record<string, any>,
    updateFunctions: Record<string, string>,
    results: Record<string, any>
  ): [string, string] | string {
    let lines = modelString.split('\n');
    // name1 -> name2
    let regulationRegex =
      /^\s*([a-zA-Z0-9_{}]+)\s*-([>|?])(\??)\s*([a-zA-Z0-9_{}]+)\s*$/;
    // #name:content
    let modelNameRegex = /^\s*#name:(.+)$/;
    // #description:content
    let modelDescriptionRegex = /^\s*#description:(.+)$/;
    // #position:var_name:num1,num2
    let positionRegex = /^\s*#position:([a-zA-Z0-9_{}]+):(.+?),(.+?)\s*$/;
    // #control:var_name:ccontrollability,pphenotypeStatus
    let controlRegex =
      /^\s*#!control:([a-zA-Z0-9_{}]+):(true|false),(true|false|null)\s*$/;
    // $var_name:function_data
    let updateFunctionRegex = /^\s*\$\s*([a-zA-Z0-9_{}]+)\s*:\s*(.+)\s*$/;
    //#results:stringifiedJSONofresults
    let resultsRegex = /^\s*#!results:\s*(attractor|control)\s*:\s*(.+)\s*$/;
    // #...
    let commentRegex = /^\s*#.*?$/;

    let modelName = '';
    let modelDescription = '';

    for (let line of lines) {
      line = line.trim();
      if (line.length == 0) continue; // skip whitespace
      let match = line.match(regulationRegex);
      if (match !== null) {
        let monotonicity: EdgeMonotonicity = EdgeMonotonicity.unspecified;
        if (match[2] == '>') monotonicity = EdgeMonotonicity.activation;
        if (match[2] == '|') monotonicity = EdgeMonotonicity.inhibition;
        regulations.push({
          regulatorName: match[1],
          targetName: match[4],
          monotonicity: monotonicity,
          observable: match[3].length == 0,
        });
        continue;
      }
      match = line.match(modelNameRegex);
      if (match !== null) {
        modelName = match[1];
        continue;
      }
      match = line.match(modelDescriptionRegex);
      if (match !== null) {
        modelDescription += match[1];
        continue;
      }
      match = line.match(positionRegex);
      if (match !== null) {
        let x = parseFloat(match[2]);
        let y = parseFloat(match[3]);
        if (x === x && y === y) {
          // test for NaN
          positions[match[1]] = [x, y];
        }
        continue;
      }
      match = line.match(updateFunctionRegex);
      if (match !== null) {
        updateFunctions[match[1]] = match[2];
        continue;
      }

      match = line.match(controlRegex);
      if (match !== null) {
        control[match[1]] = [
          match[2] == 'true' ? true : false,
          match[3] == 'true' ? true : match[3] == 'false' ? false : null,
        ];
        continue;
      }

      match = line.match(resultsRegex);
      if (match != null) {
        try {
          results.type = match[1];
          results.data = JSON.parse(match[2]);
        } catch (e) {
          console.log('Results are invalid: ' + e);
        }
      }

      if (line.match(commentRegex) === null) {
        // todeo-error
        return 'Unexpected line in file: ' + line;
      }
    }

    return [modelName, modelDescription.replace(/\\n/g, '\n')];
  }

  /**
   * Import model from Aeon file.
   * If the import is successful, return undefined,
   * otherwise return an error string.
   */
  public importAeon(modelString: string, erasePossible = false): boolean {
    if (
      (!erasePossible && !this._liveModel._modelModified()) ||
      (!this._liveModel.isEmpty() && !erasePossible && !confirm('Model erased')) //Strings.modelWillBeErased)
    ) {
      // If there is some model loaded, let the user know it will be
      // overwritten. If he decides not to do it, just return...
      return false;
    }

    // Disable on-the-fly server checks.
    this._liveModel._disable_dynamic_validation = true;

    let modelName = '';
    let modelDescription = '';
    let regulations: any[] = [];
    let positions: Record<string, any> = {};
    let control: Record<string, any> = {};
    let updateFunctions: Record<string, string> = {};
    let results: Record<string, any> = {};

    [modelName, modelDescription] = this._parseAeonFile(
      modelString,
      regulations,
      positions,
      control,
      updateFunctions,
      results
    ) as [string, string];

    this._liveModel.clear();

    // Set model metadata
    LiveModel.Info.setModelName(modelName);
    LiveModel.Info.setModelDescription(modelDescription);

    this._setRegulations(regulations, positions, control);
    this._liveModel.Import._setUpdateFunctions(
      updateFunctions,
      positions,
      control
    );
    this._insertNotConnected(positions, control);

    CytoscapeME.fit();

    // Re-enable server checks and run them.
    this._liveModel._disable_dynamic_validation = false;
    for (const { id } of useVariablesStore.getState().getAllVariables()) {
      this._liveModel.UpdateFunctions._validateUpdateFunction(id);
    }

    //UI.Visible.closeContent();

    return true; // no error
  }

  // #region --- Import from file ---

  public importFromFile(
    element: HTMLInputElement & { files: FileList },
    formatToAeonFunction?: (file: string) => Promise<string> | null
  ): void {
    if (!element.files || element.files.length === 0 || !element.files[0]) {
      Message.showError('Import Error: No file was selected.');
      return;
    }

    const file = element.files[0];
    const fr = new FileReader();

    fr.onload = async (e: ProgressEvent<FileReader>) => {
      if (!e.target || e.target.result === null) {
        Message.showError('Import Error: File reading failed.');
        return;
      }

      const fileContent = e.target.result as string;
      Loading.startLoading();

      try {
        const aeonModel = !formatToAeonFunction
          ? fileContent
          : await formatToAeonFunction(fileContent);

        if (aeonModel === null) {
          throw new Error('File format conversion failed.');
        }

        this.importAeon(aeonModel);
      } catch (error: any) {
        Message.showError(
          `Import Error: ${error?.message ?? 'Parsing file failed'}`
        );
      } finally {
        element.value = '';
        Loading.endLoading();
      }
    };

    fr.readAsText(file);
  }

  // #endregion

  /** Loads model saved in the local storage of the browser. */
  public loadFromLocalStorage(): void {
    try {
      Loading.startLoading();
      const modelString = localStorage.getItem(
        config.localStorageModelName ?? 'lastModel'
      );
      if (
        modelString !== undefined &&
        modelString !== null &&
        modelString.length > 0
      ) {
        this.importAeon(modelString);
      } else {
        Message.showInfo(
          "No recent model available. Make sure 'Block third-party cookies and site data' is disabled in your browser."
        );
      }
    } catch (e) {
      Message.showError(
        'Import Error: Failed to load model from local storage. '
      );

      console.log(e);
    } finally {
      Loading.endLoading();
    }
  }
}

export default ImportLM;
