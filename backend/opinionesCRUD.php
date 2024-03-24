<?php

include('./conexion.php');
include('./functionesGen.php');
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo == 'POST') {


}

if ($metodo == 'GET') {
    if (isset($_GET['datos_general'])) {
       
    }

    if (isset($_GET['datos_especi'])) {

        $id = $_GET['id_producto'];

        $sql = "SELECT * FROM opiniones WHERE id_producto = '$id'";
        $result = $mysqli->query($sql);
        $resultarray = array();

        foreach ($result as $key) {
            $resultarray[] = $key;
        }

        echo json_encode($resultarray);
    }
}

if ($metodo == 'PUT') {


}

if ($metodo == 'DELETE') {

  
}