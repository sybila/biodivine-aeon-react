import type { Regulation } from '../../../../types/types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import RegulationInfo from './RegulationInfo/RegulationInfo';
import type { RegulationInfoListProps } from './RegulationInfoListProps';

const RegulationInfoList: React.FC<RegulationInfoListProps> = ({
  maxListHeight,
  minListHeight,
  listWidth,

  rowFontSize,

  variableRegulations,
  hoverRegulation,
  selectedRegulatorIds,

  modelEditorServ,
  pageStringProviderServ,

  variablesStore,
  helpHoverStore,
}) => {
  if (variableRegulations.length === 0) {
    return (
      <section
        className="flex justify-center items-center"
        style={{ height: '100px', width: listWidth }}
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
    <section
      className="overflow-auto"
      style={{
        maxHeight: maxListHeight,
        height: 'auto',
        minHeight: minListHeight,
        width: listWidth,
      }}
    >
      {variableRegulations.map((regulation: Regulation) => (
        <RegulationInfo
          key={`${regulation.regulator.toString()}+${regulation.target.toString()}`}
          hover={
            (hoverRegulation &&
              hoverRegulation.regulator === regulation.regulator) ??
            false
          }
          selected={
            (selectedRegulatorIds &&
              selectedRegulatorIds.has(regulation.regulator)) ??
            false
          }
          modelEditorServ={modelEditorServ}
          pageStringProviderServ={pageStringProviderServ}
          variablesStore={variablesStore}
          helpHoverStore={helpHoverStore}
          fontSize={rowFontSize}
          normalTextColor="var(--color-primary-text)"
          hoverColor="var(--color-secondary-light-highlight)"
          selectedColor="var(--color-secondary-highlight)"
          {...regulation}
        ></RegulationInfo>
      ))}
    </section>
  );
};

export default RegulationInfoList;
