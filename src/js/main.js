var $ = require("jquery");
var Chart = require('chart.js');
var levelUser = $('body').data('level');

var thisColor = new Hsl(89,89,50);
var palette =  new SetColorPalette(thisColor);

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
    var oCharts = {
        "fatturato": {
            "canvas": $('.chart-sales-month'),
            "label": 'Fatturato mensile',
            "backgroundColor": [],
            "borderColor": [],
            "labels": MONTH,
            "data": [],
            "type": '',
            "access": ''
        },
        "fatturato_by_agent": {
            "canvas": $('.chart-sales-man'),
            "label": 'Fatturato per Agente',
            "backgroundColor": [],
            "borderColor": [],
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
        if(!isEven(numColors)){
            numColors++;
            var notEven = true;
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
                        borderColor: thisColorBorder ,
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
            else{
                //inserisco i dati
                thisChart.data.push(aData[chartData].data[dataInChartData]);

                //setto i colori
                thisColor = colors[index-1].printHsl();
                colors[index-1].setBrightness(70);
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

//Funzione che inserisce chart
function addChart(aData) {
    var dataset;
    //se dato singolo
    if(aData.data){
        dataset = [{
            label: aData.label,
            backgroundColor: aData.backgroundColor,
            borderColor: aData.borderColor[aData.borderColor.length - 1], //ultimo colore
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



/***************************************************
                    COLOR PALETTE
 ***************************************************/
function isGreaterThan(num, max) {
    if (num > max) {
        return true;
    }
}

function isInRange(num, min, max) {
    if (num >= min && num <= max) {
        return true;
    }
}

function isEven(number) {
    var even = false;

    if (number % 2 === 0) {
        even = true;
    }

    return even;
}


function Hsl(degree, saturation, brightness) {
    //controllo se i dati sono esatti

    if (isNaN(degree)) throw 'Degree in Not a Number';
    if (!isInRange(degree, 0, 360)) throw 'Degree number out of range';
    if (isNaN(saturation)) throw 'Saturation in Not a Number';
    if (!isInRange(saturation, 0, 360)) throw 'Saturation number out of range';
    if (isNaN(brightness)) throw 'Brightness in Not a Number';
    if (!isInRange(brightness, 0, 360)) throw 'Brightness number out of range';

    var _degree = parseFloat(degree.toFixed(2));

    var _saturation = parseFloat(saturation.toFixed(2));

    var _brightness = parseFloat(brightness.toFixed(2));

    this.getDegree = function () {
        return _degree;
    };

    this.getSaturation = function () {
        return _saturation;
    };

    this.getBrightness = function () {
        return _brightness;
    };

    this.printHsl = function () {
        return 'hsl(' + _degree + ',' + _saturation + '%,' + _brightness + '%)';
    };

    this.setBrightness = function (newBrightness) {
        if (isNaN(newBrightness)) throw 'Brightness in Not a Number';
        if (!isInRange(newBrightness, 0, 360)) throw 'Brightness number out of range';
        _brightness = parseFloat(newBrightness.toFixed(2));
    };

    return this;
}

function SetColorPalette(baseColor) {
    if (baseColor.constructor !== Hsl) throw 'Basecolor is not an object';
    var _totalDegree = 360;
    var _baseColor = baseColor; //ritorna stringa con colore base

    this.getBasecolor = function () {
        return _baseColor;
    }; //update del colore base


    this.updateColorPalette = function (newColor) {
        if (newColor.constructor !== Hsl) throw 'Basecolor is not an object';
        _baseColor = newColor;
    }; //funzione che crea triade


    this.triad = function () {
        return getColors(240, 2, 60);
    }; //funzione che crea complementari


    this.complementar = function (numColor, stepDegree) {
        if (!isEven(numColor)) throw 'The Colors must be even';
        return getColors(140, numColor, stepDegree, 'complementary');
    }; //funzione che crea analoghi


    this.analogous = function (typeScheme, numColor, stepDegree) {
        if (!isEven(numColor)) throw 'The Colors must be even'; //console.log(typeScheme);

        switch (typeScheme) {
            case 'allArch':
                return getColors(120, numColor, stepDegree, 'analogous');

            case 'cold':
                return getColors(120, numColor, stepDegree, 'analogousCold');

            case 'warm':
                return getColors(120, numColor, stepDegree, 'analogousWarm');
        }
    }; //funzione che crea complementari divergenti


    this.splitComplementar = function () {
        return getColors(60, 2, 30, 'splitComplementary');
    }; //funzione che crea colori


    function getColors(rangeDegree, numColor, stepDegree, scheme) {
        var _rangeDegree = parseFloat(rangeDegree.toFixed(2));

        var _num = numColor || 2;

        _num = Math.floor(_num);

        var _step = stepDegree || 10;

        _step = parseFloat(_step.toFixed(2)); //se il numero di gradi è superiore a _rangeDegree  errore

        if (_step * _num > _rangeDegree) throw 'Out of range >' + _rangeDegree;

        var _scheme = scheme || false;

        var _firstSchemeColor = parseFloat((_baseColor.getDegree() + 180).toFixed(2)); //se ho inserito uno schema  il primo colore inserito cambia


        if (_scheme) {
            switch (_scheme) {
                case 'complementary':
                    _firstSchemeColor = parseFloat((_baseColor.getDegree() + 180).toFixed(2));
                    break;

                case 'analogous':
                    _firstSchemeColor = parseFloat(_baseColor.getDegree().toFixed(2));
                    break;

                case 'analogousCold':
                    _firstSchemeColor = parseFloat(_baseColor.getDegree().toFixed(2));
                    break;

                case 'analogousWarm':
                    _firstSchemeColor = parseFloat(_baseColor.getDegree().toFixed(2));
                    break;
            }
        }

        if (isGreaterThan(_firstSchemeColor, _totalDegree)) {
            _firstSchemeColor = _firstSchemeColor - _totalDegree;
        }

        var _arrayColors = [_firstSchemeColor]; //ciclo che prende colore precedente e inserisce -_step

        for (var i = _num / 2; i >= 1; i--) {
            var _newColor = _arrayColors[_arrayColors.length - 1] - _step; //trasformo in un numero a due decimali


            _newColor = parseFloat(_newColor.toFixed(2)); //aggiungo colore all'ultimo posto

            _arrayColors.push(_newColor);
        } //ciclo che prende colore precedente e inserisce +_step


        for (var k = 0; k < _num / 2; k++) {
            _newColor = _arrayColors[0] + _step; //trasformo in un numero a due decimali

            _newColor = parseFloat(_newColor.toFixed(2)); //aggiungo colore al primo posto

            _arrayColors.unshift(_newColor);
        } //sostituisco i gradi oltre i 360


        _arrayColors.map(function (currentValue, index) {
            if (isGreaterThan(currentValue, _totalDegree)) {
                _arrayColors[index] = parseFloat((currentValue - _totalDegree).toFixed(2));
            } //se il numero è negativo  aggiungo  360gradi


            if (currentValue < 0) {
                _arrayColors[index] = parseFloat((currentValue + _totalDegree).toFixed(2));
            } //sostituisco con nuovo oggetto Hsl()


            _arrayColors[index] = new Hsl(_arrayColors[index], _baseColor.getSaturation(), _baseColor.getBrightness());
        });
        /*//inserisco colore base
        _arrayColors.unshift(_baseColor);*/
        //se scheme è false lo elimino


        if (!scheme || scheme === 'splitComplementary') {
            _arrayColors.splice(_num / 2, 1);
        } //per lo schema analogo inverto i dati


        if (_scheme === 'analogous') {
            _arrayColors.reverse();
        }

        if (_scheme === 'analogousCold') {
            //elimino i colori caldi
            _arrayColors.reverse();

            _arrayColors.splice(_num / 2 + 1, _arrayColors.length - 1);
        }

        if (_scheme === 'analogousWarm') {
            //elimino i colori freddi
            _arrayColors.reverse();

            _arrayColors.splice(0, _num / 2);
        }

        return _arrayColors;
    }
    return this;
}

