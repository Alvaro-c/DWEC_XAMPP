<?php
    require_once("conexion.php");

    $conexion = new Conexion();
    $conectar = $conexion->conectar();
    $sql = "SELECT * FROM comunidades";
    $pdo = $conectar->prepare($sql);
    $pdo->execute();
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {  
        $comunidad = array(
            "id" => $row['id'],
            "slug" => $row['slug'],
            "comunidad" => $row['comunidad'],
            "capital_id" => $row['capital_id']
        );
        $json[] = $comunidad;
    }
    echo json_encode($json);
?>