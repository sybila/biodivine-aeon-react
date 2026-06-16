import type { ControlInfo, Phenotype } from '../../../../../../types';
import NonExtendableContentReact from '../../../../lit-wrappers/NonExtebdableContentReact';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';

import type { VariableControlInfoProps } from './VariableControlInfoProps';

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
  const controlInfo: ControlInfo | undefined = controlStore((state) =>
    state.getVariableControlInfo(id)
  );

  if (!controlInfo) {
    return null;
  }

  const getNextPhenotype = (current: Phenotype): Phenotype => {
    switch (current) {
      case true:
        return false;
      case false:
        return null;
      default:
        return true;
    }
  };

  const getPhenButtonColor = (hover: boolean) => {
    switch (controlInfo.phenotype) {
      case true:
        return hover ? 'var(--color-green-light)' : 'var(--color-green)';
      case false:
        return hover ? 'var(--color-red-light)' : 'var(--color-red)';
      default:
        return hover ? 'var(--color-grey-light)' : 'var(--color-grey)';
    }
  };

  const getNextControlStatus = (current: boolean) => {
    return !current;
  };

  const getControlButtonColor = (hover: boolean) => {
    switch (controlInfo.controlEnabled) {
      case false:
        return hover ? 'var(--color-grey-light)' : 'var(--color-grey)';
      default:
        return hover ? 'var(--color-yellow-light)' : 'var(--color-yellow)';
    }
  };

  return (
    <NonExtendableContentReact
      className="cursor-pointer"
      compHeight="auto"
      compWidth="100%"
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
        className="h-full w-[55%] select-none overflow-x-auto overflow-y-hidden text-[100%] font-(family-name:--font-family-fira-mono)"
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
