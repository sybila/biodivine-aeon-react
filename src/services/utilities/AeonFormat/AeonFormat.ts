import type { AeonFormatInt } from './AeonFormatInt';
import AeonParsers from './AeonParsers/AeonParsers';
import AeonSerializers from './AeonSerializers/AeonSerializers';
import type { AeonSerializersInt } from './AeonSerializers/AeonSerializersInt';

class AeonFormat implements AeonFormatInt {
  public Parsers = new AeonParsers();
  public Serializers: AeonSerializersInt = new AeonSerializers();
}

export default AeonFormat;
