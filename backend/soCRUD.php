<?php

include('./conexion.php');
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo == 'POST') {

    $datos = file_get_contents('php://input');
    $jsonstring = json_decode($datos, true);

    $id_marca = $jsonstring['id_marca'];
    $version_so = $jsonstring['version_so'];
    $sistema_operativo = $jsonstring['sistema_operativo'];
    $estado = $jsonstring['estado'];

    $insert_alma = "INSERT INTO `computa_sistema_operativo`(`id_cons`, `id_marca`, `version_so`, `sistema_operativo`, `estado`) VALUES 
                                                        (null,'$id_marca','$version_so','$sistema_operativo','$estado')";
    $result = $mysqli->query($insert_alma);

    if (!$result) {
        echo 400;
    } else {
        echo 200;
    }

}

if ($metodo == 'GET') {
    if (isset($_GET['datos_general'])) {
        $sql = "SELECT
        computa_sistema_operativo.id_cons,
        computa_marca.marca,
        computa_sistema_operativo.version_so,
        computa_sistema_operativo.sistema_operativo,
        computa_sistema_operativo.estado
        FROM computa_sistema_operativo
        INNER JOIN computa_marca ON computa_marca.id_cons = computa_sistema_operativo.id_marca";
        $result = $mysqli->query($sql);
        $resultarray = array();

        $i=0;
        foreach ($result as $key) {
            $resultarray[$i]['id_cons'] = $key['id_cons'];
            $resultarray[$i]['marca'] = $key['marca'];
            $resultarray[$i]['version_so'] = $key['version_so'];
            $resultarray[$i]['sistema_operativo'] = $key['sistema_operativo'];
            $resultarray[$i]['estado'] = $key['estado'];
            $i++;
        }

        echo json_encode($resultarray);
    }

    if (isset($_GET['datos_especi'])) {

        $id = $_GET['id_so'];

        $sql = "SELECT * FROM computa_sistema_operativo WHERE id_cons = '$id'";
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
    $id_marca = $jsonstring['id_marca'];
    $version_so = $jsonstring['version_so'];
    $sistema_operativo = $jsonstring['sistema_operativo'];
    $estado = $jsonstring['estado'];

    $update = "UPDATE `computa_sistema_operativo` SET 
                `id_marca`='$id_marca',
                `version_so`='$version_so',
                `sistema_operativo`='$sistema_operativo',
                `estado` = '$estado'
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

    $delete = "DELETE FROM `computa_sistema_operativo` WHERE `id_cons` = '$id_cons'";
    $result = $mysqli->query($delete);

    if (!$result) {
        echo 400;
    } else {
        echo 200;
    }
}