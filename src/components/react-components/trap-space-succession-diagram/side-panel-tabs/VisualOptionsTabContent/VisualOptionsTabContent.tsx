import { useState } from 'react';
import type {
  VisualOptionsButtonSection,
  VisualOptionsSwitchableTSSD,
} from '../../../../../types/types';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { VisualOptionsTabContentProps } from './VisualOptionsTabContentProps';

const VisualOptionsTabContent: React.FC<VisualOptionsTabContentProps> = ({
  trapSpaceSDServ,

  generalStringsServ,
  tooltipStringsServ,

  helpHoverStore,
}) => {
  const [activeButtons, setActiveButtons] =
    useState<VisualOptionsSwitchableTSSD>(
      trapSpaceSDServ.getSwitchableOptionsState()
    );

  const layoutOptions: VisualOptionsButtonSection = {
    headerText: generalStringsServ.layoutOptionsHeader(),
    buttons: [
      [
        generalStringsServ.animateLayoutChangesButton(),
        () => {
          trapSpaceSDServ.toggleAnimateLayoutChanges();
          setActiveButtons((prev) => ({ ...prev, animate: !prev.animate }));
        },
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              tooltipStringsServ.animateLayoutChangesButton(),
              true,
              -50,
              150
            ),
        activeButtons.animate ?? false,
      ],
      [
        generalStringsServ.snapNodesToLayersButton(),
        () => {
          trapSpaceSDServ.toggleSnapNodesToLayers();
          setActiveButtons((prev) => ({
            ...prev,
            snapLayers: !prev.snapLayers,
          }));
        },
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              tooltipStringsServ.snapNodesToLayersButton(),
              true,
              -50,
              150
            ),
        activeButtons.snapLayers ?? false,
      ],
    ],
  };

  const renderButtonSection = (section: VisualOptionsButtonSection) => {
    const firstHalf = section.buttons.slice(
      0,
      Math.ceil(section.buttons.length / 2)
    );
    const secondHalf = section.buttons.slice(
      Math.ceil(section.buttons.length / 2)
    );

    return (
      <>
        <DotHeaderReact
          headerText={section.headerText}
          compWidth="100%"
          justifyHeader="start"
        />
        <section className="flex flex-row items-start justify-center w-full h-fit gap-1 mb-2 overflow-visible">
          <div className="flex flex-col justify-center items-center w-[47%] h-fit gap-2">
            {firstHalf.map(([label, onClick, onMouseEnter, isActive]) => (
              <TextButtonReact
                key={label}
                text={label}
                handleClick={onClick}
                compWidth="100%"
                active={isActive}
                buttonColor="var(--color-secondary-buttons)"
                buttonHoverColor="var(--color-secondary-buttons-hover)"
                buttonActiveColor="var(--color-secondary-buttons-active)"
                textColor="var(--color-secondary-text)"
                onMouseEnter={onMouseEnter}
                onMouseLeave={() => helpHoverStore.getState().clear()}
              />
            ))}
          </div>
          <div className="flex flex-col justify-center items-center w-[47%] h-fit gap-2">
            {secondHalf.map(([label, onClick, onMouseEnter, isActive]) => (
              <TextButtonReact
                key={label}
                text={label}
                handleClick={onClick}
                buttonColor="var(--color-secondary-buttons)"
                buttonHoverColor="var(--color-secondary-buttons-hover)"
                buttonActiveColor="var(--color-secondary-buttons-active)"
                textColor="var(--color-secondary-text)"
                compWidth="100%"
                active={isActive}
                onMouseEnter={onMouseEnter}
                onMouseLeave={() => helpHoverStore.getState().clear()}
              />
            ))}
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-fit max-h-[400px] overflow-auto gap-3">
      {renderButtonSection(layoutOptions)}
    </div>
  );
};

export default VisualOptionsTabContent;
