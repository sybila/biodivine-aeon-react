import type { LiveModelInt } from '../../../../services/global/LiveModel/LiveModelInt';
import type { FileConvertorsInt } from '../../../../services/utilities/FileConvertors/FileConvertorsInt';

export type ImportExportTabContentProps = {
  liveModelServ: LiveModelInt;
  fileConvertorsServ: FileConvertorsInt;
};
