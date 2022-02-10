// Desscuento 10% (primero)
// IVA 10% (segundo)

let precio = 100;
let porce =1.21;
let descuento = 10;

let promesaDescuento = new Promise((resolve, reject) => {
    let totaldescuento = precio - precio * descuento;

    resolve(piva(totaldescuento));

});


function piva(valor) {
    return (new Promise((resolve, reject) => {
        valor = valor * precio;
        resolve(valor);
    }));
}

promesaDescuento
.then((desc) => {
    return (desc);

})
.then((preciofinal) => {

console.log('Precio total: ', preciofinal);
})


