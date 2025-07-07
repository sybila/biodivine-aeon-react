import ContentWindowReact from "../../lit-wrappers/ContentWindowReact";
import type { ContentTabProps } from "./ContentTabProps";

const ContentTab: React.FC<ContentTabProps> = ({ children, showTab }) => {
  if (!showTab) {
    return;
  }

  return (
    <ContentWindowReact
      className="absolute top-1.5 left-[85px] z-9"
      showHeader={true}
    >
      {children}
    </ContentWindowReact>
  );
};

export default ContentTab;
