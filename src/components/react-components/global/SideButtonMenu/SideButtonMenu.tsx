import type { ReactNode } from "react";

const SideButtonMenu: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <div className="h-1/3 w-1/6 p-1 z-10 absolute top-0 left-0 overflow-auto min-h-[67px]">{children}</div>;
};

export default SideButtonMenu;
