<?php include 'data.php' ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js" charset="utf-8"></script>
    <meta charset="utf-8">
    <title>Chart Bool</title>
  </head>
  <body>
    <div class="chart">
      <canvas id="chart__canvas" data-chart="<?php /*stampo con data*/ echo json_encode($data); ?>"></canvas>
    </div>
    <script src="js/main.js" charset="utf-8"></script>
    <script type="text/javascript">
      var aData = "<?php /*stampo con data*/ echo json_encode($data); ?>";

      var $canvas = $('#chart__canvas');

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
        var myChart = new Chart($canvas, {
          type: 'line',
          data: {
            labels: MONTH,
            datasets: [{
              label: "Andamento mensile delle vendite",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: JSON.parse(aData), //parse sui dati ricevuti da DOM
            }]
          },
          options: {

          }
        });

      });
    </script>
  </body>
</html>
