import type { Regulation, } from '../../../../../../types';
import ModelEditor from '../../../../../../services/model-editor/ModelEditor/ModelEditor';
import useVariablesStore from '../../../../../../stores/LiveModel/useVariablesStore';

const RegulationInfo: React.FC<Regulation> = ({
  regulator,
  target,
  observable,
  monotonicity,
}) => {
  const regulatorVar = useVariablesStore(state => state.variableFromId(regulator));

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
    let color: string = observable ? 'text-black' : 'text-gray-400';

    return (
      <span
        className={`h-full w-[30%] max-w-[30%] overflow-x-auto overflow-y-hidden ${color} text-center hover:font-(family-name:--font-family-fira-bold) cursor-pointer`}
        onClick={() => {
          ModelEditor.toggleRegulationObservability(regulator, target);
        }}
      >
        {observable ? 'observable' : 'non-observable'}
      </span>
    );
  };

  const getMonocity = () => {
    let color: string = 'text-black';

    switch (monotonicity) {
      case 'activation':
        color = 'text-green-400';
        break;
      case 'inhibition':
        color = 'text-red-500';
        break;
      case 'unspecified':
        color = 'text-gray-400';
        break;
    }

    return (
      <span
        className={`h-full w-[30%] max-w-[30%] overflow-x-auto ${color} overflow-y-hidden text-center hover:font-(family-name:--font-family-fira-bold) cursor-pointer`}
        onClick={() => {
          ModelEditor.toggleRegulationMonocity(regulator, target);
        }}
      >
        {monotonicity}
      </span>
    );
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
