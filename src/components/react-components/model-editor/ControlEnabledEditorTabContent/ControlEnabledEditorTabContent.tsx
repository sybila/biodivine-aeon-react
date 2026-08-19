import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import type { ControlEnabledEditorTabContentProps } from './ControlEnabledEditorTabContentProps';
import ControlEnabledStatsTable from './ControlEnabledStatsTable/ControlEnabledStatsTable';
import ControlEnabledVariablesTable from './ControlEnabledVariablesTable/ControlEnabledVariablesTable';

const ControlEnabledEditorTabContent: React.FC<
  ControlEnabledEditorTabContentProps
> = ({
  controlEnabledEditorServ,
  searchAndFilterHelpersServ,
  pageStringProviderServ,
  messageServ,
  loadingServ,

  controlStore,
  variablesStore,
  modelEditorStatusStore,
  helpHoverStore,
}) => {
  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          textColor="var(--color-primary-text)"
          headerText="Control Statistics"
          compWidth="100%"
          justifyHeader="start"
        />
        <ControlEnabledStatsTable controlStore={controlStore} />
      </section>

      <section className="flex flex-row items-around w-full h-fit gap-1">
        <DotHeaderReact
          textColor="var(--color-primary-text)"
          compWidth="50%"
          headerText="Variables"
          justifyHeader="start"
        />
      </section>

      <ControlEnabledVariablesTable
        controlEnabledEditorServ={controlEnabledEditorServ}
        searchAndFilterHelpersServ={searchAndFilterHelpersServ}
        pageStringProviderServ={pageStringProviderServ}
        messageServ={messageServ}
        loadingServ={loadingServ}
        variablesStore={variablesStore}
        controlStore={controlStore}
        modelEditorStatusStore={modelEditorStatusStore}
        helpHoverStore={helpHoverStore}
      />
    </div>
  );
};

export default ControlEnabledEditorTabContent;
