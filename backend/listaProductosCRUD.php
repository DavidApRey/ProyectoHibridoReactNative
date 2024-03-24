<?php

include('./conexion.php');
include('./functionesGen.php');
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo == 'POST') {


}

if ($metodo == 'GET') {
    if (isset($_GET['datos_general'])) {
        $sql = "SELECT * FROM `lista_computadores_cab` WHERE `estado` = 'Y'";
        $result = $mysqli->query($sql);
        $resultarray = array();

        $i=0;
        foreach ($result as $key) {

            $resultarray[$i]['id_cons'] = utf8_encode($key['id_cons']);
            $resultarray[$i]['id_articulo'] = utf8_encode($key['id_articulo']);
            $resultarray[$i]['nombre_producto'] = utf8_encode($key['nombre_producto']);
            $resultarray[$i]['imagen'] = utf8_encode($key['imagen']);
            $resultarray[$i]['sinopsis'] = utf8_encode($key['sinopsis']);
            $resultarray[$i]['precio'] = utf8_encode($key['precio']);
            $resultarray[$i]['color'] = utf8_encode($key['color']);
            $resultarray[$i]['modelo'] = utf8_encode($key['modelo']);
            $resultarray[$i]['garantia'] = utf8_encode($key['garantia']);
            $resultarray[$i]['aviso_legal'] = utf8_encode($key['aviso_legal']);
            $resultarray[$i]['tamano_pantalla'] = utf8_encode($key['tamano_pantalla']);
            $resultarray[$i]['resolucion_pantalla'] = utf8_encode($key['resolucion_pantalla']);
            
            $resultarray[$i]['codigo_marca'] = (consul_marca_by_id($mysqli, $key['codigo_marca']));
            $resultarray[$i]['codigo_procesador'] = (consul_procesador_by_id($mysqli, $key['codigo_procesador']));
            $resultarray[$i]['codigo_memoria_ram'] = (consul_memoria_ram_by_id($mysqli, $key['codigo_memoria_ram']));
            $resultarray[$i]['codigo_almacenamiento'] = (consul_almacenamiento_by_id($mysqli, $key['codigo_almacenamiento']));
            $resultarray[$i]['codigo_sistema_operativo'] = (consul_so_by_id($mysqli, $key['codigo_sistema_operativo']));
            $resultarray[$i]['estado'] = utf8_encode($key['estado']);
            $i++;
        }

        echo json_encode($resultarray);
    }

    if (isset($_GET['datos_especi'])) {

        $id = $_GET['id_producto'];

        $sql = "SELECT * FROM lista_computadores_cab WHERE id_cons = '$id'";
        $result = $mysqli->query($sql);
        $resultarray = array();

        $i=0;
        foreach ($result as $key) {

            $resultarray[$i]['id_cons'] = utf8_encode($key['id_cons']);
            $resultarray[$i]['id_articulo'] = utf8_encode($key['id_articulo']);
            $resultarray[$i]['nombre_producto'] = utf8_encode($key['nombre_producto']);
            $resultarray[$i]['imagen'] = utf8_encode($key['imagen']);
            $resultarray[$i]['sinopsis'] = utf8_encode($key['sinopsis']);
            $resultarray[$i]['precio'] = utf8_encode($key['precio']);
            $resultarray[$i]['color'] = utf8_encode($key['color']);
            $resultarray[$i]['modelo'] = utf8_encode($key['modelo']);
            $resultarray[$i]['garantia'] = utf8_encode($key['garantia']);
            $resultarray[$i]['aviso_legal'] = utf8_encode($key['aviso_legal']);
            $resultarray[$i]['tamano_pantalla'] = utf8_encode($key['tamano_pantalla']);
            $resultarray[$i]['resolucion_pantalla'] = utf8_encode($key['resolucion_pantalla']);

            $resultarray[$i]['codigo_marca'] = consul_marca_by_id($mysqli, $key['codigo_marca']);
            $resultarray[$i]['codigo_procesador'] = consul_procesador_by_id($mysqli, $key['codigo_procesador']);
            $resultarray[$i]['codigo_memoria_ram'] = consul_memoria_ram_by_id($mysqli, $key['codigo_memoria_ram']);
            $resultarray[$i]['codigo_almacenamiento'] = consul_almacenamiento_by_id($mysqli, $key['codigo_almacenamiento']);
            $resultarray[$i]['codigo_sistema_operativo'] = consul_so_by_id($mysqli, $key['codigo_sistema_operativo']);
            $resultarray[$i]['estado'] = utf8_encode($key['estado']);
            $i++;
        }

        echo json_encode($resultarray);
    }
}

if ($metodo == 'PUT') {


}

if ($metodo == 'DELETE') {

  
}