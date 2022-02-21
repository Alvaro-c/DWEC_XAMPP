document.addEventListener("DOMContentLoaded", iniciar, false);

function iniciar() {
  document.getElementById("id_boton").addEventListener("click", buscar);
}

function buscar() {
  var dni = document.getElementById("id_dni").value;
  var pag = "ajax6.php?dni=" + dni;  //Aquí pasaremos el valor a buscar
  const getdatos=new Promise((resolve, reject)=>{
      const ajax=new XMLHttpRequest();
      ajax.open("GET",pag);
      ajax.addEventListener("load",()=>{
          if(ajax.status!==200){
              reject(ajax.status);
              return;
          }
          resolve(ajax);
      });
      ajax.send();
  });
  getdatos
  .then((xhttp)=>{
      let resultado=document.getElementById("id_resultado");
      let datos=JSON.parse(xhttp.responseText);
      let salida="Apellido:"+datos.apellido+"<br>";
      salida=salida+"Nombre:"+datos.nombre+"<br>";
      salida=salida+"Dirección:"+datos.direccion+"<br>";
      resultado.innerHTML="<BR>"+salida;
  })
  .catch(error=>{
      console.log("EEEERRRRORRRR");
  })

}

