import type { ControlInfo } from '../../../../../../types';
import useControlStore from '../../../../../../stores/LiveModel/useControlStore';
import NonExtendableContentReact from '../../../../lit-wrappers/NonExtebdableContentReact';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';

import type { VariableControlInfoProps } from './VariableControlInfoProps';

import ContrIcon from '../../../../../../assets/icons/control-enabled-button.svg';
import PhenIcon from '../../../../../../assets/icons/phenotype-button.svg';
import ControlEditor from '../../../../../../services/model-editor/ControlEditor/CotrolEditor';

const VariableControlInfo: React.FC<VariableControlInfoProps> = ({
  id,
  name,
  hover,
  selected,
}) => {
  const controlInfo: ControlInfo | undefined = useControlStore((state) =>
    state.getVariableControlInfo(id)
  );

  if (!controlInfo) {
    return null;
  }

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
      compWidth="100%"
      contentOverflowX="visible"
      contentOverflowY="visible"
      hover={hover}
      active={selected}
      onMouseEnter={() => ControlEditor.hoverVariableCytoscape(id, true)}
      onMouseLeave={() => ControlEditor.hoverVariableCytoscape(id, false)}
    >
      <span className="h-full w-[60%] max-w-[60%] select-none overflow-auto text-[100%] font-(family-name:--font-family-fira-mono)">
        {name}
      </span>

      <section className="flex flex-row items-center justify-around h-full w-[39%] overflow-visible">
        <TextIconButtonReact
          compHeight="95%"
          compWidth="40%"
          iconHeight="21px"
          textFontWeight="normal"
          text="CE"
          iconSrc={ContrIcon}
          iconAlt="Control-Enabled Icon"
          buttonColor={getControlButtonColor(false)}
          buttonHoverColor={getControlButtonColor(true)}
          handleClick={() => ControlEditor.toggleControlEnabled(id)}
        />
        <TextIconButtonReact
          compHeight="95%"
          compWidth="40%"
          iconHeight="21px"
          textFontWeight="normal"
          text="Ph"
          iconSrc={PhenIcon}
          iconAlt="Phenotype Icon"
          buttonColor={getPhenButtonColor(false)}
          buttonHoverColor={getPhenButtonColor(true)}
          handleClick={() => ControlEditor.togglePhenotype(id)}
        />
      </section>
    </NonExtendableContentReact>
  );
};

export default VariableControlInfo;
