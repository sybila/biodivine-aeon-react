import { useState } from 'react';
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

  rerenderOnValueUpdate = false,
}) => {
  const [error, setError] = useState(false);
  const [forceRerender, setForceRerender] = useState(0);

  const handleUpdate = (
    newValue: string,
    updateFunction: (newVal: string) => void
  ) => {
    setError(checkError(newValue));
    updateFunction(newValue);

    if (rerenderOnValueUpdate) {
      setForceRerender((forceRerender + 1) % 10);
    }
  };

  return (
    <InvisibleInputReact
      key={forceRerender}
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
      value={value}
      onMouseEnter={(e: React.MouseEvent) => showTooltipFunction(e.nativeEvent)}
      onMouseLeave={() => hideTooltipFunction()}
    />
  );
};

export default InvisibleInputWithError;
