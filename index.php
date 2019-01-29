  <?php
    $level = $_GET['level'];
  ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Chart Bool</title>
  </head>
  <body data-level="<?php if($level) echo $level?>">

    <div class="results"></div>

    <div class="template">
        <div class="chart chart__closed">
            <div class="chart__close">
                <i class="fas fa-window-close"></i>
            </div>
            <div>
                <h2 class="chart__title"></h2>
            </div>
            <div class="chart__canvas">
                <canvas></canvas>
            </div>
        </div>
    </div>
    <script src="js/main.js" charset="utf-8"></script>
  </body>
</html>
