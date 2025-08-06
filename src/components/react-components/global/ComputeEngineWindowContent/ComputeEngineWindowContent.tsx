import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import useComputeEngineStatus from '../../../../stores/ComputationManager/useComputeEngineStatus';
import ComputationManager from '../../../../services/global/ComputationManager/ComputationManager';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';

import CloudIcon from '../../../../assets/icons/cloud-24px.svg';
import type { ComputationStatus } from '../../../../types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import Time from '../../../../services/utilities/Time';

const ComputeEngineWindowContent = () => {
  const computeEngineStatus: string = useComputeEngineStatus(
    (state) => state.computeEngineStatus
  );
  const color: string = useComputeEngineStatus((state) => state.statusColor);
  const computationStatus: ComputationStatus = useComputeEngineStatus(
    (state) => state.computationStatus
  );

  const renderStatus = () => {
    const compStatusInfo: Array<{
      label: string;
      value: string;
      color?: string;
    }> = [
      {
        label: 'Computation Status:',
        value: computationStatus.status ?? 'Not available',
        color: color,
      },
      ...(computationStatus.status !== 'No computation'
        ? [
            {
              label: 'Computation Mode:',
              value: computationStatus.computationMode ?? 'Not available',
            },
            {
              label: computationStatus.running ? 'Elapsed:' : 'Ended At:',
              value: Time.getTime(computationStatus.timestamp, computationStatus.running),
            },
          ]
        : []),
    ];

    return (
      <div className="flex flex-col gap-3 items-center w-full h-fit">
        <section className="h-[30px] w-full flex flex-row items-center justify-between px-4 pointer-events-auto">
          <DotHeaderReact
            textColor={color}
            headerText={computeEngineStatus}
            textFontFamily="Helvetica, Arial, sans-serif"
            textFontWeight="bold"
          />
          <TextIconButtonReact
            text={
              computeEngineStatus === 'Connected' ? 'Disconnect' : 'Connect'
            }
            compHeight="100%"
            compWidth="150px"
            iconSrc={CloudIcon}
            handleClick={() => ComputationManager.toggleConnection()}
          />
        </section>

        <div className="h-[2px] w-[94%] mt-2 mb-2 bg-gray-300" />
        <section className="h-fit w-[96%] flex flex-col items-start justify-center gap-1">
          {compStatusInfo.map((info) => (
            <section
              key={info.label}
              className="h-[22px] w-full flex flex-row gap-2"
            >
              <SimpleHeaderReact
                headerText={info.label}
                compHeight="100%"
                textFontSize="19px"
                textFontWeight="normal"
                textFontFamily="FiraMono, monospace"
              />
              <SimpleHeaderReact
                headerText={info.value}
                compHeight="100%"
                textFontSize="19px"
                textFontWeight="normal"
                textFontFamily="FiraMono, monospace"
                textColor={info.color ?? 'black'}
              />
            </section>
          ))}
          {computationStatus.additionalInfo
            ? computationStatus.additionalInfo.map((info, index) => (
                <SimpleHeaderReact
                  key={index}
                  compHeight="fit-content"
                  compWidth="100%"
                  headerText={info}
                  justifyHeader="start"
                  lineHeight="22px"
                  textFontSize="19px"
                  textFontWeight="normal"
                  textFontFamily="FiraMono, monospace"
                  textAlign="start"
                />
              ))
            : null}
        </section>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-[600px] h-fit gap-3 pointer-events-auto">
      <InvisibleInputReact
        compHeight="20px"
        compWidth="100%"
        placeholder="Compute Engine URL"
        singleTextAlign="center"
        handleChange={ComputationManager.setComputeEngineAddress}
        value={ComputationManager.getComputeEngineAddress()}
      />

      {renderStatus()}
    </div>
  );
};

export default ComputeEngineWindowContent;
