import ComputationManager from '../../../../../services/global/ComputationManager/ComputationManager';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';

const ControlCompParams: React.FC = () => {
  const headers: Array<string> = [
    'Min Robustness',
    'Max Size',
    'Max Number of Results',
  ];

  const functions: Array<() => void> = [
    ComputationManager.getMinRobustness,
    ComputationManager.getMaxSize,
    ComputationManager.getMaxNumberOfResults,
  ];

  return (
    <section className="flex flex-col w-full gap-3">
      <DotHeaderReact
        headerText="Control Settings"
        compWidth="100%"
        justifyHeader="start"
      />
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-[47%] gap-1 justify-center">
          {headers.map((header) => (
            <SimpleHeaderReact key={header} headerText={`${header}:`} textFontSize='18px' textFontWeight='normal'/>
          ))}
        </div>

        <div className="flex flex-col w-[47%] gap-1 justify-center"></div>
      </div>
    </section>
  );
};

export default ControlCompParams;
