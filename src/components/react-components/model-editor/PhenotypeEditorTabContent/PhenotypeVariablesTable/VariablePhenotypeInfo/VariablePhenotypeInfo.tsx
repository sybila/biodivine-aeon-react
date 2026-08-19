import {
  PHENOTYPE_STATUS,
  type PhenotypeStatus,
} from '../../../../../../types/types';

import { useMemo } from 'react';
import PhenIcon from '../../../../../../assets/icons/phenotype-button.svg';
import { isErr } from '../../../../../../types/result';
import TableRowWithName from '../../../../global/NameTableRow/TableRowWithName';
import type { VariablePhenotypeInfoProps } from './VariablePhenotypeInfoProps';

const VariablePhenotypeInfo: React.FC<VariablePhenotypeInfoProps> = ({
  id,
  name,
  hover,
  selected,
  toggleSelect,

  phenotypeEditorServ,
  messageServ,
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
    <TableRowWithName
      key={id}
      name={name}
      nameWidth="80%"
      nameIsEditable={false}
      handleClick={() => toggleSelect(id)}
      isSelected={selected}
      rowHeight="40px"
      buttonSectionHeight="100%"
      buttonHeight="21px"
      nameTextColor="var(--color-secondary-text)"
      contColor="var(--color-tertiary-lighter)"
      contHoverColor="var(--color-tertiary-lighter-highlight)"
      contActiveColor="var(--color-tertiary-active)"
      contActiveBorderColor="var(--color-tertiary-border)"
      contHoverBorderColor="var(--color-tertiary-border)"
      contBorderColor="var(--color-tertiary-lighter)"
      hideTooltipFun={() => helpHoverStore.getState().clear()}
      hover={hover}
      handleMouseEnter={() =>
        phenotypeEditorServ.hoverVariableVisualization(id, true)
      }
      handleMouseLeave={() =>
        phenotypeEditorServ.hoverVariableVisualization(id, false)
      }
      buttons={[
        {
          text: 'Ph',
          icon: PhenIcon,
          handleClick: () => {
            if (
              !isErr(
                messageServ.showFromResult(
                  phenotypeEditorServ.togglePhenotype(id),
                  'Failed to toggle phenotype status'
                )
              )
            ) {
              helpHoverStore
                .getState()
                .setHelpHoverText(
                  pageStringProviderServ.Tooltips.currentPhenotype(
                    getNextPhenotype(controlInfo.phenotype)
                  )
                );
            }
          },
          iconAlt: 'Phenotype Icon',
          buttonTextColor: 'var(--color-phenotype-status-text)',
          buttonBgColor: getPhenButtonColor(false),
          buttonHoverColor: getPhenButtonColor(true),
          buttonActiveColor: 'var(--color-not-in-phenotype)',
          buttonTooltipFunction: (e: MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                pageStringProviderServ.Tooltips.currentPhenotype(
                  controlInfo.phenotype
                ),
                true,
                -50
              ),
          isActive: false,
        },
      ]}
    />
  );
};

export default VariablePhenotypeInfo;
