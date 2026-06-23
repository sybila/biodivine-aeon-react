export type VariableNameInputProps = {
  height: string;
  width: string;
  fontSize: string;
  varId: number;
  varName: string;
  exposeInputRef: (reference: HTMLElement) => void;
  onUpdate: (id: number, newName: string) => boolean;
};
