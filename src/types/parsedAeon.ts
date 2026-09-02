import type { EdgeMonotonicity, PhenotypeStatus } from './types';

export type ParsedModelObject = {
  modelName: string;
  modelDescription: string;
  varPositions: Record<string, [number, number]>;
  regulations: {
    regulatorName: string;
    targetName: string;
    monotonicity: EdgeMonotonicity;
    observable: boolean;
  }[];
  updateFunctions: Record<string, string>;
  control: Record<string, [boolean, PhenotypeStatus]>;
  phenotypes: Array<{
    phenName: string;
    variables: { varName: string; phenValue: PhenotypeStatus }[];
  }>;
};

export type ParsedAeon =
  | ParsedRegulation
  | ParsedModelName
  | ParsedModelDescription
  | ParsedVariablePosition
  | ParsedUpdateFunction
  | ParsedVariableControl
  | ParsedPhenotype
  | null;

export type ParsedModelName = {
  type: 'name';
  data: string;
};

export type ParsedModelDescription = {
  type: 'description';
  data: string;
};

export type ParsedRegulation = {
  type: 'regulation';
  data: {
    regulatorName: string;
    targetName: string;
    monotonicity: EdgeMonotonicity;
    observable: boolean;
  };
};

export type ParsedVariablePosition = {
  type: 'position';
  data: {
    name: string;
    coords: [number, number];
  };
};

export type ParsedUpdateFunction = {
  type: 'updateFunction';
  data: {
    name: string;
    func: string;
  };
};

export type ParsedVariableControl = {
  type: 'control';
  data: {
    name: string;
    values: [boolean, PhenotypeStatus];
  };
};

export type ParsedPhenotype = {
  type: 'phenotype';
  data: {
    phenName: string;
    variables: { varName: string; phenValue: PhenotypeStatus }[];
  };
};
