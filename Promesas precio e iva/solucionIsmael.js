// Desscuento 10% (primero)
// IVA 10% (segundo)

let importe = 1000;
let porce = 21;
let descu = 10;

let i = new Promise((resolve, reject) => {

    let n1 = aleatorio(1000, 10000);
    console.log('Tiempo para calcular el IVA', n1);
    setTimeout(() => {
        console.log('procesando el IVA');
        resolve();
    }, n1);
})

let d = new Promise((resolve, reject) => {

    let n1 = aleatorio(1000, 10000);
    console.log('Tiempo para calcular el descuento', n1);
    setTimeout(() => {
        console.log('descuento calculado');
        resolve(i);
    }, n1);
})


function aleatorio(min, max) {

    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

d
    .then((res) => {
        dto = importe * descu / 100;
        console.log('Descuento = ', dto);
        importe = importe - dto;
        return(res);

    })
    .then((ivacalculado) => {
        let iva = importe * porce/100;

        console.log('IVA= ', iva);
        let final = importe + iva;
        console.log('Precio final: ', final)

    })
    .catch((error) => {

        console.log(error);

    });