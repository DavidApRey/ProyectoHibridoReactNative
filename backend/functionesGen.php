<?php

include('./conexion.php');

function consul_marca_by_id($mysqli, $id)
{
    $sql = "SELECT * FROM `computa_marca` WHERE `id_cons` = '$id'";
    $result = $mysqli->query($sql);
    $resultarray = array();
    foreach($result as $key){
        $resultarray[] = $key;
    }

    return $resultarray;
}

function consul_almacenamiento_by_id($mysqli, $id)
{
    $sql = "SELECT
    computa_almacenamiento.id_cons,
    computa_marca.marca,
    computa_almacenamiento.capacidad,
    computa_almacenamiento.tipo_disco,
    computa_almacenamiento.estado
    FROM computa_almacenamiento
    INNER JOIN computa_marca ON computa_marca.id_cons = computa_almacenamiento.id_marca
    WHERE computa_almacenamiento.`id_cons` = '$id'";
    $result = $mysqli->query($sql);
    $resultarray = array();
    foreach($result as $key){
        $resultarray[] = $key;
    }

    return $resultarray;
}

function consul_memoria_ram_by_id($mysqli, $id)
{
    $sql = "SELECT
    computa_memoria_ram.id_cons,
    computa_marca.marca,
    computa_memoria_ram.capacidad,
    computa_memoria_ram.velocidad,
    computa_memoria_ram.socket,
    computa_memoria_ram.estado
    FROM computa_memoria_ram
    INNER JOIN computa_marca ON computa_marca.id_cons = computa_memoria_ram.id_marca
    WHERE computa_memoria_ram.`id_cons` = '$id'";
    $result = $mysqli->query($sql);
    $resultarray = array();
    foreach($result as $key){
        $resultarray[] = $key;
    }

    return $resultarray;
}

function consul_procesador_by_id($mysqli, $id)
{
    $sql = "SELECT
    computa_procesador.id_cons,
    computa_marca.marca,
    computa_procesador.modelo,
    computa_procesador.velocidad,
    computa_procesador.num_nucleos,
    computa_procesador.estado
    FROM computa_procesador
    INNER JOIN computa_marca ON computa_marca.id_cons = computa_procesador.id_marca
    WHERE computa_procesador.`id_cons` = '$id'";
    $result = $mysqli->query($sql);
    $resultarray = array();
    foreach($result as $key){
        $resultarray[] = $key;
    }

    return $resultarray;
}

function consul_so_by_id($mysqli, $id)
{
    $sql = "SELECT
    computa_sistema_operativo.id_cons,
    computa_marca.marca,
    computa_sistema_operativo.version_so,
    computa_sistema_operativo.sistema_operativo,
    computa_sistema_operativo.estado
    FROM computa_sistema_operativo
    INNER JOIN computa_marca ON computa_marca.id_cons = computa_sistema_operativo.id_marca
    WHERE computa_sistema_operativo.`id_cons` = '$id'";
    
    $result = $mysqli->query($sql);
    $resultarray = array();
    foreach($result as $key){
        $resultarray[] = $key;
    }

    return $resultarray;
}

?>