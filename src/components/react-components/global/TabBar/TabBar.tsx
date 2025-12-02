import useTabsStore from '../../../../stores/Navigation/useTabsStore';
import IconButtonReact from '../../lit-wrappers/IconButtonReact';
import TabButton from './TabButton/TabButton';
import { useState } from 'react';

import DeleteIcon from '../../../../assets/icons/delete-24px.svg';
import useHelpHoverStore from '../../../../stores/HelpHover/useHelpHoverStore';

const TabBar: React.FC<{
  setTabBarHelpHover: (event: MouseEvent, text: string) => void;
}> = ({ setTabBarHelpHover }) => {
  const [deleteModeOn, setDeleteModeOn] = useState(false);

  const tabs = useTabsStore((state) => state.openedTabs);

  return (
    <div className="flex flex-row h-full w-fit gap-3 justify-start items-center">
      <section className="flex flex-row h-full w-fit gap-2 justify-center items-center">
        <IconButtonReact
          compHeight="80%"
          iconSrc={DeleteIcon}
          iconAlt="Delete"
          isActive={deleteModeOn}
          buttonColor={deleteModeOn ? 'var(--color-red-light)' : undefined}
          buttonHoverColor={deleteModeOn ? 'var(--color-red)' : undefined}
          buttonActiveColor={
            deleteModeOn ? 'var(--color-darker-red)' : undefined
          }
          onClick={() => setDeleteModeOn(!deleteModeOn)}
          onMouseOver={(e) =>
            setTabBarHelpHover(e.nativeEvent, 'Delete Tab Mode')
          }
          onMouseLeave={(e) => useHelpHoverStore.getState().clear()}
        />
      </section>

      <div className="h-[90%] w-1 bg-black" />

      <div className="h-full min-w-[100px] max-w-[500px] overflow-x-auto flex items-center justify-start gap-2 px-2">
        {Object.values(tabs).map((tab) => (
          <TabButton
            key={tab.id}
            {...tab}
            deleteMode={deleteModeOn}
            setHelpHover={setTabBarHelpHover}
          />
        ))}
      </div>
    </div>
  );
};

export default TabBar;
