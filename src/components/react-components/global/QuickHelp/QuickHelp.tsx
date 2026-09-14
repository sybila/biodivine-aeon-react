import SemitransparentOverlayWindowReact from '../../lit-wrappers/SemitransparentOverlayWindowReact';
import MarkdownText from '../MarkdownText/MarkdownText';
import type { QuickHelpProps } from './QuickHelpProps';

const QuickHelp: React.FC<QuickHelpProps> = ({
  headerText,
  helpText,

  windowMinHeight = '10vh',
  windowMaxHeight = '80vh',
  windowMinWidth = '10vw',
  windowMaxWidth = '80vw',

  visible,
}) => {
  return visible ? (
    <SemitransparentOverlayWindowReact
      headerText={headerText}
      windColor="var(--color-quick-help)"
      headerTextColor="var(--color-quick-help-text)"
      windMinHeight={windowMinHeight}
      windMaxHeight={windowMaxHeight}
      windMaxWidth={windowMaxWidth}
      windMinWidth={windowMinWidth}
      windPad='25px'
      compZIndex='1'
    >
      <MarkdownText
        height="fit-content"
        width="fit-content"
        text={helpText}
        textColor="var(--color-quick-help-text)"
        quoteColor="var(--color-quick-help-text)"
        linkColor="var(--color-quick-help-text)"
      />
    </SemitransparentOverlayWindowReact>
  ) : null;
};

export default QuickHelp;
