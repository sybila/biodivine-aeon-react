import type React from 'react';
import type { Oscillation } from '../../../../../types';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { PhenotypeOscillationButtonProps } from './PhenotypeOscillationButtonProps';

const PhenotypeOscillationButton: React.FC<PhenotypeOscillationButtonProps> = ({
  controlEditorServ,
  oscillationValue,
  setOscillationValue,
  compWidth,

  stringProviderServ,

  helpHoverStore,
}) => {
  const getNextOscillation = (current: Oscillation): Oscillation => {
    switch (current) {
      case 'allowed':
        return 'forbidden';
      case 'forbidden':
        return 'required';
      default:
        return 'allowed';
    }
  };

  const circleThroughOscillation = () => {
    const nextOscillation = getNextOscillation(oscillationValue);
    setOscillationValue(nextOscillation);
    helpHoverStore
      .getState()
      .setHelpHoverText(
        stringProviderServ.ToolTips.ModelEditorTooltips.changeOscillation(
          getNextOscillation(nextOscillation)
        )
      );
    controlEditorServ.setPhenotypeOscillation(nextOscillation);
  };

  return (
    <TextButtonReact
      text={oscillationValue}
      handleClick={() => circleThroughOscillation()}
      compWidth={compWidth}
      onMouseEnter={(e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            stringProviderServ.ToolTips.ModelEditorTooltips.changeOscillation(
              getNextOscillation(oscillationValue)
            ),
            true,
            -50
          )
      }
      onMouseLeave={() => helpHoverStore.getState().clear()}
    />
  );
};

export default PhenotypeOscillationButton;
