import ContentWindowReact from '../../lit-wrappers/ContentWindowReact';
import type { ContentTabProps } from './ContentTabProps';

const ContentTab: React.FC<ContentTabProps> = ({
  children,
  headerText,
  showTab = false,
  spaceOnTop = false,
  onClose,
  overflowY = 'auto',
}) => {
  if (!showTab) {
    return;
  }

  return (
    <ContentWindowReact
      className="absolute z-9"
      style={{
        top: `${spaceOnTop ? '75px' : '6px'}`,
        left: `${spaceOnTop ? '6px' : '85px'}`,
      }}
      compMaxHeight="98%"
      windHeight="auto"
      windOverflowY={overflowY}
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
