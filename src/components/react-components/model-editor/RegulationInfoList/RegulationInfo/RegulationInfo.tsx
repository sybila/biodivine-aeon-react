import { useState } from 'react';
import type { RegulationInfoProps } from './RegulationInfoProps';

const RegulationInfo: React.FC<RegulationInfoProps> = ({
  regulator,
  target,
  observable,
  monotonicity,
  hover,
  selected,

  normalTextColor,
  hoverColor,
  selectedColor,

  modelEditorServ,
  pageStringProviderServ,

  variablesStore,
  helpHoverStore,
}) => {
  const [localHovered, setLocalHovered] = useState(hover);
  const regulatorVar = variablesStore((state) =>
    state.variableFromId(regulator)
  );

  const isHovered = hover || localHovered;

  const getRegulationIcon = () => {
    switch (monotonicity) {
      case 'activation':
        return `->${observable ? '' : '?'}`;
      case 'inhibition':
        return `-|${observable ? '' : '?'}`;
      case 'unspecified':
        return `-?${observable ? '' : '?'}`;
    }
  };

  const getObservable = () => {
    const color: string = observable
      ? 'var(--color-regulation-observable)'
      : 'var(--color-regulation-non-observable)';

    return (
      <span
        className="h-fit w-[30%] max-w-[30%] overflow-x-auto overflow-y-hidden text-center hover:font-(family-name:--font-family-fira-bold) cursor-pointer"
        style={{ color: color }}
        onClick={() => {
          modelEditorServ.toggleRegulationObservability(regulator, target);
        }}
        onMouseEnter={(e: React.MouseEvent) => {
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.changeObservability(),
              true,
              -50
            );
        }}
        onMouseLeave={() => helpHoverStore.getState().clear()}
      >
        {observable ? 'observable' : 'non-observable'}
      </span>
    );
  };

  const getMonotonicity = () => {
    let color: string = 'black';

    switch (monotonicity) {
      case 'activation':
        color = 'var(--color-regulation-activation)';
        break;
      case 'inhibition':
        color = 'var(--color-regulation-inhibition)';
        break;
      case 'unspecified':
        color = 'var(--color-regulation-unspecified)';
        break;
    }

    return (
      <span
        className="h-fit w-[30%] max-w-[30%] overflow-x-auto overflow-y-hidden text-center hover:font-(family-name:--font-family-fira-bold) cursor-pointer"
        style={{ color: color }}
        onClick={() => {
          modelEditorServ.toggleRegulationMonocity(regulator, target);
        }}
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.changeMonotonicity(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      >
        {monotonicity}
      </span>
    );
  };

  const getRegulationBgColor: () => string = () => {
    if (selected) {
      return selectedColor;
    } else if (isHovered) {
      return hoverColor;
    }

    return 'transparent';
  };

  if (!regulatorVar) return;

  return (
    <div
      className="min-h-[24px] max-h-[40px] w-full flex justify-start items-center font-(family-name:--font-family-fira-mono) 
        leading-[100%] text-[98%] select-none"
      style={{ backgroundColor: getRegulationBgColor() }}
      onMouseEnter={() => {
        modelEditorServ.hoverRegulationCytoscape({ regulator, target }, true);
        setLocalHovered(true);
      }}
      onMouseLeave={() => {
        modelEditorServ.hoverRegulationCytoscape({ regulator, target }, false);
        setLocalHovered(false);
      }}
    >
      <span
        className="h-auto w-[26%] max-w-[26%] overflow-x-auto overflow-y-hidden text-end text-[16px]"
        style={{ scrollbarWidth: 'thin', color: normalTextColor }}
      >
        {regulatorVar.name ?? 'Unknown'}
      </span>
      <span
        className="h-auto w-[8%] max-w-[8%] overflow-x-auto overflow-y-hidden text-center"
        style={{ color: normalTextColor }}
      >
        {getRegulationIcon()}
      </span>

      {getObservable()}
      {getMonotonicity()}
    </div>
  );
};

export default RegulationInfo;
