import OverlayWindowReact from '../../lit-wrappers/OverlayWindowReact';
import type { ContentOverlayWindowProps } from './ContentOverlayWindowProps';

const ContentOverlayWindow: React.FC<ContentOverlayWindowProps> = ({
  zIndex,
  overlayWindowStore,
}) => {
  const currentContent = overlayWindowStore((state) => state.currentContent);

  const closeOverlay = () => {
    overlayWindowStore.getState().setCurrentContent(null);
  };

  if (!currentContent) {
    return null;
  }

  return (
    <OverlayWindowReact
      showCloseButton={currentContent.showCloseButton}
      showHeader={true}
      headerText={currentContent.header}
      handleBackgroundClick={() =>
        currentContent.closeOnBgClick ? closeOverlay() : null
      }
      handleCloseClick={() => closeOverlay()}
      compZIndex={zIndex}
      windMaxWidth="90vw"
      windMaxHeight="90vh"
    >
      {currentContent.content}
    </OverlayWindowReact>
  );
};

export default ContentOverlayWindow;
