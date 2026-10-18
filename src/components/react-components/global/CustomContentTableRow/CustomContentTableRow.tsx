import { memo } from 'react';
import NonExtendableContentReact from '../../lit-wrappers/NonExtebdableContentReact';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';
import type { CustomContentTableRowProps } from './CustomContentTableRowProps';

const CustomContentTableRow: React.FC<CustomContentTableRowProps> = memo(
  ({
    rowHeight = '45px',
    rowWidth = '100%',

    customContent,

    contColor,
    contBorderColor,
    contHoverColor,
    contHoverBorderColor,
    contActiveColor,
    contActiveBorderColor,

    isSelectable = false,
    isSelected = false,
    hover = false,
    handleMouseEnter = () => {},
    handleMouseLeave = () => {},
    handleClick = () => {},
    hideTooltipFun = () => {},

    buttons = [],
    buttonHeight = '100%',
    buttonWidth = '65px',
    buttonsGap = '5px',
    buttonSectionHeight = '100%',
    buttonSectionWidth = 'fit-content',
  }) => {
    return (
      <NonExtendableContentReact
        style={isSelectable ? { cursor: 'pointer' } : {}}
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
        hover={hover}
        onClick={() => handleClick()}
        handleMouseEnter={() => handleMouseEnter()}
        handleMouseLeave={() => handleMouseLeave()}
        contentJustifyC="space-between"
        contentAlignI="center"
      >
        {customContent}

        {buttons && buttons.length > 0 ? (
          <section
            className="flex items-center justify-end overflow-visible self-end"
            onClick={(e) => e.stopPropagation()}
            style={{
              height: buttonSectionHeight,
              width: buttonSectionWidth,
              gap: buttonsGap,
            }}
          >
            {buttons.map((button, index) => (
              <TextIconButtonReact
                key={index}
                compHeight={buttonHeight}
                compWidth={buttonWidth}
                buttonHeight="100%"
                buttonWidth="100%"
                iconHeight="21px"
                textFontWeight="normal"
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

export default CustomContentTableRow;
