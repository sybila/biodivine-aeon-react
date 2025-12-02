import type { Oscillation } from '../../../../../types';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import ControlEditor from '../../../../../services/model-editor/ControlEditor/ControlEditor';

const PhenotypeOscillationButton: React.FC<{
  oscillationValue: Oscillation;
  setOscillationValue: (value: Oscillation) => void;
  compWidth?: string;
}> = ({ oscillationValue, setOscillationValue, compWidth }) => {
  const circleThroughOscillation = () => {
    switch (oscillationValue) {
      case 'allowed':
        setOscillationValue('forbidden');
        ControlEditor.setPhenotypeOscillation('forbidden');
        break;
      case 'forbidden':
        setOscillationValue('required');
        ControlEditor.setPhenotypeOscillation('required');
        break;
      default:
        setOscillationValue('allowed');
        ControlEditor.setPhenotypeOscillation('allowed');
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
