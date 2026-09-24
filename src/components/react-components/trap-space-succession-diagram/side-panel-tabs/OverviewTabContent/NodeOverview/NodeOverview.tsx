import { useMemo, useState } from 'react';
import ColoredWordsReact from '../../../../lit-wrappers/ColoredWordsReact';
import DotHeaderReact from '../../../../lit-wrappers/DotHeaderReact';
import StatTableReact from '../../../../lit-wrappers/StatTableReact';
import type { NodeOverviewProps } from './NodeOverviewProps';

const NodeOverview: React.FC<NodeOverviewProps> = ({
  selectedNode,
  generalStringsServ,
}) => {
  const [stateAsText, setStateAsText] = useState<boolean>(false);

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
        name: generalStringsServ.numberOfInterpretationsStatName(),
        value: selectedNode.cardinality.toString(),
        nameWidth: '60%',
        valueWidth: '39%',
      },
      {
        name: generalStringsServ.numberOfChildrenStatName(),
        value: selectedNode.stableMotifs.length.toString(),
        nameWidth: '60%',
        valueWidth: '39%',
      },
      {
        name: generalStringsServ.numberOfFixedVarsStatName(),
        value: stateNumbers[0].toString(),
        nameWidth: '60%',
        valueWidth: '39%',
      },
      {
        name: generalStringsServ.numberOfFreeVarsStatName(),
        value: stateNumbers[1].toString(),
        nameWidth: '60%',
        valueWidth: '39%',
      },
    ];
  }, [selectedNode]);

  const words: { text: string; color: string; weight: string }[] =
    Object.entries(selectedNode.variableValues).map(([key, value]) => ({
      text: stateAsText ? `${key}: ${value ?? '*'}` : `${key}`,
      color: `${value === 0 ? 'var(--color-negative)' : value === 1 ? 'var(--color-positive)' : 'var(--color-neutral)'}`,
      weight: `${value === 0 || value === 1 ? 'bold' : 'normal'}`,
    }));

  return (
    <>
      <DotHeaderReact
        compHeight="30px"
        compWidth="100%"
        justifyHeader="start"
        headerText={generalStringsServ.nodeStateVariablesHeader()}
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
        headerText={generalStringsServ.statisticsHeader()}
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
    </>
  );
};

export default NodeOverview;
