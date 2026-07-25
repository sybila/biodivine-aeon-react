import NonExtendableContentReact from '../../../../lit-wrappers/NonExtebdableContentReact';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';

import { useMemo } from 'react';
import ContrIcon from '../../../../../../assets/icons/control-enabled-button.svg';
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
        controlEnabledEditorServ.hoverVariableVisualization(id, true)
      }
      onMouseLeave={() =>
        controlEnabledEditorServ.hoverVariableVisualization(id, false)
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
            text="CE"
            iconSrc={ContrIcon}
            iconAlt="Control-Enabled Icon"
            textColor="var(--color-control-enabled-status-text)"
            buttonColor={getControlButtonColor(false)}
            buttonHoverColor={getControlButtonColor(true)}
            handleClick={() => {
              controlEnabledEditorServ.toggleControlEnabled(id);
              helpHoverStore
                .getState()
                .setHelpHoverText(
                  pageStringProviderServ.Tooltips.currentControlEnabled(
                    getNextControlStatus(variableControlEnabled)
                  )
                );
            }}
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  pageStringProviderServ.Tooltips.currentControlEnabled(
                    variableControlEnabled
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

export default VariableControlEnabledInfo;
