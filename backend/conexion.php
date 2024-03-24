<?php

$server = "localhost";
$username = "softdevd_ShopTec";
$password = "-psj2F.&Ng~k";
$database = "softdevd_tiendatecnolo";

// $server = "localhost";
// $username = "root";
// $password = "";
// $database = "backendtienda";

$mysqli = new mysqli($server, $username, $password, $database);

if ($mysqli->connect_error) {
    die('error' . $mysqli->connect_error);
}

?>