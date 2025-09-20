import { useState } from 'react';
import CytoscapeME from '../../../../services/model-editor/CytoscapeME/CytoscapeME';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { VisualOptionsButtonSection } from '../../../../types';

const VisualOptionsTabContent = () => {
  const [activeButtons, setActiveButtons] = useState<Record<string, boolean>>({
    Phenotype: CytoscapeME.isPhenotypeHighlighted(),
    'Control-Enabled': CytoscapeME.isControlEnabledHighlighted(),
  });

  const layouts: VisualOptionsButtonSection = {
    headerText: 'Variable Layouts',
    buttons: [
      ['Organic', () => CytoscapeME.layoutCose(), false],
      ['Hierarchical', () => CytoscapeME.layoutDagre(), false],
      ['Phenotype', () => CytoscapeME.layoutPhenotype(), false],
      ['Control-Enabled', () => CytoscapeME.layoutControlEnabled(), false],
    ],
  };

  const highlight: VisualOptionsButtonSection = {
    headerText: 'Highlight Variables',
    buttons: [
      [
        'Phenotype',
        () => {
          CytoscapeME.highlightPhenotype();
          setActiveButtons((prev) => ({
            ...prev,
            Phenotype: !prev['Phenotype'],
          }));
        },
        activeButtons['Phenotype'] ?? false,
      ],
      [
        'Control-Enabled',
        () => {
          CytoscapeME.highlightControlEnabled();
          setActiveButtons((prev) => ({
            ...prev,
            'Control-Enabled': !prev['Control-Enabled'],
          }));
        },
        activeButtons['Control-Enabled'] ?? false,
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
        <section className="flex flex-row items-center justify-between w-full h-fit gap-1 mb-2 overflow-visible">
          <div className="flex flex-col items-start w-[49%] h-fit gap-2">
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
          <div className="flex flex-col items-start w-[49%] h-fit gap-2">
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

  return (
    <div className="flex flex-col items-center w-full h-fit max-h-[400px] overflow-auto gap-3">
      {renderButtonSection(layouts)}
      {renderButtonSection(highlight)}
    </div>
  );
};

export default VisualOptionsTabContent;
