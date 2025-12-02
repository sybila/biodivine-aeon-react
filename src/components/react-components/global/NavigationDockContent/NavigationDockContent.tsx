import IconButtonReact from '../../lit-wrappers/IconButtonReact';

import ResultsIcon from '../../../../assets/icons/call_split-48px.svg';
import EngineIcon from '../../../../assets/icons/engine-48px.svg';
import type { NavigationDockContentProps } from './NavigationDockContentProps';
import useHelpHoverStore from '../../../../stores/HelpHover/useHelpHoverStore';

const NavigationDockContent: React.FC<NavigationDockContentProps> = ({
  children,
  handleResultsClick,
  handleComputeEngineClick,
  setNavBarHelpHover,
}) => {
  return (
    <div className="flex flex-row max-h-full h-full w-fit gap-3 p-1.5 overflow-y-hidden overflow-x-hidden justify-center items-center">
      <section className="flex flex-row h-full w-fit gap-2 justify-center items-center">
        <IconButtonReact
          compHeight="80%"
          iconSrc={ResultsIcon}
          iconAlt="Results"
          handleClick={handleResultsClick}
          onMouseOver={(e) => setNavBarHelpHover?.(e.nativeEvent, 'Results')}
          onMouseLeave={(e) => useHelpHoverStore.getState().clear()}
        />

        <IconButtonReact
          compHeight="80%"
          iconSrc={EngineIcon}
          handleClick={handleComputeEngineClick}
          iconAlt="Engine"
          onMouseOver={(e) =>
            setNavBarHelpHover?.(e.nativeEvent, 'Compute Engine')
          }
          onMouseLeave={(e) => useHelpHoverStore.getState().clear()}
        />
      </section>

      <div className="h-[90%] w-1 bg-black"></div>

      {children}
    </div>
  );
};

export default NavigationDockContent;
