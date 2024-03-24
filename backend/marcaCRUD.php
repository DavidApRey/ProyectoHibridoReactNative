<?php

include('./conexion.php');
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo == 'POST') {

    $datos = file_get_contents('php://input');
    $jsonstring = json_decode($datos, true);

    $marca = $jsonstring['marca'];
    $estado = $jsonstring['estado'];

    $insert_marca = "INSERT INTO `computa_marca`(`id_cons`, `marca`, `estado`) VALUES 
                                            (null,'$marca','$estado')";
    $result = $mysqli->query($insert_marca);

    if (!$result) {
        echo 400;
    } else {
        echo 200;
    }

}

if ($metodo == 'GET') {
    if (isset($_GET['datos_general'])) {
        $sql = "SELECT * FROM computa_marca";
        $result = $mysqli->query($sql);
        $resultarray = array();

        foreach ($result as $key) {
            $resultarray[] = $key;
        }

        echo json_encode($resultarray);
    }

    if (isset($_GET['datos_especi'])) {

        $id = $_GET['id_marca'];

        $sql = "SELECT * FROM computa_marca WHERE id_cons = '$id'";
        $result = $mysqli->query($sql);
        $resultarray = array();

        foreach ($result as $key) {
            $resultarray[] = $key;
        }

        echo json_encode($resultarray);
    }
}

if ($metodo == 'PUT') {

    $datos = file_get_contents('php://input');
    $jsonstring = json_decode($datos, true);

    $id_cons = $jsonstring['id_cons'];
    $marca = $jsonstring['marca'];
    $estado = $jsonstring['estado'];

    $update = "UPDATE `computa_marca` SET 
                    `marca`='$marca',
                    `estado`='$estado'
            WHERE `id_cons`='$id_cons'";
    $result = $mysqli->query($update);

    if (!$result) {
        echo 400;
    } else {
        echo 200;
    }

}

if ($metodo == 'DELETE') {
    
    $datos = file_get_contents('php://input');
    $jsonstring = json_decode($datos, true);

    $id_cons = $jsonstring['id_cons'];

    $delete = "DELETE FROM `computa_marca` WHERE `id_cons` = '$id_cons'";
    $result = $mysqli->query($delete);

    if (!$result) {
        echo 400;
    } else {
        echo 200;
    }
}