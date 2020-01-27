'use strict';

var getRandomNumb = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

var getMaxValue = function (array, floor) { // добавил дополнительный параметр, т.к. не всегда нам может быть нужно округление до целого в функции поиска максимального значения
  var maxValue = 0;
  for (var i = 0; i < array.length; i++) {
    if (floor) {
      array[i] = Math.floor(array[i]);
    }
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  return maxValue;
};

var drawResultColumn = function (number, times, names, blockHeight, ctx) {
  var columnMaxHeight = 150;
  var bestResult = getMaxValue(times, true);
  var firstColumnX = 150;
  var columnMargin = 50;
  var columnWidth = 40;
  var textHeight = 20;
  var playerColor = 'rgba(255, 0, 0, 1)';
  var playerTime = Math.floor(times[number]);
  var playerName = names[number];
  var columnHeight = Math.floor(playerTime * columnMaxHeight / bestResult);
  var columnX = firstColumnX + (columnMargin + columnWidth) * number;
  var columnY = blockHeight - columnHeight - textHeight;
  var columnSaturation = getRandomNumb(1, 100);

  if (playerName === 'Вы') {
    ctx.fillStyle = playerColor;
  } else {
    ctx.fillStyle = 'hsl(240, ' + columnSaturation + '%, 50%)';
  }
  ctx.fillRect(columnX, columnY, columnWidth, columnHeight);
  ctx.fillStyle = '#000000';
  ctx.font = '16px "PT Mono"';
  ctx.textBaseline = 'bottom';
  ctx.fillText(playerName, columnX, blockHeight);
  ctx.fillText(playerTime, columnX, columnY);
};

window.renderStatistics = function (ctx, names, times) {
  var statWidth = 420;
  var statHeight = 270;
  var statCoordX = 100;
  var statCoordY = 10;
  var statShadowCoordX = statCoordX + 10;
  var statShadowCoordY = statCoordY + 10;
  var firstLineTextX = 120;
  var firstLineTextY = 50;
  var secondLineTextX = 120;
  var secondLineTextY = 70;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(statShadowCoordX, statShadowCoordY, statWidth, statHeight);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(statCoordX, statCoordY, statWidth, statHeight);

  ctx.fillStyle = '#000000';
  ctx.font = '16px "PT Mono"';
  ctx.fillText('Ура вы победили!', firstLineTextX, firstLineTextY);
  ctx.fillText('Список результатов:', secondLineTextX, secondLineTextY);

  for (var i = 0; i < names.length; i++) {
    drawResultColumn(i, times, names, statHeight, ctx);
  }
};
