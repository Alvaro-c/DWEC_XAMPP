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

// Sólo llamo a la siguiente función que carga las provincias.
function fccaa() {
  fprovincia();

}

//
//  ZONA PROVINCIA
//


// Cargar las provincias de la BBDD
function fprovincia() {
    eliminar_provincias();
    // Cuando cambia la CCAA, cargar provincias
    let provincias = "php/getProvincias.php";
    let ccaaSelect = document.getElementById(`id_ccaa`).value; // obtengo el id de la CCAA

    // Pido la lista de provincias al sv PHP (async)
    loadDoc(provincias, ccaaSelect, mostrar_provincias);
    // Una vez cargadas, pido los municipios
    //fmunicipio();

}


function mostrar_provincias(xhttp){

  // Compruebo si hay provincias cargadas y las elimino
  // if(!(document.getElementById("id_provincia").length == 1  && document.getElementById("id_provincia").innerText == 'Elegir una provincia')){
  //   eliminar_provincias();
  // }

  var datos = JSON.parse(xhttp.responseText);
  for (let i = 0; i < datos.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", datos[i].id);
    var texto = document.createTextNode(datos[i].provincia);
    option.appendChild(texto);
    document.getElementById("id_provincia").appendChild(option);
  }
}

function eliminar_provincias(){
  let provincias = document.getElementById("id_provincia");
  provincias.innerHTML = '';
}

//
//  ZONA MUNICIPIO
//

// Cargar los municipios de la BBDD
function fmunicipio() {

  // Cuando cambia la provincia, cargar municipios
  let municipios = "php/getMunicipios.php";
  let provSelect = document.getElementById(`id_provincia`).value; // obtengo el id de la provincia


  // Pido la lista de municipios al sv PHP (async)
  loadDoc(municipios, provSelect, mostrar_municipios);

}

function mostrar_municipios(xhttp){

  // Compruebo si hay municipios cargadas y los elimino
  if(!(document.getElementById("id_municipio").length == 1 && document.getElementById("id_municipio").innerText == 'Elegir un municipio')){
    eliminar_municipios();
  }

  var datos = JSON.parse(xhttp.responseText);
  for (let i = 0; i < datos.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", datos[i].id);
    var texto = document.createTextNode(datos[i].municipio);
    option.appendChild(texto);
    document.getElementById("id_municipio").appendChild(option);
  }
}

function eliminar_municipios(){
  let provincias = document.getElementById("id_municipio");
  provincias.innerHTML = '';
}