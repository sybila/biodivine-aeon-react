import { memo, useState } from 'react';
import NonExtendableContentReact from '../../lit-wrappers/NonExtebdableContentReact';
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
          className="border border-dashed rounded-md"
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
      </NonExtendableContentReact>
    );
  }
);

export default TableRowWithName;
