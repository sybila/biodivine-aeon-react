import OverlayWindowReact from '../../lit-wrappers/OverlayWindowReact';
import type { ContentOverlayWindowProps } from './ContentOverlayWindowProps';

const ContentOverlayWindow: React.FC<ContentOverlayWindowProps> = ({
  zIndex,
  overlayWindowStore,
}) => {
  const currentContent = overlayWindowStore((state) => state.currentContent);

  if (!currentContent) {
    return null;
  }

  const closeOverlay = () => {
    overlayWindowStore.getState().setCurrentContent(null);
  };

  return (
    <OverlayWindowReact
      showCloseButton={true}
      showHeader={true}
      headerText={currentContent.header}
      handleBackgroundClick={() => closeOverlay()}
      handleCloseClick={() => closeOverlay()}
      compZIndex={zIndex}
      windWidth="auto"
      windMaxWidth="80%"
      windHeight="auto"
      windMaxHeight="80%"
      windOverflowX="auto"
      windOverflowY="auto"
    >
      {currentContent.content}
    </OverlayWindowReact>
  );
};

export default ContentOverlayWindow;
