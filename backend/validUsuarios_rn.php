<?php

include('./conexion.php');
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo == 'POST') {


}

if ($metodo == 'GET') {
    if (isset($_GET['datos_especi'])) {
        $email = $_GET['email'];
        $clave = $_GET['clave'];
        $clave = md5($clave);

        $sql = "SELECT `username`, `email`, `nombreCompleto`, `permisos`, `clave`, `token` FROM usuarios WHERE email = '$email' AND clave = '$clave'";
        $result = $mysqli->query($sql);
        $resultarray = array();
        foreach ($result as $key) {
            $resultarray[] = $key;
        }

        echo json_encode($resultarray);
    }
    
    if (isset($_GET['checkState'])) {
        $token = $_GET['token'];

        $sql = "SELECT `username`, `email`, `nombreCompleto`, `permisos`, `clave`, `token` FROM usuarios WHERE token = '$token'";
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