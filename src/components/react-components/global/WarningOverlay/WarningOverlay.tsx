import useWarningStore from '../../../../stores/Warning/useWarningStore';
import OverlayWindowReact from '../../lit-wrappers/OverlayWindowReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';

const WarningOverlay: React.FC<{ zIndex: string }> = ({ zIndex }) => {
  const warningLinkedList = useWarningStore((state) => state.warningLinkedList);

  if (!warningLinkedList) {
    return null;
  }

  return (
    <OverlayWindowReact
      compZIndex={zIndex}
      windHeight="auto"
      windMaxHeight="80%"
      windWidth="auto"
      windMaxWidth="40%"
      contentJustifyC="center"
      contentAlignI="center"
      contentGap="50px"
    >
      <span className="min-h-[50px] max-h-[100px] mt-2 w-[95%] overflow-y-auto overflow-x-hidden white-space-pre-wrap break-words text-center font-semibold">
        {warningLinkedList.message}
      </span>
      <div className="flex flex-row justify-around gap-2 h-[40px] w-full overflow-y-hidden overflow-x-auto">
        {warningLinkedList.buttons.map((button, index) => (
          <TextButtonReact
            compHeight="85%"
            compWidth="fit-content"
            buttonHeight="100%"
            buttonWidth={button.buttonWidth ?? '100px'}
            key={index}
            onClick={() => {
              button.action();
              useWarningStore.getState().popWarning();
            }}
            text={button.text}
          />
        ))}
      </div>
    </OverlayWindowReact>
  );
};

export default WarningOverlay;
