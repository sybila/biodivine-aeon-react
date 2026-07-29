import { useState } from 'react';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import InputWithButton from '../InputWithButton/InputWithButton';
import type { ButtonsWithTextInputProps } from './ButtonsWithTextInputProps';

const ButtonsWithTextInput: React.FC<ButtonsWithTextInputProps> = ({
  buttons,

  componentHeight = '40px',
  componentWidth = '100%',

  buttonsWidth = '15%',

  buttonsColor,
  buttonsHoverColor,
  buttonsActiveColor,
  buttonsTextColor,

  inputTextColor,
  inputColor,
  inputBorderColor,

  submitButtonIcon,
  submitButtonColor,
  submitButtonHoverColor,

  helpHoverStore,
}) => {
  const [activeButton, setActiveButton] = useState<
    | {
        text: string;
        textInputPlaceholder: string;
        handleSubmit: (textInput: string) => void;
        buttonTooltipText: string;
        buttonActiveTooltipText: string;
        submitButtonTooltipText: string;
      }
    | undefined
  >(undefined);

  return (
    <section
      className="flex flex-none items-center justify-start gap-3 px-2 py-1 box-border"
      style={{ height: componentHeight, width: componentWidth }}
    >
      {activeButton != undefined ? (
        <div className="h-full w-full flex items-center justify-between">
          <TextButtonReact
            buttonHeight="100%"
            buttonWidth="100%"
            compWidth={buttonsWidth}
            buttonColor={buttonsColor}
            buttonHoverColor={buttonsHoverColor}
            buttonActiveColor={buttonsActiveColor}
            textColor={buttonsTextColor}
            compHeight="90%"
            active={true}
            text={activeButton.text ?? ''}
            handleClick={() => {
              setActiveButton(undefined);
            }}
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  activeButton.buttonActiveTooltipText,
                  true,
                  -50
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />

          <InputWithButton
            componentHeight="98%"
            componentWidth="80%"
            inputHeight="80%"
            inputWidth="94%"
            buttonSize="97%"
            textColor={inputTextColor}
            inputColor={inputColor}
            inputBorderColor={inputBorderColor}
            buttonIcon={submitButtonIcon}
            buttonColor={submitButtonColor}
            buttonHoverColor={submitButtonHoverColor}
            placeholder={activeButton.textInputPlaceholder}
            buttonTooltipFunction={(e: MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e,
                  activeButton.submitButtonTooltipText,
                  true,
                  -50
                )
            }
            clearTooltipFunction={() => helpHoverStore.getState().clear()}
            onButtonClick={(newValue: string) => {
              if (activeButton) activeButton.handleSubmit(newValue);
            }}
            value=""
          />
        </div>
      ) : (
        buttons.map((but) => {
          return (
            <TextButtonReact
              buttonHeight="100%"
              buttonWidth="100%"
              compHeight="90%"
              compWidth={buttonsWidth}
              buttonColor={buttonsColor}
              buttonHoverColor={buttonsHoverColor}
              buttonActiveColor={buttonsActiveColor}
              textColor={buttonsTextColor}
              text={but.text}
              handleClick={() => {
                setActiveButton(but);
              }}
              onMouseEnter={(e: React.MouseEvent) =>
                helpHoverStore
                  .getState()
                  .setHelpHoverAtMouse(
                    e.nativeEvent,
                    but.buttonTooltipText,
                    true,
                    -50
                  )
              }
              onMouseLeave={() => helpHoverStore.getState().clear()}
            />
          );
        })
      )}
    </section>
  );
};

export default ButtonsWithTextInput;
