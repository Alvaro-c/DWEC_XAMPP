let usersURL = 'https://jsonplaceholder.typicode.com/users';
let albumsURL = 'https://jsonplaceholder.typicode.com/albums';
let photosURL = 'https://jsonplaceholder.typicode.com/photos';

window.addEventListener('DOMContentLoaded', inicio);
window.addEventListener('change', inicio);



function inicio() {

    fetch(usersURL)
        .then((userProm) => {
            // Paso los datos de la promesa hecho JSON
            return userProm.json();
        })
        .then((users) => {
            // Paso a la función el JSON con los datos para crear el select
            selectArtistas(users);
            let id = document.getElementById('artistas').value;
            return fetch(`${albumsURL}?userId=${id}`);
        })
        .then((albumsProm) => {
            // Recojo la promesa, parse a JSON, envío a siguiente then
            return albumsProm.json();
        })
        .then((albums) => {
            // Con los datos, creo la tabla de albumes
            tablaAlbums(albums);
            // Envío petición para las imagenes
            return fetch(photosURL);
        })
        .then((photosProm) => {
            // Recojo la promesa, parse a JSON, envío a siguiente then
            return photosProm.json();
        })
        .then((photos) => {
            // Con las fotos, completo la tabla
            loadPhotos(photos);
        })
        .catch((error) => {
            console.log(error);
        })



}



// función que crea el select
function selectArtistas(datos) {

    let artistas = document.getElementById('artistas');

    for (let i = 0; i < datos.length; i++) {
        let option = document.createElement('option');
        option.value = datos[i].id;
        option.innerText = datos[i].name;
        artistas.appendChild(option);

    }

}

function tablaAlbums(datos) {

    // Creo la tabla
    let tabla = document.getElementById('tabla');
    tabla.innerHTML = '';

    // Creo la fila de header
    let tr = document.createElement('tr');
    tabla.appendChild(tr);

    if (datos.length != 0) {

        // Los elementos del header
        let id = document.createElement('td');
        id.innerText = 'ID';
        let title = document.createElement('td');
        title.innerText = 'Album';
        let portada = document.createElement('td');
        portada.innerText = 'Portada';
        tr.append(id, title, portada);
    }


    for (let i = 0; i < datos.length; i++) {


        let tr = document.createElement('tr');
        tabla.appendChild(tr);

        // Los elementos del header
        let id = document.createElement('td');
        id.innerText = datos[i].id;
        let title = document.createElement('td');
        title.innerText = datos[i].title;
        let portada = document.createElement('td');
        portada.setAttribute('id', `album${datos[i].id}`);
        tr.append(id, title, portada);


    }

}

function loadPhotos(datos) {


    let inicio = document.querySelector(`#tabla > tr:nth-child(2) > td:nth-child(1)`).innerText;

    for (let i = inicio; i < inicio + datos.length; i++) {
        let album = document.getElementById(`album${i}`);
        let img = document.createElement('img');
        album.appendChild(img);
        img.setAttribute('src', datos[i].thumbnailUrl);
    }


}