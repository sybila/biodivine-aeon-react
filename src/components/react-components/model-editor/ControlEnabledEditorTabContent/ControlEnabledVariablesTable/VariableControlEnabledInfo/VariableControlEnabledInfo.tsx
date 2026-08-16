import { useMemo } from 'react';
import ContrIcon from '../../../../../../assets/icons/control-enabled-button.svg';
import TableRowWithName from '../../../../global/NameTableRow/TableRowWithName';
import type { VariableControlEnabledInfoProps } from './VariableControlEnabledInfoProps';

const VariableControlEnabledInfo: React.FC<VariableControlEnabledInfoProps> = ({
  id,
  name,
  hover,
  selected,
  toggleSelect,

  controlEnabledEditorServ,
  pageStringProviderServ,

  controlStore,
  helpHoverStore,
}) => {
  const controlEnabledStatuses: Record<number, boolean> = controlStore(
    (state) => state.controlEnabled
  );

  const variableControlEnabled = useMemo(() => {
    return controlStore.getState().getVariableControlEnabled(id) ?? false;
  }, [controlEnabledStatuses]);

  const getNextControlStatus = (current: boolean) => {
    return !current;
  };

  const getControlButtonColor = (hover: boolean) => {
    switch (variableControlEnabled) {
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
      contColor="var(--color-secondary-light)"
      contHoverColor="var(--color-secondary-light-highlight)"
      contActiveColor="var(--color-secondary-active)"
      contActiveBorderColor="var(--color-secondary-border)"
      contHoverBorderColor="var(--color-secondary-border)"
      contBorderColor="var(--color-secondary-light)"
      hideTooltipFun={() => helpHoverStore.getState().clear()}
      hover={hover}
      handleMouseEnter={() =>
        controlEnabledEditorServ.hoverVariableVisualization(id, true)
      }
      handleMouseLeave={() =>
        controlEnabledEditorServ.hoverVariableVisualization(id, false)
      }
      buttons={[
        {
          text: 'CE',
          icon: ContrIcon,
          handleClick: () => {
            controlEnabledEditorServ.toggleControlEnabled(id);
            helpHoverStore
              .getState()
              .setHelpHoverText(
                pageStringProviderServ.Tooltips.currentControlEnabled(
                  getNextControlStatus(variableControlEnabled)
                )
              );
          },
          iconAlt: 'Control-Enabled Icon',
          buttonTextColor: 'var(--color-control-enabled-status-text)',
          buttonBgColor: getControlButtonColor(false),
          buttonHoverColor: getControlButtonColor(true),
          buttonActiveColor: 'var(--color-not-control-enabled)',
          buttonTooltipFunction: (e: MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                pageStringProviderServ.Tooltips.currentControlEnabled(
                  variableControlEnabled
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

export default VariableControlEnabledInfo;
