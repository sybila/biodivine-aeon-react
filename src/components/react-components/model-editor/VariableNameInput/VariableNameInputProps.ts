export type VariableNameInputProps = {
  height: string;
  width: string;
  fontSize: string;
  varName: string;
  nameError: boolean;
  exposeInputRef: (reference: HTMLElement) => void;
  onKeyUp: (newName: string) => void;
};
