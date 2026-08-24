/** Exported utility functions for time manipulation and formatting. */
class Time {
  public static getTime(timestamp: number | undefined, UTC: boolean) {
    if (timestamp === undefined || timestamp < 0) return 'Not available';

    const date = new Date(timestamp);

    const addZero = function (num: number): string {
      return num < 10 ? '0' + num : num.toString();
    };

    if (!UTC) {
      return (
        addZero(date.getHours()) +
        ':' +
        addZero(date.getMinutes()) +
        ':' +
        addZero(date.getSeconds())
      );
    }

    return (
      addZero(date.getUTCHours()) +
      ':' +
      addZero(date.getUTCMinutes()) +
      ':' +
      addZero(date.getUTCSeconds())
    );
  }

  public static getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour12: false });
  }
}

export default Time;
