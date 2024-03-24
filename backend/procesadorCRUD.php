<?php

include('./conexion.php');
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo == 'POST') {

    $datos = file_get_contents('php://input');
    $jsonstring = json_decode($datos, true);

    $id_marca = $jsonstring['id_marca'];
    $modelo = $jsonstring['modelo'];
    $velocidad = $jsonstring['velocidad'];
    $num_nucleos = $jsonstring['num_nucleos'];
    $estado = $jsonstring['estado'];

    $insert_alma = "INSERT INTO `computa_procesador`(`id_cons`, `id_marca`, `modelo`, `velocidad`, `num_nucleos`, `referencia`, `estado`) VALUES 
                                                    (null,'$id_marca','$modelo','$velocidad','$num_nucleos','','$estado')";
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
        computa_procesador.id_cons,
        computa_marca.marca,
        computa_procesador.modelo,
        computa_procesador.velocidad,
        computa_procesador.num_nucleos,
        computa_procesador.estado
        FROM computa_procesador
        INNER JOIN computa_marca ON computa_marca.id_cons = computa_procesador.id_marca";
        $result = $mysqli->query($sql);
        $resultarray = array();

        $i=0;
        foreach ($result as $key) {
            $resultarray[$i]['id_cons'] = $key['id_cons'];
            $resultarray[$i]['marca'] = $key['marca'];
            $resultarray[$i]['modelo'] = $key['modelo'];
            $resultarray[$i]['velocidad'] = $key['velocidad'];
            $resultarray[$i]['num_nucleos'] = $key['num_nucleos'];
            $resultarray[$i]['estado'] = $key['estado'];
            $i++;
        }

        echo json_encode($resultarray);
    }

    if (isset($_GET['datos_especi'])) {

        $id = $_GET['id_procesador'];

        $sql = "SELECT * FROM computa_procesador WHERE id_cons = '$id'";
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

    $id_cons  = $jsonstring['id_cons'];
    $id_marca = $jsonstring['id_marca'];
    $modelo = $jsonstring['modelo'];
    $velocidad = $jsonstring['velocidad'];
    $num_nucleos = $jsonstring['num_nucleos'];
    $estado = $jsonstring['estado'];

    $update = "UPDATE `computa_procesador` SET 
                `id_marca`='$id_marca',
                `modelo`='$modelo',
                `velocidad`='$velocidad',
                `num_nucleos`='$num_nucleos',
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

    $delete = "DELETE FROM `computa_procesador` WHERE `id_cons` = '$id_cons'";
    $result = $mysqli->query($delete);

    if (!$result) {
        echo 400;
    } else {
        echo 200;
    }
}