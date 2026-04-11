import IconButtonReact from '../../lit-wrappers/IconButtonReact';

import EngineIcon from '../../../../assets/icons/engine-48px.svg';
import type { NavigationDockContentProps } from './NavigationDockContentProps';

const NavigationDockContent: React.FC<NavigationDockContentProps> = ({
  helpHoverStore,
  children,
  handleComputeEngineClick,
  setNavBarHelpHover,
}) => {
  return (
    <div className="flex flex-row max-h-full h-full w-fit gap-3 p-1.5 overflow-y-hidden overflow-x-hidden justify-center items-center">
      <section className="flex flex-row h-full w-fit gap-2 justify-center items-center">
        <IconButtonReact
          compHeight="80%"
          iconSrc={EngineIcon}
          handleClick={handleComputeEngineClick}
          iconAlt="Engine"
          onMouseOver={(e) =>
            setNavBarHelpHover?.(e.nativeEvent, 'Compute Engine')
          }
          onMouseLeave={(e) => helpHoverStore.getState().clear()}
        />
      </section>

      <div className="h-[90%] w-1 bg-black"></div>

      {children}
    </div>
  );
};

export default NavigationDockContent;
