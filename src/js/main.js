var $ = require("jquery");
var Chart = require('chart.js');
var $canvas = $('.chart-sales-month');

var MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

$(document).ready(function(){

  $.ajax({
    url: 'http://192.168.1.117/php-chartbool/data.php',
    method: 'GET',
    success: function(data) {
      addChart(JSON.parse(data));
    },
    error: function(err) {
      console.log(err);
    }
  });

});

function addChart(aData){
  var myChart = new Chart($canvas, {
    type: 'line',
    data: {
      labels: MONTH,
      datasets: [{
        label: "Andamento mensile delle vendite",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: aData, //parse sui dati ricevuti da DOM
      }]
    },
    options: {

    }
  });

}
