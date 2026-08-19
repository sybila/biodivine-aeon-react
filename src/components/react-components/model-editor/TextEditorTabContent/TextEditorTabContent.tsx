import { useState } from 'react';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { TextEditorTabContentProps } from './TextEditorTabContentProps';

const TextEditorTabContent: React.FC<TextEditorTabContentProps> = ({
  textEditorServ,
  importLmServ,
  exportLmServ,
  messageServ,
  pageStringProviderServ,

  helpHoverStore,
}) => {
  const [editorText, setEditorText] = useState(textEditorServ.getText());

  const handleTextChange = (newText: string) => {
    setEditorText(newText);
    textEditorServ.setText(newText);
  };

  const buttons = [
    {
      text: 'Load Current Model',
      handleClick: () => {
        const result = exportLmServ.exportAeon(true);

        if (result != undefined) {
          handleTextChange(result);
        }
      },
      tooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.loadCurrentModelButton(),
            true,
            -50
          ),
    },
    {
      text: 'Import Edited Model',
      handleClick: async () => {
        messageServ.showFromResult(
          await importLmServ.importAeonWithWarnings(editorText),
          'Failed to import model',
          'Model imported successfully.'
        );
      },
      tooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.importEditedModelButton(),
            true,
            -50
          ),
    },
  ];

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <section className="flex justify-around items-center h-[30px] w-full">
        {buttons.map((button, index) => (
          <TextButtonReact
            key={index}
            text={button.text}
            compHeight="100%"
            compWidth="40%"
            buttonHeight="100%"
            buttonWidth="100%"
            buttonColor="var(--color-secondary-buttons)"
            buttonHoverColor="var(--color-secondary-buttons-hover)"
            handleClick={() => button.handleClick()}
            onMouseEnter={(e: React.MouseEvent) =>
              button.tooltipFunction(e.nativeEvent)
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
        ))}
      </section>

      <InvisibleInputReact
        compHeight="50vh"
        compWidth="98%"
        placeholder="Model In Aeon Format"
        textAlign="start"
        fontSize="14px"
        textColor="var(--color-primary-text)"
        placeholderColor="var(--color-primary-placeholder-text)"
        multiLine={true}
        value={editorText}
        handleChange={(value) => {
          handleTextChange(value);
        }}
      />
    </div>
  );
};

export default TextEditorTabContent;
