import HorizontalHidableContentReact from '../../lit-wrappers/HorizontalHidableContentReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import type { UtilitiesMenuProps } from './UtilitiesMenuProps';

const UtilitiesMenu: React.FC<UtilitiesMenuProps> = ({
  modelVisualization,
  searchAndFilterHelpersServ,
  pageStringProviderServ,

  variablesStore,
  helpHoverStore,
}) => {
  return (
    <HorizontalHidableContentReact
      className="absolute top-[55px] right-[12px] z-1"
      buttonRight={true}
      compHeight="40px"
      buttonWidth="25px"
      contentWidth="350px"
      buttonOnMouseEnter={(e) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.utilitiesMenu(),
            true,
            50,
            -110
          )
      }
      buttonOnMouseLeave={() => helpHoverStore.getState().clear()}
    >
      <TextInputReact
        slot="content"
        placeholder="Search variables... (press enter to submit)"
        compHeight="100%"
        compWidth="100%"
        onSubmit={(value) =>
          modelVisualization.fit(
            searchAndFilterHelpersServ.filterVariablesBySearchTerms(
              variablesStore.getState().getAllVariables(),
              value
            )
          )
        }
      />
    </HorizontalHidableContentReact>
  );
};

export default UtilitiesMenu;
