/** Interface containing utility functions for file operations (eg. downloading files) */
export interface FileHelpersInt {
  /** Download a file with the given file name and content */
  downloadFile(fileName: string, content: string): void;
}
