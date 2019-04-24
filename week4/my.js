/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {// список всех имен полей, переданных селектору или селекторам
  var selectList = [];
  // список всех значений, для конкретного поля, переданных фильтром или фильтрами
  var filterInList = [];
  // инициализация массива для вывода
  var output = collection.slice();
  // console.log(output);
  // счетчик переданных селекторов
  var selectCount = 0;
  // счетчик переданых фильтров
  var filterInCount = 0;
  // вкл/выкл фильтр(ы)
  var filterOn = false;
  // вкл/выкл селектор(ы)
  var selectOn = false;
  // инициализация имени фильтруемого поля
  var filterFieldName = "";
  // Получаем массив имен полей у однотиных объектов
  var collectionObjFieldNames = Object.keys(collection[0]);


  // Если передана только коллеция, то возвращаем ее копию
  if (arguments.length === 1) {
    return output;
  }

  // вычисляем селекторы и фильтры из аргументов
  for (var x = 0; x < arguments.length; x++) {
    // если есть селектор, то включаем его и вычисляем имена полей
    if (arguments[x][0] === "select") {
      selectCount++;
      selectOn = true;
      selectList = selectList.concat(arguments[x][1]).filter(function(value) {
        var f = collectionObjFieldNames.includes(value) ? true : false;
        return f;
      });
      if(selectCount > 1) {
        if(isContainDuplicate(selectList)) {
          selectList = arrIntersec(selectList);
        }
      }
    }
    // вычисление фильтра
    
    if (arguments[x][0] === "filterIn") {
      filterInCount++;
      filterOn = true;
      filterInList = filterInList.concat(arguments[x][2]);
      filterFieldName = arguments[x][1];
      if(filterInCount > 1) {
        if(isContainDuplicate(filterInList)) {
          filterInList = arrIntersec(filterInList);
        }
      }
    }

  }
  
  
  if (filterOn) {        
    // Если фильтр включен
    // Фильтруем коллекцию и возвращаем отфилтрованную коллекцию output
    output = output.filter(function(obj) {
      if (filterInList.includes(obj[filterFieldName])) {
        return true;
      } else {
        return false;
      }
    });
    // console.log(output);
    // если при это включен селектор, то делаем выборку из output
    if (selectOn) {
      var arr = [];
      for (var i = 0; i < output.length; i++) {
        var obj = {};
        for (var j = 0; j < selectList.length; j++) {
          if (!output[i].hasOwnProperty(selectList[j])) continue;
          obj[selectList[j]] = output[i][selectList[j]];
        }
        arr.push(obj);
      }
      return arr;
    } else {
      // инае возвращаем отфильтрованную коллекцию
      return output;
    }
  } else {
    // Если фильтр выключен
    // Получаем копию коллекции
    // Проверяем включен ли селектор    
    if (selectOn) {
      // если селектор включен, то делаем выборку из коллекции без фильтра
      var arr = [];
      for (var y = 0; y < output.length; y++) {
        var obj = {};
        for (var z = 0; z < selectList.length; z++) {
          obj[selectList[z]] = output[y][selectList[z]];
        }
        arr.push(obj);
      }
      return arr;
    } else {
      // если и фильтр и селектор выключены, то возвращаем копию коллекции
      return output;
    }
  }

  // Проверка на содержание дубликатов
  function isContainDuplicate(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) {
        continue;
      } else {
        return true;
      }
    }
    return false;
  }

  // Поиск пересеченных аргументов
  function arrIntersec(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) == arr.lastIndexOf(arr[i])) {
        continue;
      } else {
        if (!newArr.includes(arr[i])) {
          newArr.push(arr[i]);
        } else {
          continue;
        }
      }
    }
    return newArr;
  }
}

/**
 * @params {String[]}
 */
function select() {
  var fields = [];
  for (var i = 0; i < arguments.length; i++) {
    fields.push(arguments[i]);
  }
  return ["select", fields];
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
  return ["filterIn", property, values];
}

module.exports = {
  query: query,
  select: select,
  filterIn: filterIn
};
