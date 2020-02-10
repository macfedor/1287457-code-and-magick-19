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

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i >= 0; i--) {
      var j = getRandomNumb(0, array.length - 1);
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var createInfo = function (infoText, infoType) {
    var node = document.createElement('div');
    var bgColor;
    var showTime = 5000;
    node.style = 'z-index: 100; text-align: center; top:50%; position:fixed; left:0; width:100%; fint-size:30px; color:#fff';
    node.textContent = infoText;
    switch (infoType) {
      case 'error':
        bgColor = 'red';
        break;
      case 'success':
        bgColor = 'green';
        break;
      default:
        bgColor = 'yellow';
    }
    node.style.backgroundColor = bgColor;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, showTime);
  };

  window.util = {
    getRandomNumb: getRandomNumb,
    getRandomArrayItem: getRandomArrayItem,
    getNextArrayItem: getNextArrayItem,
    shuffleArray: shuffleArray,
    createInfo: createInfo
  };

})();
