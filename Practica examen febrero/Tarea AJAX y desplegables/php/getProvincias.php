<?php
    require_once("conexion.php");

    $conexion = new Conexion();
    $conectar = $conexion->conectar();

    $comunidad_id = $_POST['ccaa_id'];

    $params = array(
        ":comunidad_id" => $comunidad_id
    );
    $sql = "SELECT * FROM provincias WHERE comunidad_id = :comunidad_id";
    $pdo = $conectar->prepare($sql);
    $pdo->execute($params);
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {  
        $provincia = array(
            "id" => $row['id'],
            "slug" => $row['slug'],
            "provincia" => $row['provincia'],
            "capital_id" => $row['capital_id']
        );
        $json[] = $provincia;
    }
    echo json_encode($json);
?>