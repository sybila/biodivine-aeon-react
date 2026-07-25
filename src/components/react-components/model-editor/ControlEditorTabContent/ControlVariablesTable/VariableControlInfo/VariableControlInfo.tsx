import { PHENOTYPE_STATUS, type Phenotype } from '../../../../../../types';
import NonExtendableContentReact from '../../../../lit-wrappers/NonExtebdableContentReact';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';

import type { VariableControlInfoProps } from './VariableControlInfoProps';

import { useMemo } from 'react';
import ContrIcon from '../../../../../../assets/icons/control-enabled-button.svg';
import PhenIcon from '../../../../../../assets/icons/phenotype-button.svg';

const VariableControlInfo: React.FC<VariableControlInfoProps> = ({
  id,
  name,
  hover,
  selected,
  toggleSelect,

  controlEditorServ,
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

  const getNextPhenotype = (current: Phenotype): Phenotype => {
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

  const getNextControlStatus = (current: boolean) => {
    return !current;
  };

  const getControlButtonColor = (hover: boolean) => {
    switch (controlInfo.controlEnabled) {
      case false:
        return hover
          ? 'var(--color-not-control-enabled-highlight)'
          : 'var(--color-not-control-enabled)';
      default:
        return hover
          ? 'var(--color-control-enabled-highlight)'
          : 'var(--color-control-enabled)';
    }
  };

  return (
    <NonExtendableContentReact
      className="cursor-pointer"
      compHeight="auto"
      compWidth="100%"
      contColor="var(--color-secondary-light)"
      contHoverColor="var(--color-secondary-light-highlight)"
      contActiveColor="var(--color-secondary-active)"
      contActiveBorder="2px var(--color-secondary-border) solid"
      contHoverBorder="2px var(--color-secondary-border) dashed"
      contBorder="2px var(--color-secondary-light) solid"
      contentOverflowX="visible"
      contentOverflowY="visible"
      hover={hover}
      active={selected}
      onMouseEnter={() =>
        controlEditorServ.hoverVariableVisualization(id, true)
      }
      onMouseLeave={() =>
        controlEditorServ.hoverVariableVisualization(id, false)
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

      <section className="flex flex-row items-center justify-around h-[23px] w-[39%] overflow-visible">
        <div className="h-[95%] w-[40%]" onClick={(e) => e.stopPropagation()}>
          <TextIconButtonReact
            compHeight="100%"
            compWidth="100%"
            iconHeight="21px"
            textFontWeight="normal"
            text="CE"
            iconSrc={ContrIcon}
            iconAlt="Control-Enabled Icon"
            textColor="var(--color-control-enabled-status-text)"
            buttonColor={getControlButtonColor(false)}
            buttonHoverColor={getControlButtonColor(true)}
            handleClick={() => {
              controlEditorServ.toggleControlEnabled(id);
              helpHoverStore
                .getState()
                .setHelpHoverText(
                  pageStringProviderServ.Tooltips.currentControlEnabled(
                    getNextControlStatus(controlInfo.controlEnabled)
                  )
                );
            }}
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  pageStringProviderServ.Tooltips.currentControlEnabled(
                    controlInfo.controlEnabled
                  ),
                  true,
                  -50
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
        </div>

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
              controlEditorServ.togglePhenotype(id);
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

export default VariableControlInfo;
