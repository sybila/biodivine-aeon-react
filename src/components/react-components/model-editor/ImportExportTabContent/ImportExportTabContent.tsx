import { useRef } from 'react';
import { ExampleModels } from '../../../../ExampleModels';
import type { fileType } from '../../../../types/types';
import DoubleTextButtonReact from '../../lit-wrappers/DoubleTextButtonReact';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import type { ImportExportTabContentProps } from './ImportExportTabContentProps';

/** This component is used to display the Import/Export tab content in the Model Editor */
const ImportExportTabContent: React.FC<ImportExportTabContentProps> = ({
  liveModelServ,
  fileConvertorsServ,
  messageServ,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileHandlerRef = useRef<
    ((fileInput: HTMLInputElement & { files: FileList }) => void) | null
  >(null);

  const handleExampleImport = async (exampleModel: string) => {
    messageServ.showFromResult(
      await liveModelServ.Import.importAeonWithWarnings(exampleModel),
      'Failed to import example model',
      'Model imported successfully.'
    );
  };

  const startFileImport = async (
    importFunction: (
      fileInput: HTMLInputElement & { files: FileList }
    ) => Promise<void>,
    accept: fileType | ''
  ) => {
    fileHandlerRef.current = async (
      fileInput: HTMLInputElement & { files: FileList }
    ) => await importFunction(fileInput);

    fileInputRef.current?.setAttribute('accept', accept);

    fileInputRef.current?.click();
  };

  const importButtons: Array<[string, string, () => void]> = [
    [
      'Last Model',
      'Browser Storage',
      async () => await liveModelServ.Import.loadFromLocalStorage(),
    ],
    [
      '.aeon',
      'Simple Text Format',
      () =>
        startFileImport(
          async (fileInput: HTMLInputElement & { files: FileList }) =>
            await liveModelServ.Import.importFromFile(fileInput),
          '.aeon'
        ),
    ],
    [
      '.sbml',
      'Standard SBML L3',
      () => {
        startFileImport(
          async (fileInput: HTMLInputElement & { files: FileList }) =>
            await liveModelServ.Import.importFromFile(
              fileInput,
              async (aeonString: string) =>
                await fileConvertorsServ.sbmlToAeon(aeonString)
            ),
          '.sbml'
        );
      },
    ],
    [
      '.bnet',
      'Boolnet Text Format',
      () => {
        startFileImport(
          async (fileInput: HTMLInputElement & { files: FileList }) =>
            await liveModelServ.Import.importFromFile(
              fileInput,
              async (aeonString: string) =>
                await fileConvertorsServ.bnetToAeon(aeonString)
            ),
          '.bnet'
        );
      },
    ],
  ];

  const exportButtons: Array<[string, string, () => void]> = [
    [
      '.aeon',
      'Simple Text Format',
      () => liveModelServ.Export.exportToFile('.aeon'),
    ],
    [
      '.sbml (Parametrized)',
      'Parametrized Model',
      () =>
        liveModelServ.Export.exportToFile(
          '.sbml',
          async (aeonString: string) =>
            await fileConvertorsServ.aeonToSbml(aeonString)
        ),
    ],
    [
      '.sbml (Instantiated)',
      'Witness Model',
      () =>
        liveModelServ.Export.exportToFile(
          '.sbml',
          async (aeonString: string) =>
            await fileConvertorsServ.aeonToSbmlInstantiated(aeonString)
        ),
    ],
    [
      '.bnet',
      'Boolnet Text Format',
      () =>
        liveModelServ.Export.exportToFile(
          '.bnet',
          async (aeonString: string) =>
            await fileConvertorsServ.aeonToBnet(aeonString)
        ),
    ],
  ];

  const exampleFirstColButtons: Array<[string, string, () => void]> = [
    [
      'G2A',
      'Cell Division',
      async () => await handleExampleImport(ExampleModels.g2a),
    ],
    [
      'G2B',
      'Cell Division',
      async () => await handleExampleImport(ExampleModels.g2b),
    ],
  ];

  const exampleSecondColButtons: Array<[string, string, () => void]> = [
    [
      'Orlando',
      'Budding Yeast',
      async () => await handleExampleImport(ExampleModels.buddingYeastOrlando),
    ],
    [
      'Irons',
      'Budding Yeast',
      async () => await handleExampleImport(ExampleModels.buddingYeastIrons),
    ],
  ];

  // This function renders the buttons for import and export sections
  // It takes a buttonType (either "import", "export" or "example" ) and an array
  // of button texts as input, and returns a list of DoubleTextButtonReact components
  const renderButtons = (
    buttonType: string,
    buttonArray: Array<[string, string, () => void]>
  ) => {
    return buttonArray.map(([leftText, rightText, onClick], index) => (
      <DoubleTextButtonReact
        leftTextColor="var(--color-secondary-text)"
        rightTextColor="var(--color-secondary-text)"
        leftColor="var(--color-secondary-buttons)"
        leftHoverColor="var(--color-secondary-buttons-hover)"
        rightColor="var(--color-secondary-buttons-darker)"
        rightHoverColor="var(--color-secondary-buttons-darker-hover)"
        key={index + buttonType}
        leftText={leftText}
        rightText={rightText}
        onClick={() => onClick()}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-4">
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={() => {
          if (fileHandlerRef.current) {
            fileHandlerRef.current(
              fileInputRef.current as HTMLInputElement & { files: FileList }
            );
          } else {
            messageServ.showError(
              'Import Error: Internal Error - No file handler set.'
            );
          }
        }}
      />

      <div className="flex flex-col items-center justify-center w-full h-fit">
        <div className="flex flex-row items-center justify-center h-fit w-full w-min-fit gap-2">
          <section
            id="import"
            className="flex flex-col items-center justify-center h-fit w-1/2 w-min-fit gap-2"
          >
            <SimpleHeaderReact
              textColor="var(--color-primary-text)"
              className="m-2"
              headerText="Import"
            />
            {renderButtons('import', importButtons)}
          </section>

          <section
            id="export"
            className="flex flex-col items-center justify-center h-fit w-1/2 w-min-fit gap-2"
          >
            <SimpleHeaderReact
              textColor="var(--color-primary-text)"
              className="m-2"
              headerText="Export"
            />
            {renderButtons('export', exportButtons)}
          </section>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full h-fit gap-4">
        <SimpleHeaderReact
          textColor="var(--color-primary-text)"
          headerText="Example Models"
        />

        <div className="flex flex-row items-center justify-center h-fit w-full w-min-fit gap-2">
          <section className="flex flex-col items-center justify-center h-fit w-1/2 w-min-fit gap-2">
            {renderButtons('example1', exampleFirstColButtons)}
          </section>
          <section className="flex flex-col items-center justify-center h-fit w-1/2 w-min-fit gap-2">
            {renderButtons('example2', exampleSecondColButtons)}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ImportExportTabContent;
