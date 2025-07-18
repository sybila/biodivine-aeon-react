import ContentWindowReact from '../../lit-wrappers/ContentWindowReact';
import type { ContentTabProps } from './ContentTabProps';

const ContentTab: React.FC<ContentTabProps> = ({
  maxHeight,
  children,
  headerText,
  showTab,
  onClose,
}) => {
  if (!showTab) {
    return;
  }

  return (
    <ContentWindowReact
      className="absolute top-1.5 left-[85px] z-9"
      compMaxHeight="98%"
      headerText={headerText ?? ''}
      showHeader={true}
      showCloseButton={true}
      onCloseClick={onClose}
    >
      {children}
    </ContentWindowReact>
  );
};

export default ContentTab;
