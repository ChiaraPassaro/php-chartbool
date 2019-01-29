var $ = require("jquery");
var Chart = require('chart.js');

var levelUser = $('body').data('level');

//importo tutte le funzioni in palette.js con namespace ColorPalette
import * as ColorPalette from './palette.js';

var baseColorChart = new ColorPalette.Hsl(89,89,65);
var palette =  new ColorPalette.SetColorPalette(baseColorChart);

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

            if(levelUser){
                var processedData = processData(JSON.parse(data));

                //chiamo addChart per ogni chart trovata
                for (var chart in processedData){
                    addChart(processedData[chart]);
                }

            }
        },
        error: function (err) {
            console.log(err);
        }
    });

});

//Funzione che prepara i dati
function processData(aData) {
    //preparo i dati per chartjs
    var oCharts = {};
    //se un tipo di chart è presente allora la inserisco in oCharts
    if(aData.hasOwnProperty('fatturato')){
        oCharts['fatturato'] =
            {
                "template": '.chart-sales-month',
                "canvas": '.chart-sales-month',
                "label": 'Fatturato mensile',
                "backgroundColor": [],
                "borderColor": [],
                "labels": MONTH,
                "data": [],
                "type": '',
                "access": ''
            };
    }
    if(aData.hasOwnProperty('fatturato_by_agent')){
        oCharts['fatturato_by_agent'] =
            {
                "template": '.chart-sales-man',
                "canvas": '.chart-sales-man',
                "label": 'Fatturato per Agente',
                "backgroundColor": [],
                "borderColor": [],
                "labels": [],
                "data": [],
                "type": '',
                "access": ''
            };
    }
    if(aData.hasOwnProperty('team_efficiency')){
        oCharts['team_efficiency'] =
            {
                "template": '.chart-team',
                "canvas": '.chart-team',
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
            };
    }
    //leggo i dati in ingresso
    //per ogni tipo di chart
    for (var chartData in aData) {
        var thisChart = oCharts[chartData];
        thisChart.type = aData[chartData].type;
        var index = 1;

        //genero numero di colori in base al numero di dati presenti
        for (var dataInChartData in aData[chartData].data) {
            var numColors = Object.keys(aData[chartData].data).length;
        }

        //se è un numero dispari aumento di 1 colorpalette accetta solo dati pari
        if(!ColorPalette.isEven(numColors)){
            numColors++;
        }

        //setto gli step 140 sono i gradi massimi
        var step = Math.floor(140/numColors);
        
        //genero palette
        var colors = palette.complementar(numColors, step);

        //per ogni data presente nella chart
        for (var dataInChartData in aData[chartData].data) {
            var thisData = [];
            var thisColor;
            var thisColorBorder;

            //se è un oggetto e non un valore singolo
            if(typeof aData[chartData].data[dataInChartData] === 'object'){
                for (var keys in aData[chartData].data[dataInChartData]){
                    thisData.push(aData[chartData].data[dataInChartData][keys]);
                }

                //setto i colori
                thisColor = colors[index-1].printHsl();
                colors[index-1].setBrightness(80);
                thisColorBorder = colors[index-1].printHsl();

                thisChart.datasets.push(
                    {
                        label: dataInChartData ,
                        borderColor: thisColorBorder,
                        backgroundColor:  thisColor,
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
            //se dato singolo
            else{
                //inserisco i dati
                thisChart.data.push(aData[chartData].data[dataInChartData]);

                //setto i colori
                thisColor = colors[index-1].printHsl();
                colors[index-1].setBrightness(40);
                thisColorBorder = colors[index-1].printHsl();

                thisChart.backgroundColor.push(thisColor);
                thisChart.borderColor.push(thisColorBorder);
            }

            //se labels non ha elementi li inserisco
            if(thisChart.labels.length < Object.keys(aData[chartData].data).length) {
                thisChart.labels.push(dataInChartData);
            }

            //inserisco livello accesso
            thisChart.access = aData[chartData].access;

            index++;
        }

    }

    return oCharts;
}

//funzione che clona template e inserische in html
function templateHtml(aData) {
    //clono template e inserisco in html
    var template = $('.template .chart').clone();
    template.addClass(aData.template);
    template.find('chart__title').html(aData.label);
    template.find('canvas').addClass(aData.canvas);
    var canvas = template.find('canvas');
    $('.results').append(template);
    //ritorno il canvas
    return canvas;
}

//Funzione che inserisce chart
function addChart(aData) {

    var canvas = templateHtml(aData);
    var dataset;

    //se dato singolo
    if(aData.data){
        //se è line solo un colore di bg
        var backgroundColor =  (aData.type === 'line') ? aData.backgroundColor[1] : aData.backgroundColor;
        dataset = [{
            label: aData.label,
            backgroundColor: backgroundColor,
            borderColor: 'white',
            data: aData.data
        }];
    //se array di dati
    } else {
        dataset =  aData.datasets
    }

    //crreo chart in canvas
    var myChart = new Chart(canvas, {
        type: aData.type,
        data: {
            labels: aData.labels,
            datasets: dataset
        },
        options: aData.options || null
    });

}



