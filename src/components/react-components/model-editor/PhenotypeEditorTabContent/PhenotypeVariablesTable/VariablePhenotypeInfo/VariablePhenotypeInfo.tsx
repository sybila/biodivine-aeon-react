import {
  PHENOTYPE_STATUS,
  type PhenotypeStatus,
} from '../../../../../../types';
import NonExtendableContentReact from '../../../../lit-wrappers/NonExtebdableContentReact';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';

import { useMemo } from 'react';
import PhenIcon from '../../../../../../assets/icons/phenotype-button.svg';
import type { VariablePhenotypeInfoProps } from './VariablePhenotypeInfoProps';

const VariablePhenotypeInfo: React.FC<VariablePhenotypeInfoProps> = ({
  id,
  name,
  hover,
  selected,
  toggleSelect,

  phenotypeEditorServ,
  pageStringProviderServ,

  controlStore,
  helpHoverStore,
}) => {
  const controlEnabledStatuses: Record<number, boolean> = controlStore(
    (state) => state.controlEnabled
  );
  const currentPhenotype = controlStore((state) => state.currentPhenotype);

  const controlInfo = useMemo(() => {
    const variableControlEnabled = controlEnabledStatuses[id];
    const variablePhenotype = currentPhenotype.variables[id];

    return {
      controlEnabled: variableControlEnabled ?? true,
      phenotype: variablePhenotype ?? null,
    };
  }, [controlEnabledStatuses, currentPhenotype]);

  const getNextPhenotype = (current: PhenotypeStatus): PhenotypeStatus => {
    switch (current) {
      case PHENOTYPE_STATUS.InPhenotypeTrue:
        return PHENOTYPE_STATUS.InPhenotypeFalse;
      case PHENOTYPE_STATUS.InPhenotypeFalse:
        return PHENOTYPE_STATUS.NotInPhenotype;
      default:
        return PHENOTYPE_STATUS.InPhenotypeTrue;
    }
  };

  const getPhenButtonColor = (hover: boolean) => {
    switch (controlInfo.phenotype) {
      case PHENOTYPE_STATUS.InPhenotypeTrue:
        return hover
          ? 'var(--color-in-phenotype-true-highlight)'
          : 'var(--color-in-phenotype-true)';
      case PHENOTYPE_STATUS.InPhenotypeFalse:
        return hover
          ? 'var(--color-in-phenotype-false-highlight)'
          : 'var(--color-in-phenotype-false)';
      default:
        return hover
          ? 'var(--color-not-in-phenotype-highlight)'
          : 'var(--color-not-in-phenotype)';
    }
  };

  return (
    <NonExtendableContentReact
      className="cursor-pointer"
      compHeight="auto"
      compWidth="100%"
      contColor="var(--color-tertiary-lighter)"
      contHoverColor="var(--color-tertiary-lighter-highlight)"
      contActiveColor="var(--color-tertiary-active)"
      contActiveBorder="2px var(--color-tertiary-border) solid"
      contHoverBorder="2px var(--color-tertiary-border) dashed"
      contBorder="2px var(--color-tertiary-lighter) solid"
      contentOverflowX="visible"
      contentOverflowY="visible"
      hover={hover}
      active={selected}
      onMouseEnter={() =>
        phenotypeEditorServ.hoverVariableVisualization(id, true)
      }
      onMouseLeave={() =>
        phenotypeEditorServ.hoverVariableVisualization(id, false)
      }
      onClick={() => toggleSelect(id)}
    >
      <span
        className="h-full w-[55%] select-none overflow-x-auto overflow-y-hidden text-(--color-secondary-text) text-[100%] font-(family-name:--font-family-fira-mono)"
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(e.nativeEvent, name, true, -50, 50)
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      >
        {name}
      </span>

      <section className="flex flex-row items-center justify-end h-[23px] w-[39%] overflow-visible">
        <div className="h-[95%] w-[40%]" onClick={(e) => e.stopPropagation()}>
          <TextIconButtonReact
            compHeight="100%"
            compWidth="100%"
            iconHeight="21px"
            textFontWeight="normal"
            text="Ph"
            iconSrc={PhenIcon}
            iconAlt="Phenotype Icon"
            textColor="var(--color-phenotype-status-text)"
            buttonColor={getPhenButtonColor(false)}
            buttonHoverColor={getPhenButtonColor(true)}
            handleClick={() => {
              phenotypeEditorServ.togglePhenotype(id);
              helpHoverStore
                .getState()
                .setHelpHoverText(
                  pageStringProviderServ.Tooltips.currentPhenotype(
                    getNextPhenotype(controlInfo.phenotype)
                  )
                );
            }}
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  pageStringProviderServ.Tooltips.currentPhenotype(
                    controlInfo.phenotype
                  ),
                  true,
                  -50
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
        </div>
      </section>
    </NonExtendableContentReact>
  );
};

export default VariablePhenotypeInfo;
