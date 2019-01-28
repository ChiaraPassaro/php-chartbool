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

    <?php if($level == 'guest' || $level == 'employee' || $level == 'clevel'){ ?>
        <div class="chart__mensile chart__closed">
          <div class="chart__close">
            <i class="fas fa-window-close"></i>
          </div>
          <div>
            <h2 class="chart__title">Fatturato Mensile</h2>
          </div>
          <div class="chart__canvas">
            <canvas class="chart-sales-month"></canvas>
          </div>
          <div class="table-for-chart table-sales-month"></div>
        </div>
    <?php } ?>

    <?php if($level == 'employee' || $level == 'clevel'){ ?>
        <div class="chart__peragente chart__closed">
          <div class="chart__close">
            <i class="fas fa-window-close"></i>
          </div>
          <div>
            <h2 class="chart__title">Vendite per Agente</h2>
          </div>
          <div class="chart__canvas">
            <canvas class="chart-sales-man"></canvas>
          </div>
          <div class="table-for-chart table-sales-man"></div>
        </div>
    <?php } ?>

    <?php if($level == 'clevel'){ ?>
        <div class="chart__team chart__closed">
          <div class="chart__close">
            <i class="fas fa-window-close"></i>
          </div>
          <div>
            <h2 class="chart__title">Vendite per Agente</h2>
          </div>
          <div class="chart__canvas">
            <canvas class="chart-team-effienciency"></canvas>
          </div>
          <div class="table-for-chart table-sales-man"></div>
        </div>
    <?php } ?>

    <script src="js/main.js" charset="utf-8"></script>
  </body>
</html>
