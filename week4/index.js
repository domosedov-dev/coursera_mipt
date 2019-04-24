/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
  var sortableFriends = deepClone(collection);
  var actions = [].slice.call(arguments).slice(1);
  actions.sort(function(a, b) {
    return a[0] === "filterIn" ? -1 : 1;
  });
  actions.forEach(function(action) {
    var actionName = action[0];
    switch (actionName) {
      case "filterIn":
        var property = action[1];
        var values = action[2];
        sortableFriends = sortableFriends.filter(function(item) {
          if (item[property] === undefined) {
            return false;
          }
          if (typeof values === "object") {
            if (values.includes(item[property])) {
              return true;
            }
          } else {
            if (values === item[property]) {
              return true;
            }
          }
          return false;
        });
        break;
      case "select":
        var availableFields = action[1];
        sortableFriends.forEach(function(item) {
          var keys = Object.keys(item);
          keys.forEach(function(key) {
            if (!availableFields.includes(key)) {
              delete item[key];
            }
          });
        });
        break;
    }
  });
  return sortableFriends;
}

/**
 * @params {String[]}
 */
function select() {
  var fields = [].slice.call(arguments);
  return ["select", fields];
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
  return ["filterIn", property, values];
}

function deepClone(collection) {
  var cloneCollection = [];
  collection.forEach(function(item) {
    var cloneItem = {};
    var keys = Object.keys(item);
    keys.forEach(function(key) {
      cloneItem[key] = item[key];
    });
    cloneCollection.push(cloneItem);
  });
  return cloneCollection;
}

module.exports = {
  query: query,
  select: select,
  filterIn: filterIn
};
