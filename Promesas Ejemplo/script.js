document.addEventListener("DOMContentLoaded", iniciar, false);
 
function iniciar() {
  document.getElementById("id_boton").addEventListener("click", buscar);
}
 
function buscar() {
  var dni = document.getElementById("id_dni").value;
  var pag = "server.php?dni=" + dni;  //Aquí pasaremos el valor a buscar
  
  let getDatos = new Promise((resolve, reject) => {

    let ajax = new XMLHttpRequest();
    ajax.open('GET', pag);
    ajax.addEventListener('load', () => {

        if (ajax.status !== 200) {
            reject(ajax.status);
            return;
        } 
        resolve(ajax);
    });
    ajax.send();

  });

  getDatos
  .then((xhttp) => {
      let resultado  = document.getElementById('id_resultado');
      let datos = JSON.parse(xhttp.responseText);
      let salida = `Apellido: ${datos.apellido}<br>`;
      salida = salida  + `Nombre: ${datos.nombre}<br>`;
      salida = salida + `Dirección: ${datos.direccion}<br>`;
      resultado.innerHTML = "<BR>" + salida;

  })
  .catch(error=> {
      console.log("HA muerto");


  });

}

 /*
function loadDoc(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
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
*/