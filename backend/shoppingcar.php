<?php

include('./conexion.php');
include('./functionesGen.php');
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo == 'POST') {


}

if ($metodo == 'GET') {
    if (isset($_GET['datos_general'])) {
        $token = $_GET['token'];
        $sql = "SELECT `productos_carrito` FROM `usuarios` WHERE `token` = '$token'";
        $result = $mysqli->query($sql);
        $resultarray = array();

        foreach ($result as $key) {
            $resultarray[] = $key;
        }
        $datos = $resultarray[0]['productos_carrito'];
        $datos = json_decode($datos, true);
        $array_result = array();
        
        $i=0;
        foreach($datos as $key1){
        
            $id_articulo = $key1['id_product'];
            $cantidad = $key1['cantidad'];
            
            $sql_list = "SELECT * FROM lista_computadores_cab WHERE `id_articulo` = '$id_articulo'";
            $result_list = $mysqli->query($sql_list);
            $resultarray_list = array();
            foreach($result_list as $key2){
                $resultarray_list[] = $key2;
            }
            
            $array_result[$i]['id_articulo'] = $resultarray_list[0]['id_articulo'];
            $array_result[$i]['cantidad'] = $cantidad;
            $array_result[$i]['nombre_producto'] = $resultarray_list[0]['nombre_producto'];
            $array_result[$i]['imagen'] = $resultarray_list[0]['imagen'];
            $array_result[$i]['precio'] = $resultarray_list[0]['precio'];
            $array_result[$i]['total'] = $resultarray_list[0]['precio']*$cantidad;
            $i++;
        }
        
        echo json_encode($array_result);
    }
    
    if (isset($_GET['datos_general_filter'])) {
        $token = $_GET['token'];
        $sql = "SELECT `productos_carrito` FROM `usuarios` WHERE `token` = '$token'";
        $result = $mysqli->query($sql);
        $resultarray = array();

        foreach ($result as $key) {
            $resultarray[] = $key;
        }
        
        echo json_encode($resultarray[0]['productos_carrito']);
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
    
    $datos = file_get_contents('php://input');
    $jsonstring = json_decode($datos, true);

    if (isset($jsonstring['add_list_shopping'])) {
        
        $lista_productos = $jsonstring['listaProductos'];
        $lista_productos = json_encode($lista_productos);
        $token = $jsonstring['token'];
        
        $sql="UPDATE `usuarios` SET 
                `productos_carrito`='$lista_productos'
                WHERE `token`='$token'";
        $result = $mysqli->query($sql);
        
        if (!$result) {
            echo 400;
        } else {
            echo 200;
        }
    }

}

if ($metodo == 'DELETE') {

    $datos = file_get_contents('php://input');
    $jsonstring = json_decode($datos, true);
  
    if (isset($jsonstring['clean_list_shopping'])) {
        
        $token = $jsonstring['token'];
        
        $sql="UPDATE `usuarios` SET 
                `productos_carrito`=''
                WHERE `token`='$token'";
        $result = $mysqli->query($sql);
        
        if (!$result) {
            echo 400;
        } else {
            echo 200;
        }
    }
  
}