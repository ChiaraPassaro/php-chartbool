var $ = require("jquery");
var Chart = require('chart.js');
var levelUser = $('body').data('level');

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
        data:{
            level: levelUser
        },
        success: function (data) {
            //console.log(data);
            if(levelUser){
                modifyData(JSON.parse(data));
            }
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
            "type": '',
            "access": ''
        },
        "fatturato_by_agent": {
            "canvas": $('.chart-sales-man'),
            "label": 'Fatturato per Agente',
            "backgroundColor": [],
            "labels": [],
            "data": [],
            "type": '',
            "access": ''
        },
        "team_efficiency": {
            "canvas": $('.chart-team-effienciency'),
            "label": 'Efficienza Team',
            "labels": MONTH,
            "datasets": [],
            "type": '',
            "options": {
                scales: {
                    yAxes: []
                }
            },
            "access": ''
        }
    };

    for (var chartData in aData) {
        var thisChart = oCharts[chartData];
        thisChart.type = aData[chartData].type;
        var index = 1;

        for (var dataInChartData in aData[chartData].data) {
            var thisData = [];
            //se è un oggetto e non un valore singolo
            if(typeof aData[chartData].data[dataInChartData] === 'object'){
                for (var keys in aData[chartData].data[dataInChartData]){
                    thisData.push(aData[chartData].data[dataInChartData][keys]);
                }

                thisChart.datasets.push(
                    {
                        label: dataInChartData ,
                        borderColor: createColorRandom(1),
                        backgroundColor: createColorRandom(0.5),
                        fill: false,
                        data: thisData,
                        yAxisID: 'y-axis'
                    }
                );

                thisChart.options.scales.yAxes.push(
                    {
                        id: 'y-axis',
                        type: 'linear'
                    }
                )
            }
            else{
                //inserisco i dati
                thisChart.data.push(aData[chartData].data[dataInChartData]);
                //inserisco dei colori random
                thisChart.backgroundColor.push(createColorRandom(0.8));
            }
                //se labels non ha elementi li inserisco
                if(thisChart.labels.length < Object.keys(aData[chartData].data).length) {
                    thisChart.labels.push(dataInChartData);
                }
                thisChart.access = aData[chartData].access;
                index++;
        }

        addChart(thisChart);
    }
}

//Funzione che inserisce chart
function addChart(aData) {
    var dataset;
    //se dato singolo
    if(aData.data){
        dataset = [{
            label: aData.label,
            backgroundColor: aData.backgroundColor,
            borderColor: 'rgb(0, 0, 0)',
            data: aData.data
        }];
    //se array di dati
    } else {
        dataset =  aData.datasets
    }

    var myChart = new Chart(aData.canvas, {
        type: aData.type,
        data: {
            labels: aData.labels,
            datasets: dataset
        },
        options: aData.options || null
    });

}

function createColorRandom(opacity) {
    var randomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', ' + opacity + ')';
    return randomColor;
}