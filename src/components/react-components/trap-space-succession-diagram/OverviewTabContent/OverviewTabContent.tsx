import { useMemo, useState } from 'react';
import type { NodeDataTSSD } from '../../../../types';
import NoDataText from '../../global/NoDataText/NoDataText';
import ColoredWordsReact from '../../lit-wrappers/ColoredWordsReact';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import StatTableReact from '../../lit-wrappers/StatTableReact';
import type { OverviewTabContentProps } from './OverviewTabContentProp';

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  trapSpaceSDStatusStore,
}) => {
  const [stateAsText, setStateAsText] = useState<boolean>(false);

  const selectedNode: NodeDataTSSD | null = trapSpaceSDStatusStore(
    (state) => state.selectedNode
  );

  const stats: {
    name: string;
    value: string;
    nameWidth: string;
    valueWidth: string;
  }[] = useMemo(() => {
    if (!selectedNode) return [];

    // Counts how many variables are fixed (have state 0 or 1) and how many are free (have state undefined/*)
    const stateNumbers: [number, number] = Object.values(
      selectedNode.variableValues
    ).reduce<[number, number]>(
      (acc, value) =>
        value === 0 || value === 1
          ? [acc[0] + 1, acc[1]]
          : [acc[0], acc[1] + 1],
      [0, 0]
    );
    return [
      {
        name: 'Number Of Interpretations',
        value: selectedNode.cardinality.toString(),
        nameWidth: '60%',
        valueWidth: '39%',
      },
      {
        name: 'Number Of Children',
        value: selectedNode.childNodeIds.length.toString(),
        nameWidth: '60%',
        valueWidth: '39%',
      },
      {
        name: 'Number Of Fixed',
        value: stateNumbers[0].toString(),
        nameWidth: '60%',
        valueWidth: '39%',
      },
      {
        name: 'Number Of Free',
        value: stateNumbers[1].toString(),
        nameWidth: '60%',
        valueWidth: '39%',
      },
    ];
  }, [selectedNode]);

  if (!selectedNode) {
    return <NoDataText text="No selected node" />;
  }

  const words: { text: string; color: string; weight: string }[] =
    Object.entries(selectedNode.variableValues).map(([key, value]) => ({
      text: stateAsText ? `${key}: ${value ?? '*'}` : `${key}`,
      color: `${value === 0 ? 'var(--color-negative)' : value === 1 ? 'var(--color-positive)' : 'var(--color-neutral)'}`,
      weight: `${value === 0 || value === 1 ? 'bold' : 'normal'}`,
    }));

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pb-1">
      <DotHeaderReact
        compHeight="30px"
        compWidth="100%"
        justifyHeader="start"
        headerText="State Variables"
      />

      <div
        className="h-fit w-full cursor-pointer"
        onClick={() => setStateAsText((prev) => !prev)}
      >
        <ColoredWordsReact
          words={words}
          contMaxWidth="98%"
          contMinWidth="98%"
          lineHeight="25px"
          fontSize="24px"
        />
      </div>

      <DotHeaderReact
        compHeight="30px"
        compWidth="100%"
        justifyHeader="start"
        headerText="Stats"
      />

      <StatTableReact
        separator=":"
        statNameValueGap="1%"
        contMinWidth="95%"
        contMaxWidth="95%"
        contMinHeight="fit-content"
        contMaxHeight="130px"
        stats={stats}
      />
    </div>
  );
};

export default OverviewTabContent;
