import { useState } from 'react';
import AttractorBifurcationExplorer from '../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import type {
  VisualOptionsButtonSection,
  VisualOptionsSwitchableABE,
} from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import ValueSliderReact from '../../lit-wrappers/ValueSliderReact';

const VisualOptionsTabContent = () => {
  const [activeButtons, setActiveButtons] =
    useState<VisualOptionsSwitchableABE>(
      AttractorBifurcationExplorer.getSwitchableOptionsState()
    );

  const [precision, setPrecision] = useState<number>(
    AttractorBifurcationExplorer.getLastPrecision()
  );

  const resetLayout: VisualOptionsButtonSection = {
    headerText: 'Reset Layout',
    buttons: [
      ['Fit', () => AttractorBifurcationExplorer.fitTree(), false],
      [
        'Reset Layout',
        () => AttractorBifurcationExplorer.resetTreeLayout(),
        false,
      ],
    ],
  };

  const layoutOptions: VisualOptionsButtonSection = {
    headerText: 'Layout Options',
    buttons: [
      [
        'Animate Layout Changes',
        () => {
          AttractorBifurcationExplorer.toggleAnimateLayoutChanges();
          setActiveButtons((prev) => ({ ...prev, animate: !prev.animate }));
        },
        activeButtons.animate ?? false,
      ],
      [
        'Snap Nodes To Layers',
        () => {
          AttractorBifurcationExplorer.toggleSnapNodesToLayers();
          setActiveButtons((prev) => ({
            ...prev,
            snapLayers: !prev.snapLayers,
          }));
        },
        activeButtons.snapLayers ?? false,
      ],
      [
        'Positive On the Left',
        () => {
          AttractorBifurcationExplorer.togglePositiveOnLeft();
          setActiveButtons((prev) => ({
            ...prev,
            positiveOnLeft: !prev.positiveOnLeft,
          }));
        },
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
            {firstHalf.map(([label, onClick, isActive]) => (
              <TextButtonReact
                key={label}
                text={label}
                handleClick={onClick}
                compWidth="100%"
                active={isActive}
              />
            ))}
          </div>
          <div className="flex flex-col justify-center items-center w-[47%] h-fit gap-2">
            {secondHalf.map(([label, onClick, isActive]) => (
              <TextButtonReact
                key={label}
                text={label}
                handleClick={onClick}
                compWidth="100%"
                active={isActive}
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
              AttractorBifurcationExplorer.setPrecision(newPrecision);
            }}
            step={0.01}
            minValue={50}
            maxValue={100}
          />
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-fit max-h-[400px] overflow-auto gap-3">
      {renderButtonSection(resetLayout)}
      {renderButtonSection(layoutOptions)}
      {renderPrecisionSlider()}
    </div>
  );
};

export default VisualOptionsTabContent;
