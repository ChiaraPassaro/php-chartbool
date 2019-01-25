<?php include 'data.php' ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div class="chart">
      <canvas id="chart__canvas" data-chart="<?php /*stampo con data*/ echo json_encode($data); ?>"></canvas>
    </div>
    <script src="js/main.js" charset="utf-8"></script>
  </body>
</html>
