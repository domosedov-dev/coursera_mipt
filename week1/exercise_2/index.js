/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
  if((hours == undefined || minutes == undefined)) {
    throw new Error('Отсутствие значения');
  } else if(isNaN(Number(hours)) || isNaN(Number(minutes))) {
    throw new Error('Невалидные данные');
  } else if ((Number(hours) < 24 && Number(hours) >= 0) &&
  (Number(minutes) < 60 && Number(minutes) >= 0)){
    return true;
  }
  return false;
};
