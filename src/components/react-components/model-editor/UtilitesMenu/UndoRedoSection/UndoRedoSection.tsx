import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';
import type { UndoRedoSectionProps } from './UndoRedoSectionProps';

import RedoIcon from '../../../../../assets/icons/redo.svg';
import UndoIcon from '../../../../../assets/icons/undo.svg';

const UndoRedoSection: React.FC<UndoRedoSectionProps> = ({
  undoFunction,
  redoFunction,

  undoTooltipFunction,
  redoTooltipFunction,
  clearTooltipFunction,

  gapInsideSection,
}) => {
  return (
    <section
      className="flex flex-col h-fit w-full"
      style={{ gap: `${gapInsideSection}` }}
    >
      <DotHeaderReact
        textColor="var(--color-primary-text)"
        headerText="Undo/Redo"
        compHeight="20px"
      />

      <div className="flex flex-row justify-around h-[30px] w-full">
        <TextIconButtonReact
          compHeight="100%"
          compWidth="49%"
          textColor="var(--color-secondary-text)"
          buttonColor="var(--color-secondary-buttons)"
          text="Undo"
          onClick={() => undoFunction()}
          iconSrc={UndoIcon}
          iconAlt="U"
          onMouseEnter={(e: React.MouseEvent) =>
            undoTooltipFunction(e.nativeEvent)
          }
          onMouseLeave={() => clearTooltipFunction()}
        />
        <TextIconButtonReact
          compHeight="100%"
          compWidth="49%"
          textColor="var(--color-secondary-text)"
          buttonColor="var(--color-secondary-buttons)"
          onClick={() => redoFunction()}
          iconSrc={RedoIcon}
          iconAlt="R"
          text="Redo"
          onMouseEnter={(e: React.MouseEvent) =>
            redoTooltipFunction(e.nativeEvent)
          }
          onMouseLeave={() => clearTooltipFunction()}
        />
      </div>
    </section>
  );
};

export default UndoRedoSection;
