console.log('Promesas');

const mipromesa1 = new Promise((resolve, reject) => {

    console.log('mipromesa1 creada');
    setTimeout(() => {
        let bien = 's';

        if (bien == 's') {
            resolve(mipromesa2());
        } else {
            reject('No ha salido bien la promesa');
        }
    }, 3000);


});

function mipromesa2() {

    return new Promise((resolve, reject) => {

        console.log('mipromesa2 creada');
        setTimeout(() => {
            let bien = 's';

            if (bien == 's') {
                resolve('La promesa 2 se ha resuelto');
            } else {
                reject('No ha salido bien la promesa 2');
            }
        }, 8000);
    });

}

console.log('El hilo único sigue en ejecución');


mipromesa1
.then( (promesa2) => {

    console.log('resuelta promesa 1');
    console.log(promesa2);
    return (promesa2);
})
.then((mensaje) => {

    console.log(mensaje);
})
.catch(()=> {
    console.log('No se ha podido resolver una de las promesas')
})