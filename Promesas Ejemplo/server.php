<?php
header('Content-Type: text/txt; charset=utf-8');
$nombre='';
$apellido='';
$direccion='';
if ($_REQUEST['dni']=='1')
{
  $nombre='Juan';
  $apellido='Rodríguez';
  $direccion='Paseo Ezequiel González 12';
}
if ($_REQUEST['dni']=='2')
{
  $nombre='Ana';
  $apellido='Maroto';
  $direccion='Calle Lérida 4';
}
if ($_REQUEST['dni']=='3')
{
  $nombre='Mateo';
  $apellido='García';
  $direccion='Avenida de la Constitución 8';
}
// retrasamos 5 segundos la ejecuci�n de esta p�gina PHP.
sleep(1);
echo "{
        \"nombre\":\"$nombre\",
        \"apellido\":\"$apellido\",
        \"direccion\":\"$direccion\"
      }";
?>