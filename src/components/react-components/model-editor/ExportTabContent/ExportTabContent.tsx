import { LiveModel } from '../../../../services/global/LiveModel/LiveModel';
import DoubleTextButtonReact from '../../lit-wrappers/DoubleTextButtonReact';

import FileConvertors from '../../../../services/utilities/FileConvertors';

/** This component is used to display the Export tab content in the witness mode of the Model Editor */
const ExportTabContent: React.FC = () => {
  const buttonsFirstCol: Array<[string, string, () => void]> = [
    [
      '.aeon',
      'Simple Text Format',
      () => LiveModel.Export.exportToFile('.aeon'),
    ],
    [
      '.bnet',
      'Boolnet Text Format',
      () => LiveModel.Export.exportToFile('.bnet', FileConvertors.aeonToBnet),
    ],
  ];

  const buttonSecondCol: Array<[string, string, () => void]> = [
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
  ];

  /** This function renders the buttons for import and export sections
  It takes a column (either "first", "second" ) and an array
  of button texts as input, and returns a list of DoubleTextButtonReact components */
  const renderButtons = (
    column: string,
    buttonArray: Array<[string, string, () => void]>
  ) => {
    return buttonArray.map(([leftText, rightText, onClick], index) => (
      <DoubleTextButtonReact
        key={index + column}
        leftText={leftText}
        rightText={rightText}
        onClick={() => onClick()}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-4">
      <div className="flex flex-row items-center justify-center h-fit w-full w-min-fit gap-2 mt-2 mb-2">
        <section className="flex flex-col items-center justify-center h-fit w-1/2 w-min-fit gap-2">
          {renderButtons('first', buttonsFirstCol)}
        </section>

        <section className="flex flex-col items-center justify-center h-fit w-1/2 w-min-fit gap-2">
          {renderButtons('second', buttonSecondCol)}
        </section>
      </div>
    </div>
  );
};

export default ExportTabContent;
