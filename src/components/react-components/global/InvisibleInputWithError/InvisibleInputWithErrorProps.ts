export type InvisibleInputWithErrorProps = {
  height?: string;
  width?: string;
  textColor?: string;
  editable?: boolean;

  onChange?: (newValue: string) => void;
  onSubmit?: (newValue: string) => void;

  checkError?: (text: string) => boolean;

  showTooltipFunction?: (event: MouseEvent) => void;
  hideTooltipFunction?: () => void;

  value?: string;

  rerenderOnValueUpdate?: boolean;
};
