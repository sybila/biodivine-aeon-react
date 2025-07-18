import { useEffect, useState } from 'react';
import type { Regulation, Variable } from '../../../../types';
import ModelEditor from '../../../../services/model-editor/ModelEditor/ModelEditor';

const RegulationInfo: React.FC<Regulation> = ({
  regulator,
  observable,
  monotonicity,
}) => {
  const [regulatorVar, setRegulatorVar] = useState<Variable | undefined>(
    undefined
  );

  useEffect(() => {
    setRegulatorVar(ModelEditor.getVariableById(regulator));
  }, [regulator]);

  const getRegulationIcon = () => {
    switch (monotonicity) {
      case 'activation':
        return `->${observable ? '' : '?'}`;
      case 'inhibition':
        return `-|${observable ? '' : '?'}`;
      case 'unspecified':
        return `-?${observable ? '' : '?'}`;
    }
  };

  const getObservable = () => {
    if (observable) {
      return (
        <span className="h-full w-[30%] max-w-[30%] overflow-x-auto overflow-y-hidden text-black text-center hover:font-(family-name:--font-family-fira-bold) cursor-pointer">
          observable
        </span>
      );
    }

    return (
      <span className="h-full w-[30%] max-w-[30%] overflow-x-auto overflow-y-hidden text-gray-400 text-center hover:font-(family-name:--font-family-fira-bold) cursor-pointer">
        non-observable
      </span>
    );
  };

  const getMonocity = () => {
    switch (monotonicity) {
      case 'activation':
        return (
          <span className="h-full w-[30%] max-w-[30%] overflow-x-auto overflow-y-hidden text-green-400 text-center hover:font-(family-name:--font-family-fira-bold) cursor-pointer">
            activation
          </span>
        );
      case 'inhibition':
        return (
          <span className="h-full w-[30%] max-w-[30%] overflow-x-auto overflow-y-hidden text-red-500 text-center hover:font-(family-name:--font-family-fira-bold) cursor-pointer">
            inhibition
          </span>
        );
      case 'unspecified':
        return (
          <span className="h-full w-[30%] max-w-[30%] overflow-x-auto overflow-y-hidden text-gray-400 text-center hover:font-(family-name:--font-family-fira-bold) cursor-pointer">
            unspecified
          </span>
        );
    }
  };

  if (!regulatorVar) return;

  return (
    <div className="h-[22px] w-full flex justify-start items-center font-(family-name:--font-family-fira-mono) leading-[100%] text-[98%] select-none">
      <span className="h-full w-[26%] max-w-[26%] overflow-x-auto overflow-y-hidden text-end text-[100%]">
        {regulatorVar.name ?? 'Unknown'}
      </span>
      <span className="h-full w-[8%] max-w-[8%] overflow-x-auto overflow-y-hidden text-center">
        {getRegulationIcon()}
      </span>

      {getObservable()}
      {getMonocity()}
    </div>
  );
};

export default RegulationInfo;
