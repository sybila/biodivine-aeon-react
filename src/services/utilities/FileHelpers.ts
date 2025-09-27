/** Utility functions for file operations (eg. downloading files) */
class FileHelpers {
  /** Download a file with the given file name and content */
  public static downloadFile(fileName: string, content: string): void {
    var el = document.createElement('a');
    el.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );
    el.setAttribute('download', fileName);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }
}
export default FileHelpers;
