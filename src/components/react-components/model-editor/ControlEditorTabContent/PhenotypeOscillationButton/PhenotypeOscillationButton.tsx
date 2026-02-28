import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { PhenotypeOscillationButtonProps } from './PhenotypeOscillationButtonProps';

const PhenotypeOscillationButton: React.FC<PhenotypeOscillationButtonProps> = ({
  controlEditorServ,
  oscillationValue,
  setOscillationValue,
  compWidth,
}) => {
  const circleThroughOscillation = () => {
    switch (oscillationValue) {
      case 'allowed':
        setOscillationValue('forbidden');
        controlEditorServ.setPhenotypeOscillation('forbidden');
        break;
      case 'forbidden':
        setOscillationValue('required');
        controlEditorServ.setPhenotypeOscillation('required');
        break;
      default:
        setOscillationValue('allowed');
        controlEditorServ.setPhenotypeOscillation('allowed');
    }
  };

  return (
    <TextButtonReact
      text={oscillationValue}
      handleClick={() => circleThroughOscillation()}
      compWidth={compWidth}
    />
  );
};

export default PhenotypeOscillationButton;
