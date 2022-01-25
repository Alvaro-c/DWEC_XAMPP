document.addEventListener("DOMContentLoaded", iniciar, false);


// Cuando carga el documento se llama a esta función (síncrona)
function iniciar() {
  // Evento change para los 3 campos select
  document.getElementById("id_ccaa").addEventListener("change", fccaa);
  document.getElementById("id_provincia").addEventListener("change", fprovincia);
  document.getElementById("id_municipio").addEventListener("change", fmunicipio);

  //Cargamos el select de comunidades autónomas
  var pag = "php/getCcaa.php";
  datos = "nocache=" + Math.random();
  loadDoc(pag, datos, mostrar_ccaa);


}

function mostrar_ccaa(xhttp) {
  var datos = JSON.parse(xhttp.responseText);
  for (let i = 0; i < datos.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", datos[i].id);
    var texto = document.createTextNode(datos[i].comunidad);
    option.appendChild(texto);
    document.getElementById("id_ccaa").appendChild(option);
  }
}

// ni idea aún
function fccaa() {
  fprovincia();

}

// Cargar provincias 
function fprovincia() {



    // Cuando cambia la CCAA, cargar provincias
    let provincias = "php/getProvincias.php";
    let provSelect = document.getElementById(`id_ccaa`).value; // obtengo el id de la CCAA
    console.log(provSelect);

    // Pido la lista de provincias al sv PHP (async)
    loadDoc(provincias, provSelect, mostrar_provincias);


}

function fmunicipio() {}


function mostrar_provincias(xhttp){

  var datos = JSON.parse(xhttp.responseText);
  for (let i = 0; i < datos.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", datos[i].id);
    var texto = document.createTextNode(datos[i].provincia);
    option.appendChild(texto);
    document.getElementById("id_provincia").appendChild(option);
  }
}