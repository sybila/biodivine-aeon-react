import init, {
  aeon_to_bnet,
  aeon_to_sbml,
  aeon_to_sbml_instantiated,
  bnet_to_aeon,
  sbml_to_aeon,
  type InitInput,
} from '../../../dependencies/aeon-wasm/pkg/aeon_wasm.js';
import type { FileConvertorsInt } from './FileConvertorsInt.js';

/**
 * FileConvertors provides methods for AEON/SBML/BNet conversions.
 * All methods return a Promise and resolve to the result string, or reject with an error.
 * WASM is initialized automatically on first use.
 */
class FileConvertors implements FileConvertorsInt {
  private wasmInitialized: Promise<InitInput> | null = null;

  private async ensureWasmInitialized() {
    if (!this.wasmInitialized) {
      this.wasmInitialized = init();
    }
    await this.wasmInitialized;
  }

  public async aeonToSbml(aeonString: string): Promise<string> {
    await this.ensureWasmInitialized();
    try {
      return aeon_to_sbml(aeonString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async sbmlToAeon(sbmlString: string): Promise<string> {
    await this.ensureWasmInitialized();
    try {
      return sbml_to_aeon(sbmlString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async aeonToSbmlInstantiated(aeonString: string): Promise<string> {
    await this.ensureWasmInitialized();
    try {
      return aeon_to_sbml_instantiated(aeonString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async aeonToBnet(aeonString: string): Promise<string> {
    await this.ensureWasmInitialized();
    try {
      return aeon_to_bnet(aeonString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async bnetToAeon(bnetString: string): Promise<string> {
    await this.ensureWasmInitialized();
    try {
      return bnet_to_aeon(bnetString);
    } catch (e: any) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }
}

export default FileConvertors;
