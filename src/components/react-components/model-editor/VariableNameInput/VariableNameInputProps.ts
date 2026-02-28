export type VariableNameInputProps = {
  height: string;
  width: string;
  singleFontSize: string;
  varId: number;
  varName: string;
  onUpdate: (id: number, newName: string) => boolean;
};
