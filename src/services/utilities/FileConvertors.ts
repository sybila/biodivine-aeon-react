import init, {
  sbml_to_aeon,
  aeon_to_sbml,
  aeon_to_sbml_instantiated,
  aeon_to_bnet,
  bnet_to_aeon,
  type InitInput,
} from '../../dependencies/aeon-wasm/pkg/aeon_wasm.js';

/**
 * FileConvertors provides static methods for AEON/SBML/BNet conversions.
 * All methods return a Promise and resolve to the result string, or reject with an error.
 * WASM is initialized automatically on first use.
 */
class FileConvertors {
  private static wasmInitialized: Promise<InitInput> | null = null;

  private static async ensureWasmInitialized() {
    if (!FileConvertors.wasmInitialized) {
      FileConvertors.wasmInitialized = init();
    }
    await FileConvertors.wasmInitialized;
  }

  static async aeonToSbml(aeonString: string): Promise<string> {
    await FileConvertors.ensureWasmInitialized();
    try {
      return aeon_to_sbml(aeonString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  static async sbmlToAeon(sbmlString: string): Promise<string> {
    await FileConvertors.ensureWasmInitialized();
    try {
      return sbml_to_aeon(sbmlString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  static async aeonToSbmlInstantiated(aeonString: string): Promise<string> {
    await FileConvertors.ensureWasmInitialized();
    try {
      return aeon_to_sbml_instantiated(aeonString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  static async aeonToBnet(aeonString: string): Promise<string> {
    await FileConvertors.ensureWasmInitialized();
    try {
      return aeon_to_bnet(aeonString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  static async bnetToAeon(bnetString: string): Promise<string> {
    await FileConvertors.ensureWasmInitialized();
    try {
      return bnet_to_aeon(bnetString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }
}

export default FileConvertors;
