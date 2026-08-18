import { useState } from 'react';
import type {
  VisualOptionsButtonSection,
  VisualOptionsSwitchableABE,
} from '../../../../types/types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import ValueSliderReact from '../../lit-wrappers/ValueSliderReact';
import type { VisualOptionsTabContentProps } from './VisualOptionsTabContentProps';

const VisualOptionsTabContent: React.FC<VisualOptionsTabContentProps> = ({
  attractorBifurcationExplorerServ,

  pageStringProviderServ,

  helpHoverStore,
}) => {
  const [activeButtons, setActiveButtons] =
    useState<VisualOptionsSwitchableABE>(
      attractorBifurcationExplorerServ.getSwitchableOptionsState()
    );

  const [precision, setPrecision] = useState<number>(
    attractorBifurcationExplorerServ.getLastPrecision()
  );

  const layoutOptions: VisualOptionsButtonSection = {
    headerText: 'Layout Options',
    buttons: [
      [
        'Animate Layout Changes',
        () => {
          attractorBifurcationExplorerServ.toggleAnimateLayoutChanges();
          setActiveButtons((prev) => ({ ...prev, animate: !prev.animate }));
        },
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.animateLayoutChanges(),
              true,
              -50,
              150
            ),
        activeButtons.animate ?? false,
      ],
      [
        'Snap Nodes To Layers',
        () => {
          attractorBifurcationExplorerServ.toggleSnapNodesToLayers();
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
              pageStringProviderServ.Tooltips.snapNodesToLayers(),
              true,
              -50,
              150
            ),
        activeButtons.snapLayers ?? false,
      ],
      [
        'Positive On the Left',
        () => {
          attractorBifurcationExplorerServ.togglePositiveOnLeft();
          setActiveButtons((prev) => ({
            ...prev,
            positiveOnLeft: !prev.positiveOnLeft,
          }));
        },
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.positiveOnLeft(),
              true,
              -50,
              150
            ),
        activeButtons.positiveOnLeft ?? false,
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

  const renderPrecisionSlider = () => {
    return (
      <section className="flex flex-row justify-around items-center h-[40px] w-full gap-2 mb-2">
        <DotHeaderReact
          compHeight="95%"
          compWidth="50%"
          headerText={`Precision ${precision}%`}
          justifyHeader="start"
          textColor="var(--color-primary-text)"
        />
        <div className="h-full w-1/2 flex flex-row justify-center items-center">
          <ValueSliderReact
            className="flex flex-row justify-center items-center"
            compHeight="30px"
            compWidth="90%"
            value={precision}
            handleInput={setPrecision}
            handleChange={(newPrecision: number) => {
              setPrecision(newPrecision);
              attractorBifurcationExplorerServ.setPrecision(newPrecision);
            }}
            step={0.01}
            minValue={50}
            maxValue={100}
            sliderThumbBackgroundColor="var(--color-secondary-slider-thumb)"
            bodyBackgroundColor="var(--color-secondary-slider)"
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  pageStringProviderServ.Tooltips.changePrecision(),
                  true,
                  -50,
                  150
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-fit max-h-[400px] overflow-auto gap-3">
      {renderButtonSection(layoutOptions)}
      {renderPrecisionSlider()}
    </div>
  );
};

export default VisualOptionsTabContent;
