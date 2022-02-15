// Las promesas permiten hacer algo asincrono comportarse como sincrono
// Soluciona el problema de los diferentes tiempos de respuestas del servidor
// Se lanza una promesa y cuando esta se cumpla, se prosigue con el código
// Las promesas se utilzan para enlazar respuestas de servidores.

// Este código es asíncrono y sigue su ejecución después del timeout, por lo que el orden es 1,3,2
let x = 10;
console.log('1. Proceso iniciado...');
setTimeout(() => {
    x = x * 3 + 2;
    console.log('2. proceso terminado...');
}), 2000;
console.log('3. el resultado es: ' + x);

// Con promesas se puede conseguir que la ejecución del programa siga el orden que queremos
// Constructor de una promesa:
let promesa = new Promise(function (resolve, reject) {
    console.log('el código correspondiente');
    console.log('');
});

// Estados (state) y resultados de las promesas: 
// pending (pendiente); fulfilled (cumplido), se ejecutan con then; rejected (rechazado) A las rejected se las ejecuta con el catch
// result: si está pendiente es undefined; si se cumple tendrá un value; si no se cumple tendremos un código de error


// Ejemplo: 
x = 10;
let promesa1 = new Promise((resolve, reject) => { // Esta función se lanza en el momento que el código llega a este punto. No es una definición de función, es una llamada.

    setTimeout(() => {
        x = x * 3 + 2;
        console.log('2. proceso terminado...');
        resolve(x); // lo que quiero pasarle al resolve, sería similar al return
    }), 20000;
});


console.log('1. Proceso iniciado...');
// Esto no se ejecuta hasta que la promesa se cumple. Está parada la ejecución durante 2 secs en la llamada a la función
promesa1.then(res =>{

    console.log('3. el resultado es: ' + x);

}).catch(error => { // En promesas encadenadas, cuando alguna no se resuelve, el carch recoje los errores de todas.
    console.error(error);
});
