import type { ReactNode } from "react";

const SideButtonMenu: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col max-h-fit min-h-[67px] w-67px gap-2.5 p-1.5 z-10 absolute top-0 left-0 overflow-y-auto overflow-x-visible">
      {children}
    </div>
  );
};

export default SideButtonMenu;
