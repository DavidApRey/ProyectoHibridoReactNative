<?php

include('./conexion.php');
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo == 'POST') {


}

if ($metodo == 'GET') {
    if (isset($_GET['datos_especi'])) {
        $email = $_GET['email'];

        $sql = "SELECT * FROM usuarios WHERE email = '$email'";
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