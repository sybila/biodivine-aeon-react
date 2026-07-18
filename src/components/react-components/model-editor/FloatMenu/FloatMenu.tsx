import { useState } from 'react';
import type { FloatMenuProps } from './FloatMenuProps';
import RegulationMenuButtons from './RegulationMenuButtons/RegulationMenuButtons';
import VariableMenuButtons from './VariableMenuButtons/VariableMenuButtons';

const FloatMenu: React.FC<FloatMenuProps> = ({
  liveModelServ,
  modelEditorServ,
  modelEditorStatusStore,
  regulationsStore,
}) => {
  const [currentHint, setCurrentHint] = useState<string>('');

  const floatingMenuInfo = modelEditorStatusStore(
    (state) => state.floatingMenuInfo
  );

  if (!floatingMenuInfo) {
    return null;
  }

  return (
    <div
      className="flex flex-col h-auto w-auto gap-2 justify-around items-center z-8 select-none pointer-events-none"
      style={{
        position: 'absolute',
        left: floatingMenuInfo.position[0] + 'px',
        top: floatingMenuInfo.position[1] + 52 * floatingMenuInfo.zoom + 'px',
        transform:
          'translate(-50%, -50%) scale(' + floatingMenuInfo.zoom * 0.75 + ')',
        transformOrigin: 'top top',
      }}
    >
      <div className="flex flex-col h-auto max-w-[153px] rounded-[24px] bg-(--color-model-float-menu) pointer-events-auto">
        {floatingMenuInfo.itemInfo.type === 'regulation' ? (
          <RegulationMenuButtons
            setHint={setCurrentHint}
            selectedRegulationIds={floatingMenuInfo.itemInfo.regulationIds}
            liveModelServ={liveModelServ}
            regulationsStore={regulationsStore}
          />
        ) : (
          <VariableMenuButtons
            setHint={setCurrentHint}
            selectedVariableId={floatingMenuInfo.itemInfo.id}
            liveModelServ={liveModelServ}
            modelEditorServ={modelEditorServ}
          />
        )}
      </div>
      <span className="h-[24px] w-[190px] text-[14px] text-shadow-[0px 2px 5px #d0d0d0] font-(--base-font-family) text-center font-bold select-none pointer-none text-(--color-model-float-menu-hint-text)">
        {currentHint}
      </span>
    </div>
  );
};

export default FloatMenu;
