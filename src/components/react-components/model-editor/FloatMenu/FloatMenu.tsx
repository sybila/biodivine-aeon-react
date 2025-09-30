import { useState } from 'react';
import useModelEditorStatus from '../../../../stores/ModelEditor/useModelEditorStatus';
import VariableMenuButtons from './VariableMenuButtons/VariableMenuButtons';
import RegulationMenuButtons from './RegulationMenuButtons/RegulationMenuButtons';

const FloatMenu = () => {
  const [currentHint, setCurrentHint] = useState<string>('');

  const modelStatus = useModelEditorStatus((state) => state);

  if (!modelStatus.floatingMenuInfo || !modelStatus.selectedItemInfo) {
    return null;
  }

  console.log(
    modelStatus.floatingMenuInfo.position,
    modelStatus.floatingMenuInfo.zoom
  );

  return (
    <div
      className="flex flex-col h-auto w-auto gap-2 justify-around items-center z-8 select-none pointer-events-none"
      style={{
        position: 'absolute',
        left: modelStatus.floatingMenuInfo.position[0] + 'px',
        top:
          modelStatus.floatingMenuInfo.position[1] +
          52 * modelStatus.floatingMenuInfo.zoom +
          'px',
        transform:
          'translate(-50%, -50%) scale(' +
          modelStatus.floatingMenuInfo.zoom * 0.75 +
          ')',
        transformOrigin: 'top top',
      }}
    >
      <div className="flex flex-col h-auto max-w-[153px] rounded-[24px] bg-[var(--color-grey-blue-ultra-light)] pointer-events-auto">
        {modelStatus.selectedItemInfo.type === 'regulation' ? (
          <RegulationMenuButtons
            setHint={setCurrentHint}
            selectedRegulationIds={modelStatus.selectedItemInfo.regulationIds}
          />
        ) : (
          <VariableMenuButtons
            setHint={setCurrentHint}
            selectedVariableId={modelStatus.selectedItemInfo.id}
          />
        )}
      </div>
      <span className="h-[24px] w-[190px] text-[14px] text-shadow-[0px 2px 5px #d0d0d0] font-[--var(--base-font-family)] text-center font-bold select-none pointer-none text-black">
        {currentHint}
      </span>
    </div>
  );
};

export default FloatMenu;
