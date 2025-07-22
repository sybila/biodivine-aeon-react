import { LiveModel } from '../../../../services/global/LiveModel/LiveModel';
import DoubleTextButtonReact from '../../lit-wrappers/DoubleTextButtonReact';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';

import { ExampleModels } from '../../../../ExampleModels';
import { Message } from '../../../lit-components/message-wrapper';

// This component is used to display the Import/Export tab content in the Model Editor
const ImportExportTabContent: React.FC = () => {
  const handleImport = (importFunction: () => string | undefined) => {
    const error: string | undefined = importFunction();

    if (error) Message.showError(error);
  };

  const importButtons: Array<[string, string, () => string | undefined]> = [
    [
      'Last Model',
      'Browser Storage',
      () => {
        return 'Last Model from Browser Storage';
      },
    ],
    [
      '.AEON',
      'Simple Text Format',
      () => {
        return 'Import AEON Model';
      },
    ],
    [
      '.SBML',
      'Standard SBML L3',
      () => {
        return 'Import Standard SBML L3 Model';
      },
    ],
    [
      '.BNET',
      'Boolnet Text Format',
      () => {
        return 'Import Boolnet Text Format Model';
      },
    ],
  ];

  const exportButtons: Array<[string, string, () => string | undefined]> = [
    [
      '.AEON',
      'Simple Text Format',
      () => {
        return 'Export AEON Model';
      },
    ],
    [
      '.SBML (Parametrized)',
      'Parametrized Model',
      () => {
        return 'Export Parametrized Model';
      },
    ],
    [
      '.SBML (Instantiated)',
      'Wittness Model',
      () => {
        return 'Export Wittness Model';
      },
    ],
    [
      '.BNET',
      'Boolnet Text Format',
      () => {
        return 'Export Boolnet Text Format Model';
      },
    ],
  ];

  const exampleFirstColButtons: Array<
    [string, string, () => string | undefined]
  > = [
    [
      'G2A',
      'Cell Division',
      () => {
        return LiveModel.Import.importAeon(ExampleModels.g2a);
      },
    ],
    [
      'G2B',
      'Cell Division',
      () => {
        return LiveModel.Import.importAeon(ExampleModels.g2b);
      },
    ],
  ];

  const exampleSecondColButtons: Array<[string, string, () => string | undefined]> = [
    [
      'Orlando',
      'Budding Yeast',
      () => {
        return LiveModel.Import.importAeon(ExampleModels.buddingYeastOrlando);
      },
    ],
    [
      'Irons',
      'Budding Yeast',
      () => {
        return LiveModel.Import.importAeon(ExampleModels.buddingYeastIrons);
      },
    ],
  ];

  // This function renders the buttons for import and export sections
  // It takes a buttonType (either "import", "export" or "example" ) and an array
  // of button texts as input, and returns a list of DoubleTextButtonReact components
  const renderButtons = (
    buttonType: string,
    buttonArray: Array<[string, string, () => string | undefined]>
  ) => {
    return buttonArray.map(([leftText, rightText, onClick], index) => (
      <DoubleTextButtonReact
        key={index + buttonType}
        leftText={leftText}
        rightText={rightText}
        onClick={() => handleImport(onClick)}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-4">
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
