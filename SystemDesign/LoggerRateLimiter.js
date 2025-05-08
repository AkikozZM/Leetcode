/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */
class Logger {
  constructor() {
    this.timer = new Map(); // msg -- nextTime
  }

  /**
   * @param {number} timestamp
   * @param {string} message
   * @return {boolean} true: if meesage should be printed in the timestamp
   */
  shouldPrintMessage(timestamp, message) {
    if (this.timer.has(message)) {
      // if timer has message, check the time is available or not
      const time = this.timer.get(message);
      if (timestamp < time) return false;
      // time is available, update the next available time
      this.timer.set(message, timestamp + 10);
      return true;
    } else {
      this.timer.set(message, timestamp + 10);
      return true;
    }
  }
}
export default Logger;

// let logger = new Logger();
// console.log(logger.shouldPrintMessage(1, "HELLO"));
// console.log(logger.shouldPrintMessage(2, "HELLO"));
// console.log(logger.shouldPrintMessage(12, "HELLO"));
// console.log(logger.shouldPrintMessage(18, "HELLO"));
