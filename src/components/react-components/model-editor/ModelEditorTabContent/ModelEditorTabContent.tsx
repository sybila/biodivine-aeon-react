import { useState } from 'react';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import ModelStatsTable from './ModelStatsTable/ModelStatsTable';

import AddIcon from '../../../../assets/icons/add_box.svg';
import ModelDescription from './ModelDescription/ModelDescription';
import type { ModelEditorTabContentProps } from './ModelEditorTabContentProps';
import ModelEditorVariableTable from './ModelEditorVariableTable/ModelEditorVariableTable';
import ModelName from './ModelName/ModelName';

const ModelEditorTabContent: React.FC<ModelEditorTabContentProps> = ({
  liveModelServ,
  modelEditorServ,
  searchAndFilterHelpersServ,
  messageServ,
  pageStringProviderServ,

  regulationsStore,
  variablesStore,
  updateFunctionsStore,
  tabStore,
  modelInfoStore,
  modelEditorStatusStore,
  helpHoverStore,
}) => {
  const [variableSearchText, setVariableSearchText] = useState<string>(
    modelEditorServ.getVariableSearch()
  );
  const [showModelDescription, setShowModelDescription] =
    useState<boolean>(false);

  const setExtendFunctions: Array<(extend: boolean) => void> = [];

  const setVariableSearch = (name: string) => {
    if (name !== variableSearchText) {
      modelEditorServ.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

  const getShowHideModelDescriptionTooltipText = (show: boolean) => {
    return show
      ? pageStringProviderServ.Tooltips.showModelDescription()
      : pageStringProviderServ.Tooltips.hideModelDescription();
  };

  const setShowHideModelDescriptionTooltipText = (show: boolean) => {
    helpHoverStore
      .getState()
      .setHelpHoverText(getShowHideModelDescriptionTooltipText(show));
  };

  const showHideModelDescriptionTooltip = (
    e: React.MouseEvent,
    show: boolean
  ) => {
    helpHoverStore
      .getState()
      .setHelpHoverAtMouse(
        e.nativeEvent,
        getShowHideModelDescriptionTooltipText(show),
        true,
        -50
      );
  };

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <ModelName
        modelEditorServ={modelEditorServ}
        messageServ={messageServ}
        pageStringProviderServ={pageStringProviderServ}
        tabStore={tabStore}
        modelInfoStore={modelInfoStore}
        helpHoverStore={helpHoverStore}
      />
      {showModelDescription ? (
        <ModelDescription
          setShowModelDescription={setShowModelDescription}
          modelEditorServ={modelEditorServ}
          messageServ={messageServ}
          tabStore={tabStore}
          modelInfoStore={modelInfoStore}
          setHelpHover={showHideModelDescriptionTooltip}
          setHelpHoverText={setShowHideModelDescriptionTooltipText}
          clearHelpHover={helpHoverStore.getState().clear}
        />
      ) : (
        <>
          <section className="flex flex-col items-center w-full h-fit gap-3">
            <section className="flex flex-row items-center justify-between w-full h-fit gap-1">
              <DotHeaderReact
                textColor="var(--color-primary-text)"
                compWidth="60%"
                headerText="Model Statistics"
                justifyHeader="start"
              />

              <TextButtonReact
                buttonColor="var(--color-secondary-buttons)"
                textColor="var(--color-secondary-text)"
                className="mr-1"
                compWidth="35%"
                textFontSize="13px"
                text={`${
                  showModelDescription ? 'Hide' : 'Show'
                } Model description`}
                handleClick={() => {
                  setShowHideModelDescriptionTooltipText(false);
                  setShowModelDescription(!showModelDescription);
                }}
                active={false}
                onMouseEnter={(e: React.MouseEvent) =>
                  showHideModelDescriptionTooltip(e, true)
                }
                onMouseLeave={() => helpHoverStore.getState().clear()}
              />
            </section>

            <ModelStatsTable
              modelEditorServ={modelEditorServ}
              regulationsStore={regulationsStore}
              updateFunctionsStore={updateFunctionsStore}
              variablesStore={variablesStore}
            />
          </section>

          <section className="flex flex-col items-center justify-between w-full h-[60px] gap-1">
            <DotHeaderReact
              textColor="var(--color-primary-text)"
              compHeight="49%"
              compWidth="100%"
              headerText="Variables"
              justifyHeader="start"
            />

            <section className="flex flex-row justify-between w-[95%] h-[50%] gap-1">
              <div className="flex flex-row items-center justify-between w-[50%] h-full">
                <TextButtonReact
                  buttonColor="var(--color-secondary-buttons)"
                  textColor="var(--color-secondary-text)"
                  className="mr-1"
                  compHeight="90%"
                  compWidth="47%"
                  text="expand all"
                  handleClick={() => {
                    setExtendFunctions.forEach((func) => func(true));
                  }}
                  onMouseEnter={(e: React.MouseEvent) =>
                    helpHoverStore
                      .getState()
                      .setHelpHoverAtMouse(
                        e.nativeEvent,
                        pageStringProviderServ.Tooltips.extendAllVariables(),
                        true,
                        -50
                      )
                  }
                  onMouseLeave={() => helpHoverStore.getState().clear()}
                />
                <TextButtonReact
                  buttonColor="var(--color-secondary-buttons)"
                  textColor="var(--color-secondary-text)"
                  className="mr-1"
                  compHeight="90%"
                  compWidth="47%"
                  text="collapse all"
                  handleClick={() => {
                    setExtendFunctions.forEach((func) => func(false));
                  }}
                  onMouseEnter={(e: React.MouseEvent) =>
                    helpHoverStore
                      .getState()
                      .setHelpHoverAtMouse(
                        e.nativeEvent,
                        pageStringProviderServ.Tooltips.collapseAllVariables(),
                        true,
                        -50
                      )
                  }
                  onMouseLeave={() => helpHoverStore.getState().clear()}
                />
              </div>

              <TextIconButtonReact
                className="mr-1"
                compHeight="90%"
                compWidth="30%"
                iconSrc={AddIcon}
                iconAlt="Add"
                iconHeight="19px"
                text="Add Variable"
                buttonColor="var(--color-secondary-buttons)"
                buttonHoverColor="var(--color-secondary-buttons-hover)"
                textColor="var(--color-secondary-text)"
                handleClick={() => {
                  modelEditorServ.addVariable();
                }}
                onMouseEnter={(e: React.MouseEvent) =>
                  helpHoverStore
                    .getState()
                    .setHelpHoverAtMouse(
                      e.nativeEvent,
                      pageStringProviderServ.Tooltips.addNewVariable(),
                      true,
                      -50
                    )
                }
                onMouseLeave={() => helpHoverStore.getState().clear()}
              />
            </section>
          </section>

          <TextInputReact
            textColor="var(--color-secondary-text)"
            inputColor="var(--color-secondary-text-inputs)"
            inputBorderColor="var(--color-secondary-text-inputs-border)"
            compWidth="95%"
            placeholder="Search variables..."
            onWrite={setVariableSearch}
            value={variableSearchText}
          />

          <ModelEditorVariableTable
            searchText={variableSearchText}
            exposeSetExtend={(extendFunction) =>
              setExtendFunctions.push(extendFunction)
            }
            modelEditorServ={modelEditorServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            pageStringProviderServ={pageStringProviderServ}
            regulationsStore={regulationsStore}
            variablesStore={variablesStore}
            modelEditorStatusStore={modelEditorStatusStore}
            updateFunctionsStore={updateFunctionsStore}
            helpHoverStore={helpHoverStore}
          />
        </>
      )}
    </div>
  );
};

export default ModelEditorTabContent;
