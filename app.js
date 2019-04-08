var str = 'Прохожу курс на #coursera по #javascript';

// function getHashTags(str){
//   return arr = str.split(' ').filter(function(str) {
//     return str.startsWith('#');
//   }).reduce(reducer, []);

// }

// function reducer(accumulator, currentValue) {
//   var currentValue = currentValue.slice(1);
//   return accumulator.concat(currentValue || []);
// }

// console.log(getHashTags(str));

// function getHashTags(str){
//   return arr = str.split(' ').filter(function(str) {
//     return str.startsWith('#');
//   }).reduce(function(accumulator, currentValue) {
//     return accumulator.concat(currentValue.slice(1) || []);
//   }, []);
// }

// console.log(getHashTags(str));

console.log([].concat(str).concat('hello').concat([1,2,3]));