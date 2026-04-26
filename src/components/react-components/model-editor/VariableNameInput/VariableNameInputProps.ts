export type VariableNameInputProps = {
  height: string;
  width: string;
  fontSize: string;
  varId: number;
  varName: string;
  onUpdate: (id: number, newName: string) => boolean;
};
