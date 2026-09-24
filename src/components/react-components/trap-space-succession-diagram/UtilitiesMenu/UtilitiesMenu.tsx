import HorizontalHidableContentReact from '../../lit-wrappers/HorizontalHidableContentReact';
import type { UtilitiesMenuProps } from './UtilitiesMenuProps';

import type { ContentVisibleComponent } from '../../../../types/types';
import OneButtonSection from '../../global/OneButtonSection/OneButtonSection';
import ZoomSection from '../../global/ZoomSection/ZoomSection';

const UtilitiesMenu: React.FC<UtilitiesMenuProps> = ({
  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,

  helpHoverStore,
  trapSpaceSDStatusStore,
}) => {
  const gapInsideSection: string = '15px';

  const visualizationStatus = trapSpaceSDStatusStore(
    (state) => state.visualizationStatus
  );

  const zoomStatus = visualizationStatus?.zoom;

  return (
    <HorizontalHidableContentReact
      ref={(el) =>
        trapSpaceSDStatusStore
          .getState()
          .setUtilitiesMenuRef(el as ContentVisibleComponent)
      }
      className="absolute top-[55px] right-[12px] z-1"
      buttonRight={true}
      compHeight="280px"
      buttonWidth="25px"
      contentWidth="350px"
      compBgColor="var(--color-primary)"
      buttonHoverColor="var(--color-primary-buttons-hover)"
      buttonOnMouseEnter={(e) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            tooltipStringsServ.utilitiesMenuOpenCloseButton(),
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
            trapSpaceSDServ.setZoom(zoomLevel)
          }
          gapInsideSection={gapInsideSection}
          minValue={zoomStatus?.minZoom ?? 0}
          maxValue={zoomStatus?.maxZoom ?? 100}
          currentValue={zoomStatus?.currentZoom ?? 0}
        />

        <OneButtonSection
          gapInsideSection={gapInsideSection}
          headerText={generalStringsServ.fitIntoViewHeader()}
          buttonText={generalStringsServ.fitIntoViewButton()}
          headerTextColor="var(--color-primary-text)"
          buttonTextColor="var(--color-secondary-text)"
          buttonColor="var(--color-secondary-buttons)"
          buttonTooltipFunction={(e: MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(e, tooltipStringsServ.fitButton(), true, -50)
          }
          hideTooltipFunction={() => helpHoverStore.getState().clear()}
          onClick={() => {
            trapSpaceSDServ.fitTree();
          }}
        />

        <OneButtonSection
          gapInsideSection={gapInsideSection}
          headerText={generalStringsServ.resetLayoutHeader()}
          buttonText={generalStringsServ.resetLayoutButton()}
          headerTextColor="var(--color-primary-text)"
          buttonTextColor="var(--color-secondary-text)"
          buttonColor="var(--color-secondary-buttons)"
          buttonTooltipFunction={(e: MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                tooltipStringsServ.resetLayoutButton(),
                true,
                -50
              )
          }
          hideTooltipFunction={() => helpHoverStore.getState().clear()}
          onClick={() => {
            trapSpaceSDServ.resetTreeLayout();
          }}
        />
      </div>
    </HorizontalHidableContentReact>
  );
};

export default UtilitiesMenu;
