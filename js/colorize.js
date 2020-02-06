'use strict';

(function () {
  var wizard = document.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var currentFireballColorNumber = 0;

  var changeColor = function (target, array, inputName) {
    var currentColor = target.style.fill;
    var nextColor = window.util.getNextArrayItem(array, currentColor);
    var input = document.querySelector('[name="' + inputName + '"]');
    target.setAttribute('style', 'fill:' + nextColor);
    input.value = nextColor;
  };

  var changeFireballColor = function () {
    currentFireballColorNumber++;
    if (currentFireballColorNumber > window.setup.fireballColors.length - 1) {
      currentFireballColorNumber = 0;
    }
    var nextColor = window.setup.fireballColors[currentFireballColorNumber];
    wizardFireball.setAttribute('style', 'background-color:' + nextColor);
    document.querySelector('[name="fireball-color"]').value = nextColor;
  };

  wizardCoat.addEventListener('click', function () {
    changeColor(wizardCoat, window.setup.coatColorsFixed, 'coat-color');
  });

  wizardEyes.addEventListener('click', function () {
    changeColor(wizardEyes, window.setup.eyesColors, 'eyes-color');
  });

  wizardFireball.addEventListener('click', function () {
    changeFireballColor();
  });

})();
