import { memo, useState } from 'react';
import NonExtendableContentReact from '../../lit-wrappers/NonExtebdableContentReact';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';
import InvisibleInputWithError from '../InvisibleInputWithError/InvisibleInputWithError';
import type { TableRowWithNameProps } from './TableRowWithNameProps';

const TableRowWithName: React.FC<TableRowWithNameProps> = memo(
  ({
    rowHeight = '45px',
    rowWidth = '100%',

    name = '',
    nameHeight = '100%',
    nameWidth = '40%',
    nameTextColor,
    nameBgcolor = 'transparent',
    nameBorderColor = 'transparent',

    contColor,
    contBorderColor,
    contHoverColor,
    contHoverBorderColor,
    contActiveColor,
    contActiveBorderColor,

    isSelected = false,
    handleClick = () => {},
    handleNameChange = () => undefined,
    handleNameSubmit = () => undefined,
    nameTooltipFun = () => {},
    hideTooltipFun = () => {},

    rerenderOnNameUpdate = false,

    buttons = [],
    buttonHeight = '100%',
    buttonWidth = '65px',
    buttonSectionHeight = '100%',
    buttonSectionWidth = '40%',
  }) => {
    const [forceRerender, setForceRerender] = useState(false);
    const [nameError, setNameError] = useState(false);

    const handleWrite = (
      fun: (newName: string) => string | undefined,
      newName: string
    ) => {
      const result = fun(newName);
      setNameError(result === undefined);

      if (rerenderOnNameUpdate) {
        setForceRerender(!forceRerender);
      }
    };

    return (
      <NonExtendableContentReact
        className="cursor-pointer"
        compHeight={rowHeight}
        compWidth={rowWidth}
        contColor={contColor}
        contHoverColor={contHoverColor}
        contActiveColor={contActiveColor}
        contActiveBorder={`2px ${contActiveBorderColor} solid`}
        contHoverBorder={`2px ${contHoverBorderColor} dashed`}
        contBorder={`2px ${contBorderColor} solid`}
        contentOverflowX="visible"
        contentOverflowY="visible"
        active={isSelected}
        onClick={() => handleClick()}
      >
        <div
          className="border border-dashed rounded-md self-start"
          style={{
            height: nameHeight,
            width: nameWidth,
            backgroundColor: nameBgcolor,
            borderColor: nameBorderColor,
            color: nameTextColor,
          }}
        >
          <InvisibleInputWithError
            height="100%"
            width="100%"
            checkError={() => nameError}
            textColor={nameTextColor}
            onChange={(newName) => {
              handleWrite(handleNameChange, newName);
            }}
            onSubmit={(newName) => {
              handleWrite(handleNameSubmit, newName);
            }}
            value={name}
            showTooltipFunction={(e: MouseEvent) => nameTooltipFun(e)}
            hideTooltipFunction={() => hideTooltipFun()}
            rerenderOnValueUpdate={rerenderOnNameUpdate}
          />
        </div>

        {buttons && buttons.length > 0 ? (
          <section
            className="flex items-center justify-end overflow-y-hidden overflow-x-auto self-end"
            style={{ height: buttonSectionHeight, width: buttonSectionWidth }}
          >
            {buttons.map((button, index) => (
              <TextIconButtonReact
                key={index}
                compHeight={buttonHeight}
                compWidth={buttonWidth}
                buttonHeight="100%"
                buttonWidth="100%"
                text={button.text}
                iconSrc={button.icon}
                iconAlt={button.iconAlt}
                buttonColor={button.buttonBgColor}
                buttonHoverColor={button.buttonHoverColor}
                buttonActiveColor={button.buttonActiveColor}
                textColor={button.buttonTextColor}
                active={button.isActive}
                onMouseEnter={(e: React.MouseEvent) =>
                  button.buttonTooltipFunction(e.nativeEvent)
                }
                onMouseLeave={() => hideTooltipFun()}
                handleClick={() => button.handleClick()}
              />
            ))}
          </section>
        ) : null}
      </NonExtendableContentReact>
    );
  }
);

export default TableRowWithName;
