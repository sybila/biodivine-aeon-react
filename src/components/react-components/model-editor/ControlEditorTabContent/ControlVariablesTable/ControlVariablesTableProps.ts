export type ControlVariablesTableProps = {
  searchText: string | undefined;
  selectedVariables: Record<number, boolean>;
  setSelectedVariables: (newSelected: Record<number, boolean>) => void;
};
