console.clear();
var lib = {
  query: query,
  select: select,
  filterIn: filterIn
};

var friends = [
  {
      name: 'Сэм',
      gender: 'Мужской',
      email: 'luisazamora@example.com',
      favoriteFruit: 'Картофель'
  },
  {
      name: 'Эмили',
      gender: 'Женский',
      email: 'example@example.com',
      favoriteFruit: 'Яблоко'
  },
  {
      name: 'Мэт',
      gender: 'Мужской',
      email: 'danamcgee@example.com',
      favoriteFruit: 'Яблоко'
  },
  {
      name: 'Брэд',
      gender: 'Мужской',
      email: 'newtonwilliams@example.com',
      favoriteFruit: 'Банан'
  },
  {
      name: 'Шерри',
      gender: 'Женский',
      email: 'danamcgee@example.com',
      favoriteFruit: 'Картофель'
  },
  {
      name: 'Керри',
      gender: 'Женский',
      email: 'danamcgee@example.com',
      favoriteFruit: 'Апельсин'
  },
  {
      name: 'Стелла',
      gender: 'Женский',
      email: 'waltersguzman@example.com',
      favoriteFruit: 'Картофель'
  }
];

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
  if(arguments.length === 1) {
    return collection.slice();
  }
  var arr = [];
  var fieldNames = arguments[1][1];
  for(var i = 0; i < collection.length; i++){
    var obj = {};
    for(var j = 0; j < fieldNames.length; j++){
      if(!collection[i].hasOwnProperty(fieldNames[j])) continue;
      obj[fieldNames[j]] = collection[i][fieldNames[j]];
    }
    arr.push(obj);
  }
  return arr;
}

/**
 * @params {String[]}
 */
function select() {
  var fields = [];
  for (var i = 0; i < arguments.length; i++){
    fields.push(arguments[i]);
  }
  return ['select', fields];
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {

}

console.log(lib.query(friends, lib.select('name', 'gender', 'email', 'loh')));





// var result = lib.query(
//   friends,
//   lib.select('name', 'gender', 'email'),
//   lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель'])
// );