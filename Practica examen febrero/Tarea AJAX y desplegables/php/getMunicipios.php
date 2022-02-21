<?php
    require_once("conexion.php");

    $conexion = new Conexion();
    $conectar = $conexion->conectar();

    $provincia_id = $_POST['provincia_id'];

    $params = array(
        ":provincia_id" => $provincia_id
    );
    $sql = "SELECT * FROM municipios WHERE provincia_id = :provincia_id";
    $pdo = $conectar->prepare($sql);
    $pdo->execute($params);
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {  
        $municipio = array(
            "id" => $row['id'],
            "slug" => $row['slug'],
            "municipio" => $row['municipio'],
            "latitud" => $row['latitud'],
            "longitud" => $row['longitud']
        );
        $json[] = $municipio;
    }
    echo json_encode($json);
?>