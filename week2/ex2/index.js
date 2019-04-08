/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
  var arr = hashtags.map(function(item) {
    return item.toLowerCase();
  });

  var list = [];

  for(var i = 0; i < arr.length; i++) {
    if(list.indexOf(arr[i]) === -1) {
      list.push(arr[i]);
    }
  }

  return list.join(', ');
};
