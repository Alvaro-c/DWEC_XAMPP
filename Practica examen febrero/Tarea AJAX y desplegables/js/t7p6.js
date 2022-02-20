document.addEventListener("DOMContentLoaded", iniciar, false);

function iniciar() {

    document.getElementById("id_ccaa").addEventListener("change", fccaa);
    document.getElementById("id_provincia").addEventListener("change", fprovincia);
    document.getElementById("id_municipio").addEventListener("change", fmunicipio);

    //Cargamos el select de comunidades autónomas
    var pag = "php/getCcaa.php";
    datos = "nocache=" + Math.random();
    loadDoc(pag, datos, mostrar_ccaa);

}



/* Va a pedir los datos de las provincias de la CCAA*/
function fccaa() {
    let pag = "php/getProvincias.php";
    datos = `ccaa_id=${document.getElementById("id_ccaa").value}`;
    loadDoc(pag, datos, mostrar_provincias);


}


/* Pide los datos de los municipios*/
function fprovincia() {

    let pag = "php/getMunicipios.php";
    datos = `provincia_id=${document.getElementById("id_provincia").value}`;
    loadDoc(pag, datos, mostrar_municipios);

}

/* Muestra los datos del municipio */

function fmunicipio() {

    let pag = "php/getDatosMunicipio.php";
    datos = `municipio_id=${document.getElementById("id_municipio").value}`;
    loadDoc(pag, datos, mostrar_datos_municipios);


}

/* Carga select de ccaa*/
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

/* Carga select de provincias*/
function mostrar_provincias(xhttp) {

    let datos = JSON.parse(xhttp.responseText);

    for (let i = 0; i < datos.length; i++) {

        let option = document.createElement('option');
        option.setAttribute('value', datos[i].id);
        let texto = document.createTextNode(datos[i].provincia);
        option.appendChild(texto);
        document.getElementById('id_provincia').appendChild(option);
    }

}

/* Carga select de municipios*/
function mostrar_municipios(xhttp) {

    let datos = JSON.parse(xhttp.responseText);

    for (let i = 0; i < datos.length; i++) {

        let option = document.createElement('option');
        option.setAttribute('value', datos[i].id);
        let texto = document.createTextNode(datos[i].municipio);
        option.appendChild(texto);
        document.getElementById('id_municipio').appendChild(option);
    }

}

function mostrar_datos_municipios(xhttp) {


    let datos = JSON.parse(xhttp.responseText);
    document.getElementById('id_nombreMun').innerText = datos[0].municipio;
    document.getElementById('id_idMun').innerText = datos[0].id;
    document.getElementById('id_latMun').innerText = datos[0].latitud;
    document.getElementById('id_lonMun').innerText = datos[0].longitud;

    document.querySelector('.resultado').style.display = 'block';


}


/* Hace la petición al sv y ejecuta la función pasada por parámetro.
Le envía el JSON*/
function loadDoc(url, data, cFunction) {

    var xhttp;
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(data);

}


/* ---------- */
/* Practica 7 */
/* ---------- */



// Evento añadido a busqueda para que se ejecute cada vez que haya cambios
window.addEventListener('DOMContentLoaded', () => {

    let busqueda = document.getElementById('busqueda');
    busqueda.addEventListener('input', ej7);

});

// Llama a la función que busca muns y después pasa la función de mostrarlos 
function ej7() {
    buscarMunicipios(mostrarMunicipios);

}


// Pide al sv los municipios que empiecen con lo introducido en el input 
function buscarMunicipios(cFunction) {

    let url = "php/getTodosMunicipios.php"
    let datos = `provincia_id=${document.getElementById("busqueda").value}%`;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            cFunction(this);

        }

    }

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(datos);

}

// Muestra los municipios en el select
function mostrarMunicipios(xhttp) {

    document.getElementById('resul').innerHTML = '';

    let datos = JSON.parse(xhttp.responseText);

    for (let i = 0; i < datos.length; i++) {

        let option = document.createElement('option');
        option.setAttribute('value', datos[i].id);
        let texto = document.createTextNode(datos[i].municipio);
        option.appendChild(texto);
        document.getElementById('resul').appendChild(option);
    }


}