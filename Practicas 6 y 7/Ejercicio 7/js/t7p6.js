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

//
//  ZONA PROVINCIA
//

// Cargar las provincias de la BBDD
function fccaa() {

  // Elimino las posibles provincias cargadas anteriormente
  eliminar_provincias();

  // Cuando cambia la CCAA, cargar provincias
  let provincias = "php/getProvincias.php";
  let ccaaSelect = document.getElementById(`id_ccaa`).value; // obtengo el id de la CCAA

  // Pido la lista de provincias al sv PHP (async)
  loadDoc(provincias, ccaaSelect, mostrar_provincias);
  // Una vez cargadas, pido los municipios
  //fmunicipio();

}

function mostrar_provincias(xhttp) {


  var datos = JSON.parse(xhttp.responseText);
  for (let i = 0; i < datos.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", datos[i].id);
    var texto = document.createTextNode(datos[i].provincia);
    option.appendChild(texto);
    document.getElementById("id_provincia").appendChild(option);
  }

  // En caso de que la comunidad sea uniprovincial se cargan directamente los municipios
  if (document.getElementById("id_provincia").length == 1) {
    fprovincia();
  }
}

function eliminar_provincias() {
  let provincias = document.getElementById("id_provincia");
  provincias.innerHTML = '';
}

//
//  ZONA MUNICIPIO
//

// Cargar los municipios de la BBDD
function fprovincia() {

  // Cuando cambia la provincia, cargar municipios
  let municipios = "php/getMunicipios.php";
  let provSelect = document.getElementById(`id_provincia`).value; // obtengo el id de la provincia


  // Pido la lista de municipios al sv PHP (async)
  loadDoc(municipios, provSelect, mostrar_municipios);


}


function mostrar_municipios(xhttp) {

  // Elimino los posibles municipios cargados anteriormente
  eliminar_municipios();

  var datos = JSON.parse(xhttp.responseText);
  for (let i = 0; i < datos.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", datos[i].id);
    var texto = document.createTextNode(datos[i].municipio);
    option.appendChild(texto);
    document.getElementById("id_municipio").appendChild(option);
  }

  // En caso de que sólo haya un municipio (Ceuta y Melilla), se carga el resultado directamente
  if (document.getElementById("id_municipio").length == 1) {
    fmunicipio();
  }
}

function eliminar_municipios() {
  let provincias = document.getElementById("id_municipio");
  provincias.innerHTML = '';
}


//
//  ZONA RESULTADO
//

// Función para escribir los valores del municipio en el HTML
function fmunicipio() {

  // Cuando cambia la provincia, cargar municipios
  let municipios = "php/getDatosMunicipio.php";
  let provSelect = document.getElementById(`id_municipio`).value; // obtengo el id del municipio


  // Pido los datos del municipio al sv (async)
  loadDoc(municipios, provSelect, mostrar_resultado);

}

function mostrar_resultado(xhttp) {



  let datos = JSON.parse(xhttp.responseText);

  document.getElementById('id_resultado').style.display = "contents";

  document.getElementById('id_nombreMun').innerText = datos[0].municipio;
  document.getElementById('id_idMun').innerText = datos[0].id;
  document.getElementById('id_latMun').innerText = datos[0].latitud;
  document.getElementById('id_lonMun').innerText = datos[0].longitud;



}

function elimiar_resultado() {

}


//
// Ejercicio 7
// 

// Inicio la función ejercicio7 cuando esté cargado el DOM
document.addEventListener("DOMContentLoaded", cadena);

// Esta función construye la cadena que se le envía al servidor
function cadena() {
  let string = '';
  document.addEventListener('keydown', (event) => {

    // Voy a enviarle la petición al siguiente script del sv:
    let url = "php/getMunicipios2.php"

    // Creo un srting para enviarle al sv como consulta:
    if ((event.key != 'Backspace'  && event.keyCode >=65 && event.keyCode <=90) || event.keyCode === 32 ) {

      string = string + event.key;
      loadDocEj7(url, string, mostrar);
    } if (event.key == 'Backspace'){
      string = string.slice(0,-1);
      loadDocEj7(url, string, mostrar);
    }

    function mostrar(xhttp) {

      eliminar_opciones();

      
      // Recojo los datos del sv y los muestro en la lista
      var datos = JSON.parse(xhttp.responseText);
      datos = JSON.parse(datos);
      
      for (let i = 0; i < datos.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", datos[i].id);
        var texto = document.createTextNode(datos[i].municipio);
        option.appendChild(texto);
        document.getElementById("results").appendChild(option);
      }

    }

  });

}

function eliminar_opciones() {

  let opciones = document.getElementById("results");
  opciones.innerHTML = '';

}
