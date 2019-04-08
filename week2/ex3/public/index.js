// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
  var commandName = command.split(' ')[0];

  if (commandName === 'ADD') {
    var contact = command.slice(commandName.length + 1).split(' ');
    var contactName = contact[0];
    var contactPhone = contact[1].split(',');
    return addContact(contactName, contactPhone);
  }

  if (commandName === 'REMOVE_PHONE') {
    var number = command.slice(commandName.length + 1);
    return removePhone(number);
  }

  if (commandName === 'SHOW') {
    return showPhoneBook();
  }

  function addContact(name, phoneArr) {
    if (phoneBook.hasOwnProperty(name)) {
      var list = phoneBook[name].slice();
      for (var i = 0; i < phoneArr.length; i++) {
        if (list.indexOf(phoneArr[i]) === -1) {
          list.push(phoneArr[i]);
        }
      }
      phoneBook[name] = list;
    } else {
      phoneBook[name] = phoneArr;
    }
    return phoneBook;
  }

  function removePhone(phoneNumber) {
    var names = Object.keys(phoneBook);
    for (var i = 0; i < names.length; i++) {
      var numbers = phoneBook[names[i]];
      if (phoneBook[names[i]].indexOf(phoneNumber) !== -1) {
        numbers.splice(numbers.indexOf(phoneNumber), 1);
        if (numbers.length === 0) {
          delete phoneBook[names[i]];
        }
        return true;
      }
    }
    return false;
  }

  function showPhoneBook() {
    var list = [];
    var phoneBookNames = Object.keys(phoneBook);
    for (var i = 0; i < phoneBookNames.length; i++) {
      var phonesStr = phoneBook[phoneBookNames[i]].join(', ');
      var name = phoneBookNames[i];
      var str = name + ': ' + phonesStr;
      list.push(str);
    }

    list.sort();
    return list;
  }
};