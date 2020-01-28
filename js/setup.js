'use strict';

var showBlock = function (selector) {
  document.querySelector(selector).classList.remove('hidden');
};

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomNumb = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

var getRandomArrayItem = function (array) { // функция для получения случайного элемента массива. на вход - массив, на выход - элемент
  return array[getRandomNumb(0, array.length)];
};

var createName = function () {
  var firstName = getRandomArrayItem(names);
  var secondName = getRandomArrayItem(surnames);
  var result = firstName + ' ' + secondName;
  if (getRandomNumb(0, 2)) { // случайно меняем местами имя и фамилию
    result = secondName + ' ' + firstName;
  }
  return result;
};

var createСharacter = function () {
  var character = {
    'name': createName(),
    'coatColor': getRandomArrayItem(coatColors),
    'eyesColor': getRandomArrayItem(eyesColors)
  };
  return character;
};

var createСharactersList = function (count) {
  var charactersList = [];
  for (var i = 0; i < count; i++) {
    charactersList.push(createСharacter());
  }
  return charactersList;
};

var removeFirstSpace = function (string) {
  return string.replace(' ', '');
};

var addСharacter = function (character, template) {
  var result = template.cloneNode(true);
  result.querySelector('.wizard-coat').setAttribute('style', 'fill:' + removeFirstSpace(character.coatColor)); // Приделал сюда функцию удаляющую первый пробел, т.к. браузер ругается на пробел между rgb и скобкой
  result.querySelector('.wizard-eyes').setAttribute('style', 'fill:' + character.eyesColor);
  result.querySelector('.setup-similar-label').textContent = character.name;
  return result;
};

var addData = function (data) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(addСharacter(data[i], template));
  }
  document.querySelector('.setup-similar-list').appendChild(fragment);
};

var players = createСharactersList(4);
addData(players);

showBlock('.setup');
showBlock('.setup-similar');
