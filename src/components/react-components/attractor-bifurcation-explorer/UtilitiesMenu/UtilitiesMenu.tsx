import HorizontalHidableContentReact from '../../lit-wrappers/HorizontalHidableContentReact';
import type { UtilitiesMenuProps } from './UtilitiesMenuProps';

import type { ContentVisibleComponent } from '../../../../types';
import OneButtonSection from '../../global/OneButtonSection/OneButtonSection';
import ZoomSection from '../../global/ZoomSection/ZoomSection';

const UtilitiesMenu: React.FC<UtilitiesMenuProps> = ({
  attractorBifurcationExplorerServ,
  pageStringProviderServ,

  helpHoverStore,
  bifurcationExplorerStatusStore,
}) => {
  const gapInsideSection: string = '15px';

  const visualizationStatus = bifurcationExplorerStatusStore(
    (state) => state.visualizationStatus
  );

  const zoomStatus = visualizationStatus?.zoom;

  return (
    <HorizontalHidableContentReact
      ref={(el) =>
        bifurcationExplorerStatusStore
          .getState()
          .setUtilitiesMenuRef(el as ContentVisibleComponent)
      }
      className="absolute top-[55px] right-[12px] z-1"
      buttonRight={true}
      compHeight="280px"
      buttonWidth="25px"
      contentWidth="350px"
      buttonOnMouseEnter={(e) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.utilitiesMenu(),
            true,
            50,
            -110
          )
      }
      buttonOnMouseLeave={() => helpHoverStore.getState().clear()}
    >
      <div
        slot="content"
        className="flex flex-col h-full w-full justify-between p-[7px]"
      >
        <ZoomSection
          setZoomFunction={(zoomLevel: number) =>
            attractorBifurcationExplorerServ.setZoom(zoomLevel)
          }
          gapInsideSection={gapInsideSection}
          minValue={zoomStatus?.minZoom ?? 0}
          maxValue={zoomStatus?.maxZoom ?? 100}
          currentValue={zoomStatus?.currentZoom ?? 0}
        />

        <OneButtonSection
          gapInsideSection={gapInsideSection}
          headerText="Fit Into View"
          buttonText="Fit"
          buttonTooltipFunction={(e: MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                pageStringProviderServ.Tooltips.fit(),
                true,
                -50
              )
          }
          hideTooltipFunction={() => helpHoverStore.getState().clear()}
          onClick={() => {
            attractorBifurcationExplorerServ.fitTree();
          }}
        />

        <OneButtonSection
          gapInsideSection={gapInsideSection}
          headerText="Reset Layout"
          buttonText="Reset"
          buttonTooltipFunction={(e: MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                pageStringProviderServ.Tooltips.resetLayout(),
                true,
                -50
              )
          }
          hideTooltipFunction={() => helpHoverStore.getState().clear()}
          onClick={() => {
            attractorBifurcationExplorerServ.resetTreeLayout();
          }}
        />
      </div>
    </HorizontalHidableContentReact>
  );
};

export default UtilitiesMenu;
