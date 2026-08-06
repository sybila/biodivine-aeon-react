import { useState } from 'react';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { TextEditorTabContentProps } from './TextEditorTabContentProps';

const TextEditorTabContent: React.FC<TextEditorTabContentProps> = ({
  importLmServ,
  exportLmServ,
}) => {
  const [editorText, setEditorText] = useState('');

  const buttons = [
    {
      text: 'Import Current Model',
      handleClick: () => {
        const result = exportLmServ.exportAeon(true);

        if (result != undefined) {
          setEditorText(result);
        }
      },
    },
    {
      text: 'Load Edited Model',
      handleClick: () => {
        importLmServ.importAeonWithWarnings(editorText);
      },
    },
  ];

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <section className="flex justify-around items-center h-[30px] w-full">
        {buttons.map((button) => (
          <TextButtonReact
            text={button.text}
            compHeight="100%"
            compWidth="40%"
            buttonHeight="100%"
            buttonWidth="100%"
            buttonColor="var(--color-secondary-buttons)"
            buttonHoverColor="var(--color-secondary-buttons-hover)"
            handleClick={() => button.handleClick()}
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
          setEditorText(value);
        }}
      />
    </div>
  );
};

export default TextEditorTabContent;
