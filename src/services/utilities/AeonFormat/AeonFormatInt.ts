export interface AeonFormatInt {
  // #region --- Model Description  ---
  getRegexModelDescription(): RegExp;
  // #endregion

  // #region --- Model Name  ---
  getRegexModelName(): RegExp;
  // #endregion

  // #region --- Position  ---
  getRegexPosition(): RegExp;
  // #endregion

  // #region --- Regulation  ---
  getRegexRegulation(): RegExp;
  // #endregion

  // #region --- Update Function  ---
  getRegexUpdateFunction(): RegExp;
  // #endregion

  // #region --- Control  ---
  getRegexControl(): RegExp;
  // #endregion

  // #region --- Phenotype  ---
  getRegexPhenotypePrefix(): RegExp;
  getRegexPhenotypeVariable(): RegExp;
  // #endregion

  // #region --- Comment ---
  getRegexComment(): RegExp;
  // #endregion
}
