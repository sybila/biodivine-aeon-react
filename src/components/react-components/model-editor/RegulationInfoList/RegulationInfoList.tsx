import { useMemo } from 'react';
import type { Regulation } from '../../../../types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import RegulationInfo from './RegulationInfo/RegulationInfo';
import type { RegulationInfoListProps } from './RegulationInfoListProps';

const RegulationInfoList: React.FC<RegulationInfoListProps> = ({
  height,
  width,
  variableRegulations,
  hoverRegulation,
  selectedRegulation,

  modelEditorServ,
  stringProviderServ,

  variablesStore,
  helpHoverStore,
}) => {
  if (variableRegulations.length === 0) {
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
      {variableRegulations.map((regulation: Regulation) => (
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
          modelEditorServ={modelEditorServ}
          stringProviderServ={stringProviderServ}
          variablesStore={variablesStore}
          helpHoverStore={helpHoverStore}
          {...regulation}
        ></RegulationInfo>
      ))}
    </section>
  );
};

export default RegulationInfoList;
