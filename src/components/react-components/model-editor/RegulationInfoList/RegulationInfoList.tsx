import { useMemo } from 'react';
import useRegulationsStore from '../../../../stores/LiveModel/useRegulationsStore';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import RegulationInfo from './RegulationInfo/RegulationInfo';
import type { Regulation, RegulationVariables } from '../../../../types';

const RegulationInfoList: React.FC<{
  varId: number;
  height: string;
  width: string;
  hoverRegulation: RegulationVariables | undefined;
  selectedRegulation: RegulationVariables | undefined;
}> = ({ varId, height, width, hoverRegulation, selectedRegulation }) => {
  const regulationsObj = useRegulationsStore((state) => state.regulations);

  const regulations = useMemo(
    () => Object.values(regulationsObj).filter((r) => r.target === varId),
    [regulationsObj, varId]
  );

  if (regulations.length === 0) {
    return (
      <section
        className="flex justify-center items-center"
        style={{ height: height, width: width }}
      >
        <SimpleHeaderReact
          compHeight="20px"
          headerText="No Regulators"
          textFontSize="15px"
          textFontFamily="FiraMono, monospace"
          textFontWeight="normal"
        />
      </section>
    );
  }

  return (
    <section className="overflow-auto" style={{ height: height, width: width }}>
      {regulations.map((regulation: Regulation) => (
        <RegulationInfo
          key={`${regulation.regulator.toString()}+${regulation.target.toString()}`}
          hover={
            (hoverRegulation &&
              hoverRegulation.regulator === regulation.regulator) ??
            false
          }
          selected={
            (selectedRegulation &&
              selectedRegulation.regulator === regulation.regulator) ??
            false
          }
          {...regulation}
        ></RegulationInfo>
      ))}
    </section>
  );
};

export default RegulationInfoList;
