export type VariableControlInfoProps = {
  id: number;
  name: string;
  hover: boolean;
  selected: boolean;
  toggleSelect: (variableId: number) => void;
};
