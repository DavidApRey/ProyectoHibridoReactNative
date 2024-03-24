<?php

include('./conexion.php');
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo == 'POST') {

    $datos = file_get_contents('php://input');
    $jsonstring = json_decode($datos, true);

    $id_marca = $jsonstring['id_marca'];
    $capacidad = $jsonstring['capacidad'];
    $velocidad = $jsonstring['velocidad'];
    $socket = $jsonstring['socket'];

    $insert_memoria = "INSERT INTO `computa_memoria_ram`(`id_cons`, `id_marca`, `capacidad`, `velocidad`, `socket`) VALUES 
                                                        (null,'$id_marca','$capacidad','$velocidad','$socket')";
    $result = $mysqli->query($insert_memoria);

    if (!$result) {
        echo 400;
    } else {
        echo 200;
    }

}

if ($metodo == 'GET') {
    if (isset($_GET['datos_general'])) {
        $sql = "SELECT
        computa_memoria_ram.id_cons,
        computa_marca.marca,
        computa_memoria_ram.capacidad,
        computa_memoria_ram.velocidad,
        computa_memoria_ram.socket,
        computa_memoria_ram.estado
        FROM computa_memoria_ram
        INNER JOIN computa_marca ON computa_marca.id_cons = computa_memoria_ram.id_marca";
        $result = $mysqli->query($sql);
        $resultarray = array();

        foreach ($result as $key) {
            $resultarray[] = $key;
        }

        echo json_encode($resultarray);
    }

    if (isset($_GET['datos_especi'])) {

        $id = $_GET['id_marca'];

        $sql = "SELECT * FROM computa_memoria_ram WHERE id_cons = '$id'";
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
    $id_marca = $jsonstring['marca'];
    $capacidad = $jsonstring['capacidad'];
    $velocidad = $jsonstring['velocidad'];
    $socket = $jsonstring['socket'];
    $estado = $jsonstring['estado'];

    $update = "UPDATE `computa_memoria_ram` SET 
                    `id_marca`='$id_marca',
                    `capacidad`='$capacidad',
                    `velocidad`='$velocidad',
                    `socket`='$socket',
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

    $delete = "DELETE FROM `computa_memoria_ram` WHERE `id_cons` = '$id_cons'";
    $result = $mysqli->query($delete);

    if (!$result) {
        echo 400;
    } else {
        echo 200;
    }
}