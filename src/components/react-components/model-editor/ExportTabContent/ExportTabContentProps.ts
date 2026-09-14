import type { LiveModelInt } from '../../../../services/global/LiveModel/LiveModelInt';
import type { FileConvertorsInt } from '../../../../services/utilities/FileConvertors/FileConvertorsInt';

export type ExportTabContentProps = {
  liveModelServ: LiveModelInt;
  fileConvertorsServ: FileConvertorsInt;
};
