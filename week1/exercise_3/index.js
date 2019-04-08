/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
  if ((hours < 0 || hours > 23) || (minutes < 0 || minutes > 59) || (interval < 0)) {
    return false;
  }

  if (interval >= 60) {
    var intervalHoursCount = 0;
    while (interval >= 60) {
      intervalHoursCount++;
      interval -= 60;
    }

    hours += intervalHoursCount;
  }

  minutes += interval;

  if (minutes >= 60) {
    hours++;
    minutes = minutes - 60;
  }

  while (hours >= 24) {
    hours -= 24;
  }

  if (hours.length < 2) {
    hours = '0' + hours;
  }

  if (minutes.length < 2) {
    minutes = '0' + minutes;
  }

  return hours + ':' + minutes;
};