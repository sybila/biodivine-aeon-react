import type { AeonParsersInt } from './AeonParsers/AeonParsersInt';
import type { AeonSerializersInt } from './AeonSerializers/AeonSerializersInt';

/** Interface which contains functionality for working with AEON format (eg. parsing/creation of aeon format strings) */
export interface AeonFormatInt {
  Parsers: AeonParsersInt;
  Serializers: AeonSerializersInt;
}
