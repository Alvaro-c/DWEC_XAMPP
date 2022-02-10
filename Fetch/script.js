let peticion; 
let urlBatman = 'http://api.tvmaze.com/search/shows?q=batman';
let urlSpiderman = 'http://api.tvmaze.com/search/shows?q=spiderman';
let promesa1;

// sintaxis de fetch: url, metodo
// Devuelve un objeto de tipo promesa

// Devolverá una promesa conectandose al sv
promesa1 = fetch(urlSpiderman)
.then((spidermanProm) =>{
    console.log('Estado Promesa Spiderman:' , spidermanProm.status); 
    return spidermanProm.json(); // Aún no se puede acceder a la promesa, saldría como pending
})
.then((resulSpider)  => {
    console.log('Spiderman: ', resulSpider);
    return fetch(urlBatman);
})
.then((batmanProm) => {

    return batmanProm.json();
})
.then((resulBatman) => {

    console.log('Batman: ', resulBatman);
})
.catch((error) => {

    console.log(error);
})