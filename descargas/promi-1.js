let importe=1000;
let porce=1.21;
let descu=10;
//ASINCRONISMO CON PROMESAS

const i=new Promise((resolve, reject)=>{ //Lo ejecuta el servidor2
    let n1=aleatorio(1000,10000);
    console.log("Tiempo para calcular el IVA:",n1);
    setTimeout(()=>{
        console.log('procesando el iva');
        resolve();
    },n1);
})

const d=new Promise((resolve, reject)=>{   //La ejecuta el servidor1
    let n1=aleatorio(1000,10000);
    console.log("Tiempo para calcular el descuento",n1);
    console.log('procesando el descuento');
    setTimeout(()=>{
        console.log("dto calculado");
        resolve(i);
    },n1);
})



function aleatorio(minimo,maximo){
    return Math.floor(Math.random() * ((maximo+1)-minimo)+minimo);
}

d
.then(res=>{
    dto=importe*descu/100;
        
        console.log("Descuento=",dto);
        importe=importe-dto;
    return(res);
})
.then(ivacalculado=>{
    let iva=importe*porce/100;
        
        console.log("IVA=",iva);
    let final=importe+iva;
    console.log("Precio final:",final);

})
.catch(error=>{
    console.error(error);
});



