import DoubleTextButtonReact from '../../lit-wrappers/DoubleTextButtonReact';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';

// This component is used to display the Import/Export tab content in the Model Editor
const ImportExportTabContent: React.FC = () => {
  const importButtons: Array<[string, string]> = [
    ['Last Model', 'Browser Storage'],
    ['.AEON', 'Simple Text Format'],
    ['.SBML', 'Standard SBML L3'],
    ['.BNET', 'Boolnet Text Format'],
  ];

  const exportButtons: Array<[string, string]> = [
    ['.AEON', 'Simple Text Format'],
    ['.SBML (Parametrized)', 'Parametrized Model'],
    ['.SBML (Instantiated)', 'Wittness Model'],
    ['.BNET', 'Boolnet Text Format'],
  ];

  const exampleModelsButtons: Array<[string, string]> = [
    ['G2A', 'Cell Division'],
    ['Orlando', 'Budding Yeast'],
    ['G2B', 'Cell Division'],
    ['Irons', 'Budding Yeast'],
  ];

  // This function renders the buttons for import and export sections
  // It takes a buttonType (either "import", "export" or "example" ) and an array
  // of button texts as input, and returns a list of DoubleTextButtonReact components
  const renderButtons = (
    buttonType: string,
    buttonArray: Array<[string, string]>
  ) => {
    return buttonArray.map(([leftText, rightText], index) => (
      <DoubleTextButtonReact
        key={index + buttonType}
        leftText={leftText}
        rightText={rightText}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <section className="flex flex-row items-center justify-center h-fit w-full w-min-fit gap-2">
        <section className="flex flex-col items-center justify-center h-fit w-1/2 w-min-fit gap-2">
          <SimpleHeaderReact headerText='Import' />
          {renderButtons('import', importButtons)}
        </section>

        <section className="flex flex-col items-center justify-center h-fit w-1/2 w-min-fit gap-2">
          <SimpleHeaderReact headerText='Export' />
          {renderButtons('export', exportButtons)}
        </section>
      </section>
    </div>
  );
};

export default ImportExportTabContent;
