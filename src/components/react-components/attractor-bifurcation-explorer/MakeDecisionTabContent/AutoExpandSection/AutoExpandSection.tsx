import { useState } from 'react';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';
import ValueSliderReact from '../../../lit-wrappers/ValueSliderReact';
import AttractorBifurcationExplorer from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';

import GraphIcon from '../../../../../assets/icons/graph.svg';

const AutoExpandSection: React.FC = () => {
  const [depth, setDepth] = useState<number>(1);

  return (
    <section className="flex flex-row justify-around items-center h-[30px] w-full gap-2">
      <TextIconButtonReact
        compWidth="50%"
        text={`Auto-Expand (${depth} level${depth === 1 ? '' : 's'})`}
        iconAlt="Graph Icon"
        iconSrc={GraphIcon}
        handleClick={() =>
          AttractorBifurcationExplorer.autoExpandBifurcationTreeFromSelected(
            depth
          )
        }
      />
      <ValueSliderReact
        compWidth="25%"
        value={depth}
        handleInput={setDepth}
        step={1}
        minValue={1}
        maxValue={10}
      />
    </section>
  );
};

export default AutoExpandSection;
