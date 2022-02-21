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

const getUsuarios = new Promise((resolve, reject)=>{
  let ajax = new XMLHttpRequest();
  ajax.open("GET","https://jsonplaceholder.typicode.com/users");
  ajax.addEventListener("load",()=>{
    resolve(ajax.responseText);
  });
  ajax.addEventListener("error",(e)=>{
    reject(e);
  });
  ajax.send();
});

getUsuarios
.then((data)=>{
  console.log("Promesa",data);
})
.catch((data)=>{
  console.error("Error",data);
});
*/
//////////////////////////// Fetch. API nativa para hacer request mas sencillos
console.log ("ahora con fetch");
fetch("https://jsonplaceholder.typicode.com/users") //por defecto método GET
.then((response)=>{
  console.log("fetch",response.status);
  return response.json(); //Devuelve una promesa con los valores en JSON
})
.then(usuarios=>{
  console.log(usuarios);
  return fetch("https://jsonplaceholder.typicode.com/posts?userId="+usuarios[0].id); //Este fetch devolverá una promesa con los post del primer usuario
})
.then(response=>{  //obtiene la promesa anterior con los post del primer usuario.
  return response.json(); //devuelve una nueva promesa con los datos en formato json
})
.then(posts=>{
  return fetch("https://jsonplaceholder.typicode.com/comments?postId="+posts[0].id); //Este fech devolverá una promesa con los comentarios del primer post del primer usuario.
})
.then(response=>{
  return response.json();
})
.then(comments=>{
  console.log("Finalmente", comments);
})
.catch(error=>{
  console.error("ERROR!", error);
});
