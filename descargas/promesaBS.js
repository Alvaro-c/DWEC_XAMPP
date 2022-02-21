/*
  Una promesa es un objeto con 3 posibles estados:
  - pendiente
  - resuelta
  - rechazada

  Y tiene la particularidad de que se puede "encadenar"

  Es ideal para que nuestro código asincrono quede legible y mantenible
*/

////////////////////////////////// Constructor de Promesas.
/*
Permite transformar cualquier funcion basada en callbacks a promesas!

*/
/*
let ajax, ajax2;
const getBatman = new Promise((resolve, reject)=>{
  ajax2 = new XMLHttpRequest();
  ajax2.open("GET","http://api.tvmaze.com/search/shows?q=batman");
  console.log("open de la promesa Batman");
  ajax2.addEventListener("load",()=>{
    console.log("Resolvemos la promesa Batman");
    resolve(ajax2.responseText);

  });
  ajax2.addEventListener("error",(e)=>{
    reject(e);
  });
  ajax2.send();
});
const getSpiderman = new Promise((resolve, reject)=>{
  ajax = new XMLHttpRequest();
  ajax.open("GET","http://api.tvmaze.com/search/shows?q=spiderman");
  console.log("open de la promesa Spiderman");
  ajax.addEventListener("load",()=>{
    console.log("Resolvemos la promesa Spiderman");
    resolve(getBatman); //devolvemos la promesa getBatman
  });
  ajax.addEventListener("error",(e)=>{
    reject(e);
  });
  ajax.send();
});
getSpiderman
.then((Batman)=>{ //recibe la promesa batman, 
  console.log("Promesa Spiderman:",ajax.responseText);
  return(Batman); //Retornamos el resultado de la promesa Batman
})
.then((datos)=>{
  console.log("-----------------------------------------------------------");
  console.log("Promesa Batman:", datos);
})
.catch((data)=>{
  console.error("Error",data);
});
*/
fetch("http://api.tvmaze.com/search/shows?q=spiderman")
.then((promesaspiderman)=>{
  console.log("Estado Spiderman:",promesaspiderman.status);
  return promesaspiderman.json();
})
.then(resultadospider=>{
  console.log("Spiderman:",resultadospider);
  console.log(resultadospider[0].score);
  return(fetch("http://api.tvmaze.com/search/shows?q=batman"));
})
.then(promesabatman=>{
  console.log("Estado Batman:",promesabatman.status);
  return(promesabatman.json());
})
.then(resultadobatman=>{
  console.log("Batman:",resultadobatman);
})
.catch(error=>{
  console.log("Error:",error);
})