import { useMemo, useState } from 'react';
import type { Phenotype } from '../../../../../types';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import TextInputReact from '../../../lit-wrappers/TextInputReact';
import PhenotypeInfo from './PhenotypeInfo/PhenotypeInfo';
import type { PhenotypesTableProps } from './PhenotypesTableProps';

const PhenotypesTable: React.FC<PhenotypesTableProps> = ({
  phenotypeEditorServ,
  pageStringProviderServ,

  controlStore,
  helpHoverStore,
}) => {
  const [phenotypeSearchText, setPhenotypeSearchText] = useState<string>(
    phenotypeEditorServ.getActivePhenotypeVariableSearch()
  );

  const phenotypes = controlStore((state) => state.phenotypes);
  const activePhenotype = controlStore((state) => state.currentPhenotype);

  const setPhenotypeSearch = (name: string) => {
    if (name !== phenotypeSearchText) {
      phenotypeEditorServ.setPhenotypeSearch(name);
      setPhenotypeSearchText(name);
    }
  };

  const filteredPhenotypes = useMemo(() => {
    return phenotypes === undefined
      ? []
      : Object.entries(phenotypes)
          .filter((phen) => phen[1].name.includes(phenotypeSearchText))
          .map((phen) => {
            return { ...phen[1], id: Number(phen[0]) };
          });
  }, [phenotypes, phenotypeSearchText]);

  return (
    <section className="flex flex-col items-center w-full h-fit gap-1 mb-3">
      <TextInputReact
        textColor="var(--color-secondary-text)"
        inputColor="var(--color-secondary-text-inputs)"
        inputBorderColor="var(--color-secondary-text-inputs-border)"
        compWidth="95%"
        placeholder="Search phenotypes..."
        onWrite={setPhenotypeSearch}
        value={phenotypeSearchText}
      />

      {!filteredPhenotypes || filteredPhenotypes.length === 0 ? (
        <section className="flex h-[200px] w-[98%] justify-center items-center">
          <SimpleHeaderReact
            textColor="var(--color-primary-text)"
            headerText="No Phenotypes"
            textFontWeight="normal"
          />
        </section>
      ) : (
        <section className="flex flex-col min-h-[50px] h-auto max-h-[152px] md:max-h-[252px] xl:max-h-[352px] 2xl:max-h-[452px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
          {filteredPhenotypes.map((phenotype: Phenotype) => (
            <PhenotypeInfo
              key={phenotype.id}
              id={phenotype.id}
              name={phenotype.name ?? 'Unknown Phenotype'}
              selected={phenotype.id === activePhenotype.id}
              toggleSelect={() =>
                controlStore.getState().switchPhenotype(phenotype.id)
              }
              pageStringProviderServ={pageStringProviderServ}
              helpHoverStore={helpHoverStore}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default PhenotypesTable;
