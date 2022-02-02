let ajax, ajax2;
let getBatman = new Promise((resolve, reject) => {

    ajax2 = new XMLHttpRequest();
    ajax2.open('GET', 'http://api.tvmaze.com/search/shows?q=batman');
    ajax2.addEventListener('load', () => {
        console.log('Recuperados datos de Batman, objeto promesa creado');
        resolve(ajax2.responseText);
    });
    ajax2.send();
})

let getSpiderman = new Promise((resolve, reject) => {

    ajax = new XMLHttpRequest();
    ajax.open('GET', 'http://api.tvmaze.com/search/shows?q=spiderman');
    ajax.addEventListener('load', () => {
        console.log('Recuperados datos de Spiderman, objeto promesa creado');
        resolve(getBatman); // Esto va a ser Batman en el parámetro de abajo
    });
    ajax.send();
})

getSpiderman
    .then((Batman) => {
        console.log('Resuelta Spiderman: ', ajax.responseText);
        return (Batman);
    })
    .then((datos) => {
        console.log('----------------------------------------------');
        console.log('Resuelta Batman: ', datos);
    })
    .catch((error) => {
        console.log('Error: ', data);
    });