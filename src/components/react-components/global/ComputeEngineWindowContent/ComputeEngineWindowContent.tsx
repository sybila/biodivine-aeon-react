import config from '../../../../config';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';

import CloudIcon from '../../../../assets/icons/cloud-24px.svg';
import Time from '../../../../services/utilities/Time';
import type { ComputationStatus } from '../../../../types/types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import SeparatorLine from '../SeparatorLine/SeparatorLine';
import type { ComputeEngineWindowContentProps } from './ComputeEngineWindowContentProps';

const ComputeEngineWindowContent: React.FC<ComputeEngineWindowContentProps> = ({
  computationManagerServ,
  pageStringProviderServ,

  computeEngineStatusStore,
  helpHoverStore,
}) => {
  const computeEngineStatus: string = computeEngineStatusStore(
    (state) => state.computeEngineStatus
  );
  const color: string = computeEngineStatusStore((state) => state.statusColor);
  const computationStatus: ComputationStatus = computeEngineStatusStore(
    (state) => state.computationStatus
  );

  const isComputeEngineConnected: boolean = computeEngineStatus === 'Connected';

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
              value: Time.getTime(
                computationStatus.timestamp,
                computationStatus.running
              ),
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
            textFontFamily="var(--base-font-family)"
            textFontWeight="bold"
          />
          <TextIconButtonReact
            text={isComputeEngineConnected ? 'Disconnect' : 'Connect'}
            compHeight="100%"
            compWidth="150px"
            buttonColor="var(--color-secondary-buttons)"
            buttonHoverColor="var(--color-secondary-buttons-hover)"
            textColor="var(--color-secondary-text)"
            iconSrc={CloudIcon}
            handleClick={() => computationManagerServ.toggleConnection()}
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  pageStringProviderServ.Tooltips.OverlayWindowTooltips.ComputeEngineTooltips.connectComputeEngineButton(
                    isComputeEngineConnected
                  ),
                  true,
                  -50
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
        </section>

        <SeparatorLine />
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
                textFontFamily="var(--font-family-fira-mono)"
                textColor="var(--color-primary-text)"
              />
              <SimpleHeaderReact
                headerText={info.value}
                compHeight="100%"
                textFontSize="19px"
                textFontWeight="normal"
                textFontFamily="var(--font-family-fira-mono)"
                textColor={info.color ?? 'var(--color-primary-text)'}
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
                  textFontFamily="var(--font-family-fira-mono)"
                  textColor="var(--color-primary-text)"
                  textAlign="start"
                />
              ))
            : null}
        </section>
      </div>
    );
  };

  const openComputeEngineOverlay = () => {
    window.open(
      config.computeEngine.downloadLink,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="flex flex-col items-center w-[600px] h-fit gap-3 pointer-events-auto">
      <InvisibleInputReact
        compHeight="20px"
        compWidth="100%"
        placeholder="Compute Engine URL"
        textAlign="center"
        textColor="var(--color-primary-text)"
        handleChange={computationManagerServ.setComputeEngineAddress}
        value={computationManagerServ.getComputeEngineAddress()}
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.OverlayWindowTooltips.ComputeEngineTooltips.changeComputeEngineAddress(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />

      {renderStatus()}

      <SeparatorLine />

      <TextButtonReact
        className="mb-2"
        compHeight="30px"
        compWidth="95%"
        text="Download Compute Engine"
        textColor="var(--color-secondary-text)"
        buttonColor="var(--color-secondary-buttons)"
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        handleClick={openComputeEngineOverlay}
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.OverlayWindowTooltips.ComputeEngineTooltips.downloadComputeEngine(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />
    </div>
  );
};

export default ComputeEngineWindowContent;
