<?php
    require_once("conexion.php");

    $conexion = new Conexion();
    $conectar = $conexion->conectar();

    $provincia_id = $_POST['query'];

    $params = array(
        ":provincia_id" => $provincia_id
    );
    $sql = "SELECT * FROM municipios WHERE municipio like '". $provincia_id. "%';";
    $pdo = $conectar->query($sql);
    $pdo = $pdo->fetchALL(PDO::FETCH_ASSOC);
    $json = json_encode($pdo);

    echo json_encode($json);
?>