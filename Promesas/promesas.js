
// new Promise(function (resolve, reject) {

//     setTimeout(() => resolve(1), 3000);
// })
//     .then(function (result) {
//         alert(result);
//         return new Promise((resolve, reject) => {


//             setTimeout(() => resolve(result * 3), 2000);
//         })
//     })
//     .then(function (result) {
//         alert(result);
//         return new Promise((resolve, reject) => {

//             setTimeout(() => resolve(result * 2), 4000);

//         })
//     })
//     .then(function (result) {
//         alert(result);
//     })

let alumnos = [{
    codigo: 1,
    nombre: 'Pepito'
}, {
    codigo: 2,
    nombre: 'Antonito'
}];

let php = [{
    codigo: 1,
    nombre: 5
}, {
    codigo: 3,
    nombre: 9
}];


let hayalumno = codigo => {

    return new Promise((resolve, reject) => {
        console.log('Vamos a consultar el alumno ')
        if (alumnos.find(alumno => alumno.codigo == codigo)) {
            console.log('Buscando el alumno');
            setTimeout(() => {
                console.log('Existe');
                resolve(haynota(codigo));
            }, 2000);
        } else {
            reject('El alumno no existe');
        }
    });

}


let haynota = codigo => {

    return new Promise((resolve, reject) => {
        console.log('Vamos a consultar la asignatura ')
        if (php.find(nota => nota.codigo == codigo)) {
            console.log('Buscando la asignatura');
            setTimeout(() => {
                resolve('La asignatura existe');
            }, 2000);
        } else {
            setTimeout(() => {
                reject('El alumno no tiene esa asignatura');
            }, 2000);
        }
    });

}


hayalumno(2)
    .then(res => {
        return (res);
    })
    .then(mensaje => {
        console.log(mensaje);
    })
    .catch(error => {
        console.log('muerte');
    }
    );