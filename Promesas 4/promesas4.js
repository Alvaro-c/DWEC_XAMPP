function mipromesa() {

    return new Promise((resolver, rechazar) => {

        console.log('Promesa creada');
        setTimeout(() => {

            let respuesta = prompt('¿Quieres que se cumpla la promesa? s/n');

            if (respuesta == 's') {
                resolver('La promesa se ha cumplido')

            } else {

                rechazar('La promesa NO se ha cumplido');
            }
        }, 3000);
    });
}

mipromesa()
    .then(respuesta => {
        console.log(respuesta, 'El valor recibido es de tipo: ', typeof (respuesta));
        return (mipromesa());
    })
    .then(respuesta2 => {
        console.log(respuesta2, 'El valor recibido es de tipo: ', typeof (respuesta2));
        return (mipromesa());
    })
    .then(respuesta3 => {
        console.log(respuesta3, typeof (respuesta3))
    })
    .catch(respuesta => {
        console.log(respuesta)
    });

console.log('JS sigue ejecutando, no espera');