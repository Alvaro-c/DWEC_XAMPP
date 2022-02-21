const urlPost = "https://jsonplaceholder.typicode.com/posts";
const urlComentarios="https://jsonplaceholder.typicode.com/comments";
let xmlhttppost;
let xmlhttpcoments;
let promesa1=new Promise((resolve, reject)=>{
    xmlhttppost=new XMLHttpRequest();
    xmlhttppost.open("GET",urlPost);
    xmlhttppost.addEventListener("load",()=>{
        let post=JSON.parse(xmlhttppost.responseText);
        console.log("post:",post);
        const elegido=post.filter(post=>post.userId==1 && post.id==3);
        resolve(elegido);
    });
    xmlhttppost.send();
})
let promesa2=new Promise((resolve, reject)=>{
    xmlhttpcoments=new XMLHttpRequest();
    xmlhttpcoments.open("GET",urlComentarios);
    xmlhttpcoments.addEventListener("load",()=>{
        let coments=JSON.parse(xmlhttpcoments.responseText);
        const elegido=coments.filter(coments=>coments.postId==3);
        resolve(elegido);
    });
    xmlhttpcoments.send();
})
promesa1
.then((post)=>{
    console.log(post);
    return(promesa2);
})
.then((coments)=>{
    console.log(coments);
})
.catch((error)=>{
    console.log(error);
})

/*
let postId=3;
const ajaxPost=new XMLHttpRequest();
ajaxPost.open("GET",urlPost);
ajaxPost.addEventListener("load",()=>{
    const posts=JSON.parse(ajaxPost.responseText);
    const elegido=posts.filter(post=>post.userId==1 && post.id==3);
    console.log("Primera petición:",elegido);

        const ajaxComentarios = new XMLHttpRequest(); //Obtener los comentarios del post 5 del usuario 1
        ajaxComentarios.open("GET", urlComentarios + "?postId=" + postId);
        ajaxComentarios.addEventListener("load",()=>{
        const comentarios=JSON.parse(ajaxComentarios.responseText);
        console.log("Segunda petición:", comentarios);
        });
       ajaxComentarios.send();
})
ajaxPost.send();
*/
