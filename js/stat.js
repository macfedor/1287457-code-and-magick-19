window.renderStatistics = function (ctx, names, times) {
	var statWidth = 420;
	var statHeight = 270;
	var statCoordX = 100;
	var statCoordY = 10;
	var statShadowCoordX = statCoordX + 10;
	var statShadowCoordY = statCoordY + 10;
	var fontSize = 16;
	var fontFamily = 'PT Mono';
	var firstLineTextX = 120;
	var firstLineTextY = 50;
	var secondLineTextX = 120;
	var secondLineTextY = 70;
	var columnMaxHeight = 150;
	var columnWidth = 40;
	var columnMargin = 50;
	var firstColumnX = 150;
	var playerColor = 'rgba(255, 0, 0, 1)';
	var textHeight = 20;
	var bestResult = 0;
	for (var i = 0; i < times.length; i++) {
		var timeFloor = Math.floor(times[i]);
		if (timeFloor > bestResult) {
			bestResult = timeFloor;
		}
	}
	
	ctx.fillStyle = 'rgba(0,0,0,0.7)';
	ctx.fillRect(statShadowCoordX,statShadowCoordY,statWidth,statHeight);
	
	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(statCoordX,statCoordY,statWidth,statHeight);
	
	ctx.fillStyle = '#000000';
	ctx.font = '16px "PT Mono"';
	ctx.fillText('Ура вы победили!', firstLineTextX, firstLineTextY);
	ctx.fillText('Список результатов:', secondLineTextX, secondLineTextY);
	
	
	
	for (var i = 0; i < names.length; i++) {
		var playerTime = Math.floor(times[i]);
		var playerName = names[i];
		var columnHeight = Math.floor(playerTime * columnMaxHeight / bestResult);
		var columnX = firstColumnX + (columnMargin + columnWidth) * i;
		var columnY = statHeight - columnHeight - textHeight;
		var columnSaturation = Math.floor(Math.random() * 100) + 1;
		if (playerName === 'Вы') {
			ctx.fillStyle = playerColor;
		} else {
			ctx.fillStyle = 'hsl(240, ' + columnSaturation + '%, 50%)';			
		}
		ctx.fillRect(columnX,columnY,columnWidth,columnHeight);
		ctx.fillStyle = '#000000';
		ctx.font = '16px "PT Mono"';
		ctx.textBaseline = 'bottom';
		ctx.fillText(playerName, columnX, statHeight);
		ctx.fillText(playerTime, columnX, columnY);
	}
}