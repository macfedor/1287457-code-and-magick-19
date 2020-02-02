'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var setup = document.querySelector('.setup');
var setupOpenBtn = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupCloseBtn = setup.querySelector('.setup-close');
var ESCAPE_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var wizard = document.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var coatColorsFixed = []; // браузер ругается на пробел между rgb и (. завожу новый массив, чтобы не прописывать удаление/добавление этого пробела каждый раз, когда мне надо тянуть данные из coatColors
for (var n = 0; n < coatColors.length; n++) {
  var item = coatColors[n].replace('rgb (', 'rgb(');
  coatColorsFixed.push(item);
}
/* пока что не используется, закомментил
var showBlock = function (selector) {
  document.querySelector(selector).classList.remove('hidden');
};
*/
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
    'coatColor': getRandomArrayItem(coatColorsFixed),
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

var addСharacter = function (character, template) {
  var result = template.cloneNode(true);
  result.querySelector('.wizard-coat').setAttribute('style', 'fill:' + character.coatColor);
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

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESCAPE_KEY && evt.target.className !== 'setup-user-name') {
    closePopup();
    document.removeEventListener('keydown', onPopupEscPress);
  }
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

var changeColor = function (target, array, inputName) {
  var currentColor = target.style.fill;
  var nextColor = getNextArrayItem(array, currentColor);
  var input = document.querySelector('[name="' + inputName + '"]');
  target.setAttribute('style', 'fill:' + nextColor);
  input.value = nextColor;
};

var changeFireballColor = function () {
  /* оставляю тут этот код пока на случай, если буду переделывать со случайного цвета на цвет по порядку
  var currentColor = wizardFireball.style.backgroundColor || getComputedStyle(wizardFireball).backgroundColor;
  var nextColor = getNextArrayItem(fireballColors, currentColor);
  wizardFireball.setAttribute('style', 'background-color:' + nextColor);
  */
  var color = getRandomArrayItem(fireballColors);
  wizardFireball.setAttribute('style', 'background-color:' + color);
  document.querySelector('[name="fireball-color"]').value = color;
};

setupCloseBtn.addEventListener('click', function () {
  closePopup();
});

setupCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

setupOpenBtn.addEventListener('click', function () {
  openPopup();
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

wizardCoat.addEventListener('click', function () {
  changeColor(wizardCoat, coatColorsFixed, 'coat-color');
});

wizardEyes.addEventListener('click', function () {
  changeColor(wizardEyes, eyesColors, 'eyes-color');
});

wizardFireball.addEventListener('click', function () {
  changeFireballColor();
});
