import { LiveModel } from '../../../../services/global/LiveModel/LiveModel';
import DoubleTextButtonReact from '../../lit-wrappers/DoubleTextButtonReact';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';

import { ExampleModels } from '../../../../ExampleModels';
import { Message } from '../../../lit-components/message-wrapper';
import { useEffect, useRef, useState } from 'react';
import FileConvertors from '../../../../services/utilities/FileConvertors';
import { Loading } from '../../../lit-components/loading-wrapper';
import type { fileType } from '../../../../types';

/** This component is used to display the Import/Export tab content in the Model Editor */
const ImportExportTabContent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileHandlerRef = useRef<
    ((fileInput: HTMLInputElement & { files: FileList }) => void) | null
  >(null);
  const [acceptType, setAcceptType] = useState<fileType | ''>('');
  const [pendingFileDialog, setPendingFileDialog] = useState<boolean>(false);

  const handleExampleImport = (exampleModel: string) => {
    Loading.startLoading();
    LiveModel.Import.importAeon(exampleModel);
    Loading.endLoading();
  };

  useEffect(() => {
    if (pendingFileDialog) {
      fileInputRef.current?.click();
      setPendingFileDialog(false);
    }
  }, [acceptType, pendingFileDialog]);

  const startFileImport = (
    importFunction: (fileInput: HTMLInputElement & { files: FileList }) => void,
    accept: fileType | ''
  ) => {
    fileHandlerRef.current = (
      fileInput: HTMLInputElement & { files: FileList }
    ) => importFunction(fileInput);
    setAcceptType(accept);
    setPendingFileDialog(true);
  };

  const importButtons: Array<[string, string, () => void]> = [
    [
      'Last Model',
      'Browser Storage',
      () => LiveModel.Import.loadFromLocalStorage(),
    ],
    [
      '.aeon',
      'Simple Text Format',
      () =>
        startFileImport(
          (fileInput: HTMLInputElement & { files: FileList }) =>
            LiveModel.Import.importFromFile(fileInput),
          '.aeon'
        ),
    ],
    [
      '.sbml',
      'Standard SBML L3',
      () => {
        startFileImport(
          (fileInput: HTMLInputElement & { files: FileList }) =>
            LiveModel.Import.importFromFile(
              fileInput,
              FileConvertors.sbmlToAeon
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
          (fileInput: HTMLInputElement & { files: FileList }) =>
            LiveModel.Import.importFromFile(
              fileInput,
              FileConvertors.bnetToAeon
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
      () => LiveModel.Export.exportToFile('.aeon'),
    ],
    [
      '.sbml (Parametrized)',
      'Parametrized Model',
      () => LiveModel.Export.exportToFile('.sbml', FileConvertors.aeonToSbml),
    ],
    [
      '.sbml (Instantiated)',
      'Wittness Model',
      () =>
        LiveModel.Export.exportToFile(
          '.sbml',
          FileConvertors.aeonToSbmlInstantiated
        ),
    ],
    [
      '.bnet',
      'Boolnet Text Format',
      () => LiveModel.Export.exportToFile('.bnet', FileConvertors.aeonToBnet),
    ],
  ];

  const exampleFirstColButtons: Array<[string, string, () => void]> = [
    ['G2A', 'Cell Division', () => handleExampleImport(ExampleModels.g2a)],
    ['G2B', 'Cell Division', () => handleExampleImport(ExampleModels.g2b)],
  ];

  const exampleSecondColButtons: Array<[string, string, () => void]> = [
    [
      'Orlando',
      'Budding Yeast',
      () => handleExampleImport(ExampleModels.buddingYeastOrlando),
    ],
    [
      'Irons',
      'Budding Yeast',
      () => handleExampleImport(ExampleModels.buddingYeastIrons),
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
        accept={acceptType}
        style={{ display: 'none' }}
        onChange={() => {
          if (fileHandlerRef.current) {
            fileHandlerRef.current(
              fileInputRef.current as HTMLInputElement & { files: FileList }
            );
          } else {
            Message.showError(
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
            <SimpleHeaderReact className="m-2" headerText="Import" />
            {renderButtons('import', importButtons)}
          </section>

          <section
            id="export"
            className="flex flex-col items-center justify-center h-fit w-1/2 w-min-fit gap-2"
          >
            <SimpleHeaderReact className="m-2" headerText="Export" />
            {renderButtons('export', exportButtons)}
          </section>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full h-fit gap-4">
        <SimpleHeaderReact headerText="Example Models" />

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
