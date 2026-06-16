import AttractorBifurcationExplorerPageStrings from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStrings';
import type { AttractorBifurcationExplorerPageStringsInt } from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import SelectionButtonsTooltips from './common-tooltips/SelectionButtonTooltips';
import HelpTexts from './HelpTexts/HelpTexts';
import type { HelpTextsInt } from './HelpTexts/HelpTextsInt';
import ModelEditorPageStrings from './ModelEditorPageStrings/ModelEditorPageStrings';
import type { ModelEditorPageStringsInt } from './ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { StringProviderInt } from './StringProviderInt';
import ToolTips from './ToolTips/ToolTips';
import type { ToolTipsInt } from './ToolTips/ToolTipsInt';

class StringProvider
  extends SelectionButtonsTooltips
  implements StringProviderInt
{
  public ModelEditorPage: ModelEditorPageStringsInt;
  public AttractorBifurcationExplorerPage: AttractorBifurcationExplorerPageStringsInt;
  public ToolTips: ToolTipsInt;
  public HelpTexts: HelpTextsInt;

  constructor() {
    super();

    this.ModelEditorPage = new ModelEditorPageStrings();
    this.AttractorBifurcationExplorerPage = new AttractorBifurcationExplorerPageStrings();
    this.ToolTips = new ToolTips();
    this.HelpTexts = new HelpTexts();
  }
}

export default StringProvider;
