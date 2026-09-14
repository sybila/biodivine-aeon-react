/**
 * Interface which defines methods for AEON/SBML/BNet conversions.
 */
export interface FileConvertorsInt {
  /** Converts AEON string to SBML format. Returns a Promise resolving to the result string, or rejecting with an error. */
  aeonToSbml(aeonString: string): Promise<string>;

  /** Converts SBML string to AEON format. Returns a Promise resolving to the result string, or rejecting with an error. */
  sbmlToAeon(sbmlString: string): Promise<string>;

  /** Converts AEON string to instantiated SBML format. Returns a Promise resolving to the result string, or rejecting with an error. */
  aeonToSbmlInstantiated(aeonString: string): Promise<string>;

  /** Converts AEON string to BNet format. Returns a Promise resolving to the result string, or rejecting with an error. */
  aeonToBnet(aeonString: string): Promise<string>;

  /** Converts BNet string to AEON format. Returns a Promise resolving to the result string, or rejecting with an error. */
  bnetToAeon(bnetString: string): Promise<string>;
}
