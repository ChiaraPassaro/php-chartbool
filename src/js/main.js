var $ = require("jquery");
var Chart = require('chart.js');
var $canvas = $('#chart__canvas');

$(document).ready(function(){
  var myChart = new Chart($canvas, {
    type: 'line',
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Andamento mensile delle vendite",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    },
    options: {

    }
  });

});
