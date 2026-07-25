import type React from 'react';
import type { Oscillation } from '../../../../../types';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { PhenotypeOscillationButtonProps } from './PhenotypeOscillationButtonProps';

const PhenotypeOscillationButton: React.FC<PhenotypeOscillationButtonProps> = ({
  phenotypeEditorServ,
  oscillationValue,
  setOscillationValue,
  compWidth,

  pageStringProviderServ,

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
        pageStringProviderServ.Tooltips.changeOscillation(
          getNextOscillation(nextOscillation)
        )
      );
    phenotypeEditorServ.setPhenotypeOscillation(nextOscillation);
  };

  return (
    <TextButtonReact
      buttonColor="var(--color-secondary-buttons)"
      buttonHoverColor="var(--color-secondary-buttons-hover)"
      textColor="var(--color-secondary-text)"
      text={oscillationValue}
      handleClick={() => circleThroughOscillation()}
      compWidth={compWidth}
      onMouseEnter={(e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            pageStringProviderServ.Tooltips.changeOscillation(
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
