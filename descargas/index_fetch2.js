//////////////////////////// Fetch. API nativa para hacer request mas sencillos
/*
Flujo básico de fetch
Fetch tiene un proceso de solicitud super sencillo de entender:

Realizas la solicitud.
Devuelve una promesa, que resuelve un objeto Response.
El objeto response es leído a través de funciones según el tipo de dato (json, blob, text, etc.).
*/
document.addEventListener("DOMContentLoaded", iniciar, false);

function iniciar() {
  document.getElementById("id_boton").addEventListener("click", buscar);
}

function buscar() {
  var dni = document.getElementById("id_dni").value;
  var pag = "ajax6.php?dni=" + dni;  //Aquí pasaremos el valor a buscar
  fetch(pag) //El método fetch devolverá una promesa
    .then((response)=>{  //Este then está esperando una promesa
      console.log("fetch:",response.status);
      return response.text(); //devuelve otra promesa con el resultado en formato texto ya que es lo que nos enviaba el php.
                              //en el caso de datos json utilizaríamos response.json()
      
    })
    .then(respuesta=>{
      console.log(respuesta);
      console.log(typeof(respuesta));
      console.log(respuesta.length);
     })
    .catch(error=>{ //este catch está esperando que alguna de las promesas anteriores no se se resuelva correctamente.
      console.error("ERROR!", error);
    });
  
}





//https://randomuser.me/api/?results=10 url para obtener datos aleatorios.