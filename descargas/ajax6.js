document.addEventListener("DOMContentLoaded", iniciar, false);

function iniciar() {
  document.getElementById("id_boton").addEventListener("click", buscar);
}

function buscar() {
  var dni = document.getElementById("id_dni").value;
  var pag = "ajax6.php?dni=" + dni;  //Aquí pasaremos el valor a buscar
  loadDoc(pag, mostrar);
}

/* función para crear el objeto AJAX*/
function nuevoAjax() {
  var xhttp = false;
  try {
    // Creacion del objeto AJAX para navegadores no IE
    xhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      // Creacion del objet AJAX para IE
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xhttp = false;
    }
  }
  if (!xhttp && typeof XMLHttpRequest != "undefined") {
    xhttp = new XMLHttpRequest();
  }

  return xhttp;
}

function loadDoc(url, cFunction) {
  var xhttp;
  xhttp = nuevoAjax();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function mostrar(xhttp) {
  var resultado = document.getElementById("id_resultado");
  var datos = JSON.parse(xhttp.responseText);
  var salida = "Apellido: " + datos.apellido + "<br>";
  salida = salida + "Nombre: " + datos.nombre + "<br>";
  salida = salida + "Dirección: " + datos.direccion;
  resultado.innerHTML = "<BR>" + salida;
}
