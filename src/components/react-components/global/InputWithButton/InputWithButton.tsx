import { useState } from 'react';
import IconButtonReact from '../../lit-wrappers/IconButtonReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import type { InputWithButtonProps } from './InputWithButtonProps';

const InputWithButton: React.FC<InputWithButtonProps> = ({
  componentHeight = '26px',
  componentWidth = '100%',
  textColor,
  inputColor,
  inputBorderColor,
  inputHeight = '100%',
  inputWidth = '80%',
  inputTooltipFunction = () => {},
  placeholder = ' ',
  onWrite = () => {},
  onSubmit = () => {},
  buttonSize = '100%',
  buttonIcon,
  buttonColor,
  buttonHoverColor,
  buttonTooltipFunction = () => {},
  onButtonClick = () => {},
  clearTooltipFunction = () => {},
  value,
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const onWriteFunction = (newValue: string) => {
    onWrite(newValue);
    setCurrentValue(newValue);
  };

  return (
    <section
      className="flex items-center justify-between gap-2"
      style={{ height: componentHeight, width: componentWidth }}
    >
      <TextInputReact
        textColor={textColor}
        inputColor={inputColor}
        inputBorderColor={inputBorderColor}
        compHeight={inputHeight}
        compWidth={inputWidth}
        placeholder={placeholder}
        onWrite={(newValue) => onWriteFunction(newValue)}
        onSubmit={(newValue) => onSubmit(newValue)}
        value={currentValue}
        onMouseEnter={(e: React.MouseEvent) =>
          inputTooltipFunction(e.nativeEvent)
        }
        onMouseLeave={() => clearTooltipFunction()}
      />

      <IconButtonReact
        buttonSize={buttonSize}
        compHeight={componentHeight}
        iconSrc={buttonIcon}
        iconAlt=" "
        iconSize="60%"
        sizeBy="height"
        buttonColor={buttonColor}
        buttonHoverColor={buttonHoverColor}
        handleClick={() => onButtonClick(currentValue)}
        onMouseEnter={(e: React.MouseEvent) =>
          buttonTooltipFunction(e.nativeEvent)
        }
        onMouseLeave={() => clearTooltipFunction()}
      />
    </section>
  );
};

export default InputWithButton;
