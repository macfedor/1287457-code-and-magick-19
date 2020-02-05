'use strict';
(function () {
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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

  var createName = function () {
    var firstName = window.util.getRandomArrayItem(names);
    var secondName = window.util.getRandomArrayItem(surnames);
    var result = firstName + ' ' + secondName;
    if (window.util.getRandomNumb(0, 2)) { // случайно меняем местами имя и фамилию
      result = secondName + ' ' + firstName;
    }
    return result;
  };

  var createСharacter = function () {
    var character = {
      'name': createName(),
      'coatColor': window.util.getRandomArrayItem(coatColorsFixed),
      'eyesColor': window.util.getRandomArrayItem(eyesColors)
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

  window.setup = {
    names: names,
    surnames: surnames,
    eyesColors: eyesColors,
    fireballColors: fireballColors,
    coatColorsFixed: coatColorsFixed
  };

})();
