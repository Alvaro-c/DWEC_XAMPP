
let urlPost = 'https://jsonplaceholder.typicode.com/posts'; // Esta url tiene post de usuarios
let urlComments = 'https://jsonplaceholder.typicode.com/comments'; // Esta url tiene comentarios a los posts
let postId = 1;


// Las peticiónes se envían de manera paraleta. Pepende del server, responderá primero a una petición o a otra
/*
let ajaxPost = new XMLHttpRequest();
ajaxPost.open('GET', urlPost);
ajaxPost.addEventListener('load', () => {

    let posts = JSON.parse(ajaxPost.responseText);
    let elegido = posts.filter(post => post.userId == 1 && post.id == postId);
    console.log("Primera petición", elegido);

});
ajaxPost.send();


let ajaxComm = new XMLHttpRequest();

ajaxComm.open('GET', urlComments);
ajaxComm.addEventListener('load', () => {

    let comments = JSON.parse(ajaxComm.responseText);
    let commelegido = comments.filter(comment => comment.postId == postId);
    console.log("Segunda petición", commelegido);

});
ajaxComm.send();
*/

// Para evitar eso, si se mete una petición dentro de otra, hasta que no se responda la primera, no se envía la segunda.
// Es decir, anidar peticiones
/*
let ajaxPost = new XMLHttpRequest();
ajaxPost.open('GET', urlPost);
ajaxPost.addEventListener('load', () => {

    let posts = JSON.parse(ajaxPost.responseText);
    let elegido = posts.filter(post => post.userId == 1 && post.id == postId);
    console.log("Primera petición", elegido);


    let ajaxComm = new XMLHttpRequest();

    ajaxComm.open('GET', urlComments);
    ajaxComm.addEventListener('load', () => {

        let comments = JSON.parse(ajaxComm.responseText);
        let commelegido = comments.filter(comment => comment.postId == postId);
        console.log("Segunda petición", commelegido);

    });
    ajaxComm.send();

});
ajaxPost.send();
*/

// Una manera mejor de hacer esto sin anidar las peticiones es con promesas: 

urlPost = 'https://jsonplaceholder.typicode.com/posts'; // Esta url tiene post de usuarios
urlComments = 'https://jsonplaceholder.typicode.com/comments'; // Esta url tiene comentarios a los posts
postId = 3;

let xhttpPost, xhttpComms;
let promesa1 = new Promise((resolve, reject) => {

    xhttpPost = new XMLHttpRequest();
    xhttpPost.open('GET', urlPost);
    xhttpPost.addEventListener('load', () => {
        let posts = JSON.parse(xhttpPost.responseText);
        let elegido = posts.filter(post => post.userId == 1 && post.id == postId);
        
        resolve(elegido);

    });
    xhttpPost.send();

});

let promesa2 = new Promise((resolve, reject) => {

    xhttpComms = new XMLHttpRequest();
    xhttpComms.open('GET', urlComments);
    xhttpComms.addEventListener('load', () => {

        let comments = JSON.parse(xhttpComms.responseText);
        let commelegido = comments.filter(comment => comment.postId == postId);
        resolve(commelegido);

    });
    xhttpComms.send();

});


promesa1
    .then((post) => {

        console.table(post);
        return (promesa2);
    })
    .then((comments) => {

        console.table(comments);
    })
    .catch((error) => {
        console.log('ERRRROOOORRR', error);
    });