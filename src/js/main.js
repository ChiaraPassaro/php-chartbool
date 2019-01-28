var $ = require("jquery");
var Chart = require('chart.js');

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

$(document).ready(function () {

    $.ajax({
        url: 'http://192.168.1.117/php-chartbool/server.php',
        method: 'GET',
        success: function (data) {
            //console.log(JSON.parse(data));
            modifyData(JSON.parse(data));
        },
        error: function (err) {
            console.log(err);
        }
    });

});

//Funzione che prepara i dati
function modifyData(aData) {
    //preparo i dati per chartjs
    var oCharts = {
        "fatturato": {
            "canvas": $('.chart-sales-month'),
            "label": 'Fatturato mensile',
            "backgroundColor": [],
            "labels": MONTH,
            "data": [],
            "type": ''
        },
        "fatturato_by_agent": {
            "canvas": $('.chart-sales-man'),
            "label": 'Fatturato per Agente',
            "backgroundColor": [],
            "labels": [],
            "data": [],
            "type": ''
        }
    };

    for (var key in aData) {
        var thisChart = oCharts[key];
        thisChart.type = aData[key].type;

        for (var subkey in aData[key].data) {
            //se labels nonha elementi li inserisco
            if(thisChart.labels.length < Object.keys(aData[key].data).length) {
                thisChart.labels.push(subkey);
            }
            //inserisco i dati
            thisChart.data.push(aData[key].data[subkey]);
            //inserisco dei colori random
            thisChart.backgroundColor.push(createColorRandom(0.8));
        }

        addChart(thisChart);
    }
}

//Funzione che inserisce chart
function addChart(aData) {

    var myChart = new Chart(aData.canvas, {
        type: aData.type,
        data: {
            labels: aData.labels,
            datasets: [{
                label: aData.label,
                backgroundColor: aData.backgroundColor,
                borderColor: 'rgb(0, 0, 0)',
                data: aData.data,
            }]
        },
        options: {}
    });

}

function createColorRandom(opacity) {
    var randomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', ' + opacity + ')';
    return randomColor;
}