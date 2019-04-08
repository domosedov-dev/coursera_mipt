/**
 * @param {Number} a Первое слагаемое
 * @param {Number} b Второе слагаемое
 * @returns {Number}
 */
module.exports = function (a, b) {
  if (a == undefined || b == undefined) {
    throw new Error('Отсутствует аргумент');
  } else {
    if (isNaN(Number(a)) || isNaN(Number(b))) {
      return NaN;
    } else {
      return Number(a) + Number(b);
    }
  }
};