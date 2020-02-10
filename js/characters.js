'use strict';

(function () {
  var createName = function () {
    var firstName = window.util.getRandomArrayItem(window.setup.names);
    var secondName = window.util.getRandomArrayItem(window.setup.surnames);
    var result = firstName + ' ' + secondName;
    if (window.util.getRandomNumb(0, 2)) { // случайно меняем местами имя и фамилию
      result = secondName + ' ' + firstName;
    }
    return result;
  };

  var createСharacter = function () {
    var character = {
      'name': createName(),
      'coatColor': window.util.getRandomArrayItem(window.setup.coatColorsFixed),
      'eyesColor': window.util.getRandomArrayItem(window.setup.eyesColors)
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

  window.characters = {
    createList: createСharactersList
  };

})();
