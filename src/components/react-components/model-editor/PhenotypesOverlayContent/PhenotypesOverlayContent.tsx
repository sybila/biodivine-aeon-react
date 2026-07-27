import { useEffect, useMemo } from 'react';
import type { Phenotype } from '../../../../types';
import SearchTable from '../../global/SearchTable/SearchTable';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { PhenotypesOverlayContentProps } from './PhenotypesOverlayContentProps';
import PhenotypesTableRow from './PhenotypesTableRow/PhenotypesTableRow';

const PhenotypesOverlayContent: React.FC<PhenotypesOverlayContentProps> = ({
  filterElementsFunction,

  liveModelServ,
  phenotypeEditorServ,

  controlStore,
  helpHoverStore,
}) => {
  useEffect(() => {
    return () => helpHoverStore.getState().clear();
  });

  const phenotypes = controlStore((state) => state.phenotypes);
  const currentPhenotype = controlStore((state) => state.currentPhenotype);

  const phenotypesWithId = useMemo(() => {
    return Object.entries(phenotypes).map(([id, phen]) => {
      return { ...phen, id: Number(id) };
    });
  }, [phenotypes]);

  return (
    <div className="flex flex-col justify-around items-center h-[20vh] w-[50vw] gap-2">

      <SearchTable<Phenotype>
        elements={phenotypesWithId}
        filterElements={(elements, text) => {
          return filterElementsFunction(elements, text);
        }}
        getSearchText={() => phenotypeEditorServ.getPhenotypesSearch()}
        setSearchText={(text: string) =>
          phenotypeEditorServ.setPhenotypesSearch(text)
        }
        textInputColor="var(--color-secondary-text-inputs)"
        textInputBorderColor="var(--color-secondary-text-inputs-border)"
        textInputTextColor="var(--color-secondary-text)"
        searchPlaceholder="Search Phenotypes..."
        noRowsPlaceholder="No Phenotypes Available"
        noRowsTextColor="var(--color-primary-text)"
        noRowsHeight="100px"
        noRowsWidth="98%"
        renderRowsWithContainer={(filteredElements) => (
          <section className="flex flex-col h-auto min-h-[100px] max-h-[400px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
            {filteredElements.map((el) => (
              <PhenotypesTableRow
                phenotypeId={el.id}
                phenotypeName={el.name}
                isSelected={el.id === currentPhenotype.id}
                changeActivePhenotype={(id: number) =>
                  liveModelServ.Control.changeCurrentlyActivePhenotype(id)
                }
                helpHoverStore={helpHoverStore}
              />
            ))}
          </section>
        )}
      />
    </div>
  );
};

export default PhenotypesOverlayContent;
