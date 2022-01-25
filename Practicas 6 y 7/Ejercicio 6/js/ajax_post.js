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


// Esta función se llama cuando carga la página por primera vez, carga las CCAA
// url: script de php que carga las ccaa
// data: nocache= miau miau
// cFunction: mostrar_ccaa
function loadDoc(url, data, cFunction) {
  var xhttp;
  xhttp = nuevoAjax();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({"id_ccaa": data}));
}


