'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 25);
  ctx.fillText('Список результатов:', 120, 45);

  var maxTime = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > maxTime) {
      maxTime = time;
    }
  }

  var barChartHeight = 150;
  var step = barChartHeight / maxTime;
  var barWidth = 40;
  var initialX = 120;
  var initialY = 80;
  var shift = 10;
  var distanceBetweenBars = 50;

  for (var i = 0; i < times.length; i++) {
    ctx.fillRect(initialX + (barWidth + distanceBetweenBars) * i, barChartHeight - (times[i] * step) + initialY + shift, barWidth, times[i] * step);
    ctx.fillText(names[i], initialX + (barWidth + distanceBetweenBars) * i, initialY + barChartHeight + shift);
    ctx.fillText(times[i].toFixed(), initialX + (barWidth + distanceBetweenBars) * i, barChartHeight - (times[i] * step) + initialY - shift);
  }

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      for (var i = 0; i < times.length; i++) {
      ctx.fillStyle = 'rgb(0, 0, 255)';
      ctx.globalAlpha = Math.random();
    }
    }
  }
}
