'use strict';

window.renderStatistics = function(ctx, names, times) {


  var cloudPoints = [
    [140, 50, 180, 30, 210, 40],
    [240, 20, 290, 15, 320, 35],
    [360, 15, 400, 20, 420, 50],
    [480, 40, 510, 70, 505, 110],
    [520, 140, 510, 190, 470, 210],
    [470, 250, 410, 280, 380, 250],
    [330, 270, 270, 270, 250, 240],
    [190, 280, 130, 240, 140, 180],
    [110, 180, 110, 100, 140, 80]
  ];

  function createCloud(arr, x, y) {
    arr.forEach(function(item, i, arr) {
      if (x || y) {
        var shadow = item.map(function(j) {
          if(item.indexOf(j) % 2 === 0) {
            return j + y;
          }
          return j + x;
        });
        ctx.bezierCurveTo(...shadow);

      } else {
        ctx.bezierCurveTo(...item);
      }
    });
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(150, 90);
  createCloud(cloudPoints, 10, 10);

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(140, 80);
  createCloud(cloudPoints);


  // ctx.bezierCurveTo(140, 50, 180, 30, 210, 40);
  // ctx.bezierCurveTo(240, 20, 290, 15, 320, 35);
  // ctx.bezierCurveTo(360, 15, 400, 20, 420, 50);
  // ctx.bezierCurveTo(480, 40, 510, 70, 505, 110);
  // ctx.bezierCurveTo(520, 140, 510, 190, 460, 210);
  // ctx.bezierCurveTo(470, 250, 410, 280, 380, 250);
  // ctx.bezierCurveTo(330, 270, 270, 270, 250, 240);
  // ctx.bezierCurveTo(190, 280, 130, 240, 140, 180);
  // ctx.bezierCurveTo(110, 180, 110, 100, 140, 80);






  // ctx.fillRect(100, 10, 520, 280);
}
