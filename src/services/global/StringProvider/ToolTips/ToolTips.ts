import GlobalTooltips from './GlobalTooltips/GlobalTooltips';
import type { GlobalTooltipsInt } from './GlobalTooltips/GlobalTooltipsInt';
import ModelEditorTooltips from './ModelEditorTooltips/ModelEditorTooltips';
import type { ModelEditorTooltipsInt } from './ModelEditorTooltips/ModelEditorTooltipsInt';
import type { ToolTipsInt } from './ToolTipsInt';

class ToolTips implements ToolTipsInt {
  public GlobalTooltips: GlobalTooltipsInt;
  public ModelEditorTooltips: ModelEditorTooltipsInt;

  constructor() {
    this.GlobalTooltips = new GlobalTooltips();
    this.ModelEditorTooltips = new ModelEditorTooltips();
  }
}

export default ToolTips;
