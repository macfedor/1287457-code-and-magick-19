'use strict';

(function () {
  var getRandomNumb = function (min, max) {
    return Math.floor(Math.random() * max) + min;
  };

  var getRandomArrayItem = function (array) { // функция для получения случайного элемента массива. на вход - массив, на выход - элемент
    return array[getRandomNumb(0, array.length)];
  };

  var getNextArrayItem = function (array, currentItem) {
    var currentNumber = array.indexOf(currentItem);
    if (currentNumber === -1) { // если переданного элемента нет в массиве - считаем, что он нулевой и показываем элемент с индексом 1 (например, у волшебника не указан цвет глаз и он по умолчанию черный - без этого куска при первом клике мы будем менять с черного на черный)
      currentNumber = 0;
    }
    var nextNumber = ++currentNumber;
    if (nextNumber > array.length - 1) {
      nextNumber = 0;
    }
    return array[nextNumber];
  };

  window.util = {
    getRandomNumb: getRandomNumb,
    getRandomArrayItem: getRandomArrayItem,
    getNextArrayItem: getNextArrayItem
  };

})();
