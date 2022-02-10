// Desscuento 10% (primero)
// IVA 10% (segundo)

let precio = 100;
let descuento = 0.1;
let IVA = 0.21;

let promesaDescuento = new Promise((resolve, reject) => {
    let totaldescuento = precio * descuento;
    resolve(totaldescuento);
});

let promesaIVA = new Promise((resolve, reject) => {
    let totalIVA = precio * IVA;
    resolve(totalIVA);
})

let promesaTotal = new Promise((resolve, reject) => {
    precioDescontado = precio - (precio * descuento);
    resolve((precioDescontado * IVA) + precioDescontado);
})


promesaDescuento
    .then((totaldescuento) => {

        console.log('El descuento es: ', totaldescuento);
        return (promesaIVA);
    })
    .then((totalIVA) => {
        
        console.log('El IVA es: ', totalIVA);
        return (promesaTotal);
    })
    .then((total) => {

        console.log('El precio total es: ', total);
    })

