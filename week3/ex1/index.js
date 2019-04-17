/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {

  var dateObj = new Date(date);
  var timeTypes = ['years', 'months', 'days', 'hours', 'minutes'];
  return {
    add: function (timeNumber, timeType) {
      if (timeTypes.indexOf(timeType) === -1) {
        throw new TypeError('Неверный тип времени');
      }
      if (timeNumber < 0) {
        throw new TypeError('Некорректное число');
      }
      switch (timeType) {
        case 'years':
          dateObj.setFullYear(dateObj.getFullYear() + timeNumber);
          this.value = formatDate(dateObj);
          return this;
        case 'months':
          dateObj.setMonth(dateObj.getMonth() + timeNumber);
          this.value = formatDate(dateObj);
          return this;
        case 'days':
          dateObj.setDate(dateObj.getDate() + timeNumber);
          this.value = formatDate(dateObj);
          return this;
        case 'hours':
          dateObj.setHours(dateObj.getHours() + timeNumber);
          this.value = formatDate(dateObj);
          return this;
        case 'minutes':
          dateObj.setMinutes(dateObj.getMinutes() + timeNumber);
          this.value = formatDate(dateObj);
          return this;
      }
    },
    subtract: function (timeNumber, timeType) {
      if (timeTypes.indexOf(timeType) === -1) {
        throw new TypeError('Неверный тип времени');
      }
      if (timeNumber < 0) {
        throw new TypeError('Некорректное число');
      }
      switch (timeType) {
        case 'years':
          dateObj.setFullYear(dateObj.getFullYear() - timeNumber);
          this.value = formatDate(dateObj);
          return this;
        case 'months':
          dateObj.setMonth(dateObj.getMonth() - timeNumber);
          this.value = formatDate(dateObj);
          return this;
        case 'days':
          dateObj.setDate(dateObj.getDate() - timeNumber);
          this.value = formatDate(dateObj);
          return this;
        case 'hours':
          dateObj.setHours(dateObj.getHours() - timeNumber);
          this.value = formatDate(dateObj);
          return this;
        case 'minutes':
          dateObj.setMinutes(dateObj.getMinutes() - timeNumber);
          this.value = formatDate(dateObj);
          return this;
      }
    },
    value: formatDate(dateObj)
  }
};

function formatDate(dateObj) {
  var result = '',
    year = dateObj.getFullYear(),
    month = dateObj.getMonth() + 1,
    day = dateObj.getDate(),
    hours = dateObj.getHours(),
    minutes = dateObj.getMinutes();

  if (String(month).length < 2) {
    month = '0' + month;
  }

  if (String(day).length < 2) {
    day = '0' + day;
  }

  if(String(hours).length < 2) {
    hours = '0' + hours;
  }

  if(String(minutes).length < 2) {
    minutes = '0' + minutes;
  }



  result = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

  return result;
}