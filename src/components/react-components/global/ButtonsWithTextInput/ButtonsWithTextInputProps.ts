import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ButtonsWithTextInputProps = {
  buttons: Array<{
    text: string;
    textInputPlaceholder: string;
    handleSubmit: (textInput: string) => void;
    buttonTooltipText: string;
    buttonActiveTooltipText: string;
    submitButtonTooltipText: string;
  }>;

  componentHeight?: string;
  componentWidth?: string;

  buttonsWidth?: string;

  buttonsColor: string;
  buttonsHoverColor: string;
  buttonsActiveColor: string;
  buttonsTextColor: string;

  /** Colour used for the text inside the input. */
  inputTextColor: string;
  /** Background colour of the input element. */
  inputColor: string;
  /** Border colour of the input element. */
  inputBorderColor: string;

  /** Path to the icon for the submit button which appears next to the text input. */
  submitButtonIcon: string;
  /** Colour used for the submit button which appears next to the text input. */
  submitButtonColor: string;
  /** Hover colour used for the submit button which appears next to the text input. */
  submitButtonHoverColor: string;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
