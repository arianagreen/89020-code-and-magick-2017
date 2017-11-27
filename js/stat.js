'use strict';
//функция для нахождения наибольшего элемента массива
var findMaxElement = function(array) {
  var max = -1;
  for (var i = 0; i < array.length; i++) {
    var currentItem = array[i];
    if (currentItem > max) {
      max = currentItem;
    }
  }
  return max;
}

window.renderStatistics = function(ctx, names, times) {

  var cloudPoints = [ // это список координат для Безьера
    [120, 10, 170, 0, 210, 10], //1
    [250, 0, 300, 5, 340, 20], //2
    [370, 5, 420, 5, 440, 30], //3
    [520, 20, 560, 80, 540, 120], //4
    [580, 140, 580, 210, 540, 210], //5
    [530, 270, 480, 300, 430, 285], //6
    [400, 300, 250, 290, 340, 270], //7
    [300, 300, 280, 300, 240, 280], //8
    [200, 295, 140, 295, 110, 260], //9
    [60, 260, 50, 190, 70, 170], //10
    [45, 140, 50, 70, 90, 50] //11
  ];

  /* Не хотела вручную сдвигать каждое число для создания тени, и тем более переписывать два облачка в случае ошибки
    В идеале, конечно, было бы здорово создать функцию, которая принимает начальные координаты и сама рисует облачко,
    но я так пока не умею, поэтому начальные координаты задавала сама
  */
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

  //это тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(150, 90);
  createCloud(cloudPoints, 10, 10);

  //а это облачко
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(90, 50);
  createCloud(cloudPoints);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', 140, 35);
  ctx.fillText('Список результатов:', 140, 55);


  // начинаем рисовать гистограмму

  var maxTime = findMaxElement(times);
  var maxTimeIndex = times.indexOf(maxTime);

  var initialX = 140; // левая граница гистограмы
  var initialNameY = 270; // на каком уровне располагаются имена
  var initialBarY = 100; // верхняя точка самого высокого столбика
  var histogramHeight = 150; //высота самого высокого столбика
  var barWidth = 40; // ширина столбика
  var distance = 50; // расстоянеие между столбиками

  var index = histogramHeight / maxTime; //чтобы высчитать относительную высоту

  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * index; // высота текущего стобика
    var barX = initialX + barWidth * i + distance * i;
    var barY = initialBarY + (histogramHeight - barHeight);

    //задаем цвет столбикам
    if (names[i] == 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var randomOpacity = parseFloat(Math.random()).toFixed(1);
      ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';
    }

    ctx.fillRect(barX, barY, barWidth, barHeight);

    ctx.fillStyle = 'black';
    ctx.fillText(names[i], barX, initialNameY);
    ctx.fillText(Math.round(times[i]), barX, barY - 10);
  }
}
