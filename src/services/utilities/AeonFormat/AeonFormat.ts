import type { AeonFormatInt } from './AeonFormatInt';

class AeonFormat implements AeonFormatInt {
  // #region --- Model Description  ---
  public getRegexModelDescription() {
    return /^\s*#description:(.+)$/;
  }
  // #endregion

  // #region --- Model Name  ---
  public getRegexModelName() {
    return /^\s*#name:(.+)$/;
  }
  // #endregion

  // #region --- Position  ---
  public getRegexPosition() {
    return /^\s*#position:([a-zA-Z0-9_{}]+):(.+?),(.+?)\s*$/;
  }
  // #endregion

  // #region --- Regulation  ---
  public getRegexRegulation() {
    return /^\s*([a-zA-Z0-9_{}]+)\s*-([>|?])(\??)\s*([a-zA-Z0-9_{}]+)\s*$/;
  }
  // #endregion

  // #region --- Update Function  ---
  public getRegexUpdateFunction() {
    return /^\s*\$\s*([a-zA-Z0-9_{}]+)\s*:\s*(.+)\s*$/;
  }
  // #endregion

  // #region --- Control  ---
  public getRegexControl() {
    return /^\s*#!control:([a-zA-Z0-9_{}]+):(true|false),(true|false|null)\s*$/;
  }
  // #endregion

  // #region --- Phenotype  ---
  public getRegexPhenotypePrefix() {
    return /^\s*#!phen:([a-zA-Z0-9_{}]+)/;
  }

  public getRegexPhenotypeVariable() {
    return /([a-zA-Z0-9_{}]+)\s+(true|false|null)/g;
  }
  // #endregion

  // #region --- Results  ---
  public getRegexResults() {
    return /^\s*#!results:\s*(attractor|control)\s*:\s*(.+)\s*$/;
  }
  // #endregion

  // #region --- Comment ---
  public getRegexComment() {
    return /^\s*#.*?$/;
  }
  // #endregion
}

export default AeonFormat;
