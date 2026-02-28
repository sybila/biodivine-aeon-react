import { useState } from 'react';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';
import ValueSliderReact from '../../../lit-wrappers/ValueSliderReact';

import GraphIcon from '../../../../../assets/icons/graph.svg';
import type { AutoExpandSectionProps } from './AutoExpandSectionProps';

const AutoExpandSection: React.FC<AutoExpandSectionProps> = ({
  attractorBifurcationExplorerServ,
}) => {
  const [depth, setDepth] = useState<number>(1);

  return (
    <section className="flex flex-row justify-around items-center h-[40px] w-full gap-2">
      <TextIconButtonReact
        compHeight="95%"
        compWidth="50%"
        text={`Auto-Expand (${depth} level${depth === 1 ? '' : 's'})`}
        iconAlt="Graph Icon"
        iconSrc={GraphIcon}
        handleClick={() =>
          attractorBifurcationExplorerServ.autoExpandBifurcationTreeFromSelected(
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
