import type { ReactNode } from 'react';

const TopButtonMenu: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-row max-w-fit min-w-[67px] h-67px gap-2.5 p-1.5 z-10 absolute top-0 left-0 overflow-x-visible overflow-y-visible">
      {children}
    </div>
  );
};

export default TopButtonMenu;
