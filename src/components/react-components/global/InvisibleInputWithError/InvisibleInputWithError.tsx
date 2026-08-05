import { useEffect, useState } from 'react';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import type { InvisibleInputWithErrorProps } from './InvisibleInputWithErrorProps';

const InvisibleInputWithError: React.FC<InvisibleInputWithErrorProps> = ({
  height = '30px',
  width = '60px',
  textColor = 'var(--color-secondary-text)',
  onChange = undefined,
  onSubmit = undefined,

  showTooltipFunction = () => {},
  hideTooltipFunction = () => {},

  checkError = (_: string) => false,

  value = '',
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCurrentValue(value);
    setError(checkError(value));
  }, [value, checkError]);

  const handleUpdate = (
    newValue: string,
    updateFunction: (newVal: string) => void
  ) => {
    setCurrentValue(newValue);
    setError(checkError(newValue));
    updateFunction(newValue);
  };

  return (
    <InvisibleInputReact
      compHeight={height}
      compWidth={width}
      textColor={textColor}
      handleSubmit={(val) =>
        onSubmit ? handleUpdate(val, onSubmit) : () => {}
      }
      handleChange={(val) =>
        onChange ? handleUpdate(val, onChange) : () => {}
      }
      error={error}
      value={currentValue}
      onMouseEnter={(e: React.MouseEvent) => showTooltipFunction(e.nativeEvent)}
      onMouseLeave={() => hideTooltipFunction()}
    />
  );
};

export default InvisibleInputWithError;
