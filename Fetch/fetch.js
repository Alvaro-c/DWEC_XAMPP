let promesa;
let urlUsers = 'https://jsonplaceholder.typicode.com/users'
let urlPosts = 'https://jsonplaceholder.typicode.com/posts';
let urlComms = 'https://jsonplaceholder.typicode.com/comments';


promesa = fetch(urlUsers)
    .then((usersP) => {
        return usersP.json();
    })
    .then((users) => {
        console.log(users);
        return fetch(`${urlPosts}?userId=${users[0].id}`);
    })
    .then((postsP) => {
        return postsP.json();
    })
    .then((posts) => {
        console.log(posts);
        return fetch(urlComms);
    })
    .then((commsP) => {
        return commsP.json();
    })
    .then((comms) => {

        let comment = comms.filter(comm => comm.postId == 3);
        console.log(comment);
        promesa = comment; // Para sacarlo fuera de la promesa
    })
    .catch((error) => {
        console.log(error);
    });


    setTimeout(() => {
        console.log(promesa);
    }, 5000);