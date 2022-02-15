// Espero a que cargue el DOM para iniciar el script
document.addEventListener('DOMContentLoaded', start);
id('users').addEventListener('change', start);


// URLs
let usersURL = 'https://jsonplaceholder.typicode.com/users';
let albumsURL = 'https://jsonplaceholder.typicode.com/albums';
let photosURL = 'https://jsonplaceholder.typicode.com/photos';

// Función auxiliar para seleccionar elementos por id
function id(i) {
    return document.getElementById(i);
}

//Script principal
function start() {

    // Elementos del DOM a seleccionar
    let select = id('users');

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
            createTable(albums);
            return fetch(photosURL);
        })
        .then((photosP) => {
            return photosP.json();
        })
        .then((photos) => {
            console.log(photos);
            loadPhotos(photos);
        })

}

function createSelect(users) {

    let select = id('users');

    for (let i = 0; i < users.length; i++) {

        let option = document.createElement('option');
        option.setAttribute("value", `${users[i].id}`);
        var texto = document.createTextNode(`${users[i].id} - ${users[i].name}`);
        option.appendChild(texto);
        select.appendChild(option);

    }

}

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


        let thumbnail = document.createElement('td');
        thumbnail.setAttribute("id", `album${albums[i].id}`);
        tr.appendChild(thumbnail);

        tabla.appendChild(tr);

    }



}

function loadPhotos(photos) {
    

    for (let i = 0; i < photos.length; i++) {

        let td = id(`album${i+1}`);
        let img = document.createElement('img');
        img.setAttribute("src", `${photos[i].thumbnailUrl}`);
        td.appendChild(img);

    }

}