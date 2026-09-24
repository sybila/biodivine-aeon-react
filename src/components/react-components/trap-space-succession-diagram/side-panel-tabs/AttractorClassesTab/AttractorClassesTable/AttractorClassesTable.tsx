import { useState } from 'react';
import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';
import AttractorClassesTableRow from '../AttractorClassesTableRow/AttractorClassesTableRow';
import type { AttractorClassesTableProps } from './AttractorClassesTableProps';

import PlusIcon from '../../../../../../assets/icons/add_box.svg';

const AttractorClassesTable: React.FC<AttractorClassesTableProps> = ({
  selectedItemId,
  selectedItemType,

  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,

  trapSpaceSDStatusStore,
  helpHoverStore,
}) => {
  const [attractorsOpened, setAttractorsOpened] = useState(false);
  const attractorClasses = trapSpaceSDStatusStore(
    (state) => state.computedAttractorClasses
  );

  if (!attractorsOpened || !attractorClasses) {
    return (
      <TextIconButtonReact
        className="mb-2"
        compWidth="95%"
        text={generalStringsServ.getAttractorClassesButton()}
        textColor="var(--color-secondary-text)"
        buttonColor="var(--color-secondary-buttons)"
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        iconAlt="Plus Icon"
        iconSrc={PlusIcon}
        handleClick={() => {
          if (!attractorClasses) {
            trapSpaceSDServ.getAttractorClasses(
              selectedItemType,
              selectedItemId
            );
          }
          setAttractorsOpened(true);
          helpHoverStore.getState().clear();
        }}
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              tooltipStringsServ.getAttractorClassesButton(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />
    );
  }

  const renderTable = () => {
    return (
      <section className="flex flex-col w-[98%] h-fit items-center justify-center gap-2">
        <div className="flex flex-row justify-start items-center w-full h-[50px]">
          <div className="flex flex-col justify-center items-center w-[30%] h-full">
            <SimpleHeaderReact
              headerText="Behavior"
              textColor="var(--color-primary-text)"
            />
            <SimpleHeaderReact
              headerText="Class"
              textColor="var(--color-primary-text)"
            />
          </div>

          <div className="flex flex-col justify-center items-center ml-[5%] w-[30%] h-full">
            <SimpleHeaderReact
              headerText="Interpretation"
              textColor="var(--color-primary-text)"
            />
            <SimpleHeaderReact
              headerText="Count"
              textColor="var(--color-primary-text)"
            />
          </div>
        </div>

        <section className="flex flex-col w-full h-fit max-h-[100px] 2xl:max-h-[250px] gap-2 overflow-auto">
          {attractorClasses
            .sort(
              (a, b) => b.numberOfInterpretations - a.numberOfInterpretations
            )
            .map((attrClass, index) => (
              <AttractorClassesTableRow
                key={index}
                interpretationCount={attrClass.numberOfInterpretations}
                behaviorClassList={attrClass.classBehavior}
                trapSpaceSDServ={trapSpaceSDServ}
                generalStringsServ={generalStringsServ}
                tooltipStringsServ={tooltipStringsServ}
                helpHoverStore={helpHoverStore}
              />
            ))}
        </section>
      </section>
    );
  };

  return (
    <section className="flex flex-col w-full max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] gap-2 overflow-y-auto">
      {renderTable()}
    </section>
  );
};

export default AttractorClassesTable;
