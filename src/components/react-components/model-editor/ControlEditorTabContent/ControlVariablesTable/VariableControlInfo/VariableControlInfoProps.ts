export type VariableControlInfoProps = {
  id: number;
  name: string;
  hover: boolean;
  selected: boolean;
  toggleSelect: (variableName: string) => void;
};
