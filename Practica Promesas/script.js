// Espero a que cargue el DOM para iniciar el script
document.addEventListener('DOMContentLoaded', start);
id('users').addEventListener('change', start);


// URLs
let usersURL = 'https://jsonplaceholder.typicode.com/users';
let albumsURL = 'https://jsonplaceholder.typicode.com/albums';
let photosURL = 'https://jsonplaceholder.typicode.com/photos';

// Variables globales para formar la tabla más adelante
let firstAlbum, albumsLength;


// Función auxiliar para seleccionar elementos por id
function id(i) {
    return document.getElementById(i);
}

//Script principal
function start() {

    // Elementos del DOM a seleccionar
    let select = id('users');

    // Cadena de promesas. 1. Users; 2. Albums; 3. Portadas
    promesa = fetch(usersURL)
        .then((usersP) => {
            return usersP.json();
        })
        .then((users) => {
            createSelect(users);
            return fetch(`${albumsURL}?userId=${select.value}`);
        })
        .then((albumP) => {
            return albumP.json();
        })
        .then((albums) => {
            // Se cuentan el número de albumes para más adelante cargar las fotos. 
            // Es el límite de un bucle for
            albumsLength = albums.length;
            createTable(albums);
            return fetch(photosURL);
        })
        .then((photosP) => {
            return photosP.json();
        })
        .then((photos) => {
            
            loadPhotos(photos);
        })

}

// Función que crea el select desplegable
function createSelect(users) {

    let select = id('users');

    // El bucle for crea un select por cada valor encontrado
    for (let i = 0; i < users.length; i++) {

        let option = document.createElement('option');
        option.setAttribute("value", `${users[i].id}`);
        var texto = document.createTextNode(`${users[i].id} - ${users[i].name}`);
        option.appendChild(texto);
        select.appendChild(option);

    }

}

// Función para crear la tabla. El for crea las filas necesarias y 3 columnas por cada fila. 
function createTable(albums) {

    let tabla = id('tabla');
    tabla.innerHTML ='';
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>ID</td><td>Título</td><td>Thumbnails</td>`;
    tabla.appendChild(tr);

    for (let i = 0; i < albums.length; i++) {
        let tr = document.createElement('tr');

        let id = document.createElement('td');
        id.innerText = albums[i].id;
        tr.appendChild(id);

        let title = document.createElement('td');
        title.innerText = albums[i].title;
        tr.appendChild(title);

        // Asigna un id correspondiente al album en la columna de la imagen
        // Después con ese id se inserta la imagen correspondiente
        let thumbnail = document.createElement('td');
        thumbnail.setAttribute("id", `album${albums[i].id}`);
        tr.appendChild(thumbnail);

        tabla.appendChild(tr);

    }



}

function loadPhotos(photos) {

    // Selección del texto del primer ID en la tabla
    let start = document.querySelector('#tabla > tr:nth-child(2) > td:nth-child(1)').innerText;
    start = parseInt(start);
    // Ese id es donde se van a empezar a insertar imágenes. Se suma la cantidad de albumes para el for
    albumsLength = start + albumsLength;
    
    // El for va desde el primer id (primera celda de la tabla) hasta el número de albumes que tenga ese artista
    for (let i = start-1; i < albumsLength-1; i++) {
        
        let td = id(`album${i+1}`);
        let img = document.createElement('img');
        img.setAttribute("src", `${photos[i].thumbnailUrl}`);
        td.appendChild(img);

    }

}