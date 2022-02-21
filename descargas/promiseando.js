console.log("PROMISEANDO");
const mipromesa1=new Promise((resuelve, rechazada)=>{
    console.log("mi promesa1 ha sido creada");
    setTimeout(()=>{
        let bien="s";
        if(bien=="s"){
            resuelve(mipromesa2());
        }else{
            rechazada("No ha salido bien la promesa 1");
        }
    },4000)
});
function mipromesa2(){
    return new Promise((resolve, reject)=>{
        console.log("mi promesa2 ha sido creada");
        setTimeout(()=>{
            let bien="s";
            if(bien=="s"){
                resolve("la promesa 2 se ha resuelto");
            }else{
                reject("No ha salido bien la promesa 2");
            }
        }, 8000);
    });
};
console.log("El hilo único sigue su ejecución");
mipromesa1
.then(p2=>{
    console.log("la promesa 1 se ha resuelto");
    console.log("mipromesa1 ya ha respondido");
    console.log(p2);
    return(p2);
})
.then((mensaje)=>{
    console.log(mensaje);
})
.catch(error=>{
    console.log(error);
})