/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
  return arr = tweet.split(' ').filter(function(str) {
    return str.startsWith('#');
  }).reduce(function(accumulator, currentValue) {
    return accumulator.concat(currentValue.slice(1) || []);
  }, []);
}
