console.clear();
var lib = { query: query, select: select, filterIn: filterIn };
var friends = [
  {
    name: "Сэм",
    gender: "Мужской",
    email: "luisazamora@example.com",
    favoriteFruit: "Картофель"
  },
  {
    name: "Эмили",
    gender: "Женский",
    email: "example@example.com",
    favoriteFruit: "Яблоко"
  },
  {
    name: "Мэт",
    gender: "Мужской",
    email: "danamcgee@example.com",
    favoriteFruit: "Яблоко"
  },
  {
    name: "Брэд",
    gender: "Мужской",
    email: "newtonwilliams@example.com",
    favoriteFruit: "Банан"
  },
  {
    name: "Шерри",
    gender: "Женский",
    email: "danamcgee@example.com",
    favoriteFruit: "Картофель"
  },
  {
    name: "Керри",
    gender: "Женский",
    email: "danamcgee@example.com",
    favoriteFruit: "Апельсин"
  },
  {
    name: "Стелла",
    gender: "Женский",
    email: "waltersguzman@example.com",
    favoriteFruit: "Картофель"
  }
];
function query(collection) {
  var selectList = [];
  var filterInList = [];
  var output = collection.slice();
  console.log(output);
  var selectCount = 0;
  var filterInCount = 0;
  var filterOn = !1;
  var selectOn = !1;
  var filterFieldName = "";
  var collectionObjFieldNames = Object.keys(collection[0]);
  if (arguments.length === 1) {
    return output;
  }
  for (var x = 0; x < arguments.length; x++) {
    if (arguments[x][0] === "select") {
      selectCount++;
      selectOn = !0;
      selectList = selectList.concat(arguments[x][1]).filter(function(value) {
        var f = collectionObjFieldNames.includes(value) ? !0 : !1;
        return f;
      });
      if (selectCount > 1) {
        if (isContainDuplicate(selectList)) {
          selectList = arrIntersec(selectList);
        }
      }
    }
    if (arguments[x][0] === "filterIn") {
      filterInCount++;
      filterOn = !0;
      filterInList = filterInList.concat(arguments[x][2]);
      filterFieldName = arguments[x][1];
      if (filterInCount > 1) {
        if (isContainDuplicate(filterInList)) {
          filterInList = arrIntersec(filterInList);
        }
      }
    }
  }
  console.log(filterInList);
  if(filterInList.length === 0) {
    output = [];
    console.log(Array.isArray(output));
    return output;
  }
  if (filterOn) {
    output = output.filter(function(obj) {
      if (filterInList.includes(obj[filterFieldName])) {
        return !0;
      } else {
        return !1;
      }
    });
    console.log(output);
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
      return output;
    }
  } else {
    if (selectOn) {
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
      return output;
    }
  }
  function isContainDuplicate(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) {
        continue;
      } else {
        return !0;
      }
    }
    return !1;
  }
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
function select() {
  var fields = [];
  for (var i = 0; i < arguments.length; i++) {
    fields.push(arguments[i]);
  }
  return ["select", fields];
}
function filterIn(property, values) {
  return ["filterIn", property, values];
}
console.table(
  query(
    friends,
    select("name", 'favoriteFruit'),
    filterIn("favoriteFruit", [])
  )
);
