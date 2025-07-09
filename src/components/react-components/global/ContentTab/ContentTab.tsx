import ContentWindowReact from "../../lit-wrappers/ContentWindowReact";
import type { ContentTabProps } from "./ContentTabProps";

const ContentTab: React.FC<ContentTabProps> = ({
  children,
  headerText,
  showTab,
  onClose,
}) => {
  if (!showTab) {
    return;
  }

  console.log(children);

  return (
    <ContentWindowReact
      className="absolute top-1.5 left-[85px] z-9"
      windHeight="600px"
      windMaxHeight="600px"
      windWidth="800px"
      windMaxWidth="800px"
      contentHeight="100%"
      contentWidth="100%"
      contentMaxHeight="100%"
      contentMaxWidth="100%"
      headerText={headerText ?? ""}
      headerWidth="100%"
      showHeader={true}
      showCloseButton={true}
      onCloseClick={onClose}
    >
      {children}
    </ContentWindowReact>
  );
};

export default ContentTab;
