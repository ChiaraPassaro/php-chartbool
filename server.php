<?php
include 'data.php';
$level = $_GET['level'];
$graphs_granted = [];

if ($level == 'guest') {
    foreach ($graphs as $key => $graph) {
        if ($graph['access'] === 'guest') {
            $graphs_granted[$key] = $graph;
        }
    }
} elseif ($level == 'employee') {
    foreach ($graphs as $key => $graph) {
        if ($graph['access'] === 'guest' || $graph['access'] === 'employee') {
            $graphs_granted[$key] = $graph;
        }
    }
} elseif ($level == 'clevel') {
    foreach ($graphs as $key => $graph) {
        if ($graph['access'] === 'guest' || $graph['access'] === 'employee' || $graph['access'] === 'clevel') {
            $graphs_granted[$key] = $graph;
        }
    }
}

if ($level) {
    echo json_encode($graphs_granted);
}

?>