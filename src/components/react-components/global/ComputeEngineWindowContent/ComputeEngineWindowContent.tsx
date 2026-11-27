import config from '../../../../config';

import type { ComputeEngineWindowContentProps } from './ComputeEngineWindowContentProps';
import ComputeEngineWindowDesktopVersion from './ComputeEngineWindowDesktopVersion/ComputeEngineWindowDesktopVersion';
import ComputeEngineWindowWebVersion from './ComputeEngineWindowWebVersion/ComputeEngineWindowWebVersion';

const ComputeEngineWindowContent: React.FC<ComputeEngineWindowContentProps> = ({
  computationManagerServ,
  pageStringProviderServ,

  computeEngineStatusStore,
  helpHoverStore,
}) => {
  const otherStrings =
    pageStringProviderServ.OtherStrings.OverlayWindows.ComputeEngineMenu;
  const tooltips =
    pageStringProviderServ.Tooltips.OverlayWindowTooltips.ComputeEngineTooltips;

  return config.isDesktopApp ? (
    <ComputeEngineWindowDesktopVersion
      computationManagerServ={computationManagerServ}
      generalStringsProviderServ={otherStrings}
      tooltipsProviderServ={tooltips}
      computeEngineStatusStore={computeEngineStatusStore}
      helpHoverStore={helpHoverStore}
    />
  ) : (
    <ComputeEngineWindowWebVersion
      computeEngineDownloadLink={config.computeEngine.downloadLink}
      computationManagerServ={computationManagerServ}
      generalStringsProviderServ={otherStrings}
      tooltipsProviderServ={tooltips}
      computeEngineStatusStore={computeEngineStatusStore}
      helpHoverStore={helpHoverStore}
    />
  );
};

export default ComputeEngineWindowContent;
