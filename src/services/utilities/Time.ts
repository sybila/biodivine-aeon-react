/** Exported utility functions for time manipulation and formatting. */
class Time {
  /** Get the formatted time string from a timestamp.
   * @param timestamp - The timestamp in milliseconds.
   * @param UTC - If true, returns the time in UTC format; otherwise, returns local time.
   * @returns A string representing the formatted time.
   */
  static getTime(timestamp: number | undefined, UTC: boolean): string {
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
}

export default Time;
