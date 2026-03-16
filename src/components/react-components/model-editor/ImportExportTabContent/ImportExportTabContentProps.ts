import type { LiveModelInt } from '../../../../services/global/LiveModel/LiveModelInt';
import type { MessageInt } from '../../../../services/global/Message/MessageInt';
import type { FileConvertorsInt } from '../../../../services/utilities/FileConvertors/FileConvertorsInt';

export type ImportExportTabContentProps = {
  liveModelServ: LiveModelInt;
  fileConvertorsServ: FileConvertorsInt;
  messageServ: MessageInt;
};
