import { useState } from 'react';
import type { VisualOptionsButtonSection } from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { VisualOptionsTabContentProps } from './VisualOptionsTabContentProps';

const VisualOptionsTabContent: React.FC<VisualOptionsTabContentProps> = ({
  modelVisualization,

  pageStringProviderServ,

  helpHoverStore,
}) => {
  const [activeButtons, setActiveButtons] = useState<Record<string, boolean>>({
    Phenotype: modelVisualization.isPhenotypeHighlighted(),
    'Control-Enabled': modelVisualization.isControlEnabledHighlighted(),
  });

  const layouts: VisualOptionsButtonSection = {
    headerText: 'Variable Layouts',
    buttons: [
      [
        'Organic',
        () => modelVisualization.layoutCose(),
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.variableLayout('Cose'),
              true,
              -50,
              150
            ),
        false,
      ],
      [
        'Hierarchical',
        () => modelVisualization.layoutDagre(),
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.variableLayout('Dagre'),
              true,
              -50,
              150
            ),
        false,
      ],
      [
        'Phenotype',
        () => modelVisualization.layoutPhenotype(),
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.variableLayout('Phenotype'),
              true,
              -50,
              150
            ),
        false,
      ],
      [
        'Control-Enabled',
        () => modelVisualization.layoutControlEnabled(),
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.variableLayout('Control-Enabled'),
              true,
              -50,
              150
            ),
        false,
      ],
    ],
  };

  const selectedLayouts: VisualOptionsButtonSection = {
    headerText: 'Selected Variable Layouts',
    buttons: [
      [
        'Hierarchical',
        () => modelVisualization.layoutDagre(true),
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.variableSelectedLayout('Dagre'),
              true,
              -50,
              150
            ),
        false,
      ],
    ],
  };

  const highlight: VisualOptionsButtonSection = {
    headerText: 'Highlight Variables',
    buttons: [
      [
        'Phenotype',
        () => {
          modelVisualization.highlightPhenotype();
          setActiveButtons((prev) => ({
            ...prev,
            Phenotype: !prev['Phenotype'],
          }));
        },
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.highlightVariable('Phenotype'),
              true,
              -50,
              150
            ),
        activeButtons['Phenotype'] ?? false,
      ],
      [
        'Control-Enabled',
        () => {
          modelVisualization.highlightControlEnabled();
          setActiveButtons((prev) => ({
            ...prev,
            'Control-Enabled': !prev['Control-Enabled'],
          }));
        },
        (e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.highlightVariable(
                'Control-Enabled'
              ),
              true,
              -50,
              150
            ),
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
            {firstHalf.map(([label, onClick, onMouseEnter, isActive]) => (
              <TextButtonReact
                key={label}
                text={label}
                handleClick={onClick}
                compWidth="100%"
                active={isActive}
                onMouseEnter={onMouseEnter}
                onMouseLeave={() => helpHoverStore.getState().clear()}
              />
            ))}
          </div>
          <div className="flex flex-col items-start w-[49%] h-fit gap-2">
            {secondHalf.map(([label, onClick, onMouseEnter, isActive]) => (
              <TextButtonReact
                key={label}
                text={label}
                handleClick={onClick}
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
      {renderButtonSection(layouts)}
      {renderButtonSection(selectedLayouts)}
      {renderButtonSection(highlight)}
    </div>
  );
};

export default VisualOptionsTabContent;
