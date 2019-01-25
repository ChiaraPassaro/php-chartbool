var $ = require("jquery");
var Chart = require('chart.js');
var $canvas = $('#chart__canvas');
//
// //prendo dati dal DOM
// var aData = $canvas.attr('data-chart');
//
// var MONTH = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December'
// ];
//
// $(document).ready(function(){
//   var myChart = new Chart($canvas, {
//     type: 'line',
//     data: {
//       labels: MONTH,
//       datasets: [{
//         label: "Andamento mensile delle vendite",
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: JSON.parse(aData), //parse sui dati ricevuti da DOM
//       }]
//     },
//     options: {
//
//     }
//   });
//
// });
