'use strict';
(function () {
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var similarWizardsCount = 4;
  var setup = document.querySelector('.setup');
  var setupForm = setup.querySelector('.setup-wizard-form');

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

  var addСharacter = function (character, template) {
    var result = template.cloneNode(true);
    result.querySelector('.wizard-coat').setAttribute('style', 'fill:' + character.colorCoat);
    result.querySelector('.wizard-eyes').setAttribute('style', 'fill:' + character.colorEyes);
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

  var onSuccessLoad = function (data) {
    var shuffleData = window.util.shuffleArray(data);
    var wizards = shuffleData.slice(0, similarWizardsCount);
    addData(wizards);
  };

  var onError = function (string) {
    window.util.createInfo(string, 'error');
  };

  var onSuccessSave = function (string) {
    setup.classList.add('hidden');
    window.util.createInfo(string, 'success');
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData(setupForm);
    window.backend.save(formData, onSuccessSave, onError);
  };

  setupForm.addEventListener('submit', onFormSubmit);
  window.backend.load(onSuccessLoad, onError);

  window.setup = {
    names: names,
    surnames: surnames,
    eyesColors: eyesColors,
    fireballColors: fireballColors,
    coatColorsFixed: coatColorsFixed
  };

})();
