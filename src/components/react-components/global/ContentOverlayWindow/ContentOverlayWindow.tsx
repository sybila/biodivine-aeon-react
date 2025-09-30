import useOverlayWindowStore from '../../../../stores/ContentOverlayWindow/useOverlayWindowStore';
import OverlayWindowReact from '../../lit-wrappers/OverlayWindowReact';

const ContentOverlayWindow: React.FC<{ zIndex: string }> = ({ zIndex }) => {
  const currentContent = useOverlayWindowStore((state) => state.currentContent);

  if (!currentContent) {
    return null;
  }

  const closeOverlay = () => {
    useOverlayWindowStore.getState().setCurrentContent(null);
  };

  return (
    <OverlayWindowReact
      showCloseButton={true}
      showHeader={true}
      headerText={currentContent.header}
      handleBackgroundClick={() => closeOverlay()}
      handleCloseClick={() => closeOverlay()}
      compZIndex={zIndex}
      windMaxWidth="80%"
      windMaxHeight="80%"
      windOverflowX="auto"
      windOverflowY="auto"
    >
      {currentContent.content}
    </OverlayWindowReact>
  );
};

export default ContentOverlayWindow;
