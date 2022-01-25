// El script se ejecuta cuando se carga la ventana
window.addEventListener('load', inicio);

function inicio() {
    
    // Añado un event listener al select de colores en HTML, si cambia, se llama a la función que cambia el color
    let colorCookie, select, boton, datosSerie;
    select = document.getElementById('color');
    select.addEventListener('change', cambioColor);
    boton = document.getElementById("submit");
    datosSerie = boton.addEventListener('click', buscarSerie);
    

    
    // compruebo si la cookie "color existe"
    if(document.cookie.indexOf('color=') == -1){
        // Si no existe la creo con el valor del primer elemento de la lista
        colorCookie = 'Rosa';
        setColorCookie(colorCookie);

    } else {
        // Si existe, recojo el color y llamo a la función para ponerla de fondo
        colorCookie= document.cookie.split("=")[1];
        setColorCookie(colorCookie);
        // Cambio el valor del select a la cookie
        select.value = colorCookie;
    }
    
    
    // Esta función se llama cuando el valor de la lista cambia. Setea el color de fondo y fija la nueva cookie
    function cambioColor() {
        
        if (this.value == 'Rosa') {
            document.body.style.backgroundColor = 'pink';

        } else if (this.value == 'Verde') {
            document.body.style.backgroundColor = 'green';

        } else if (this.value == "Amarillo") {
            document.body.style.backgroundColor = 'yellow';
        }
        document.cookie = `color=${this.value}; max-ages=86400`;

    }

    // Esta función aplica el color que se se pasa por parámetro.
    // En otro punto del programa se pasa por parámetro el valor de la cookie
    function setColorCookie(color) {

        if (color == 'Rosa') {
            
            document.body.style.backgroundColor = 'pink';

        } else if (color == 'Verde') {
            document.body.style.backgroundColor = 'green';

        } else if (color == "Amarillo") {
            document.body.style.backgroundColor = 'yellow';
        }
        document.cookie = `color=${color}; max-ages=86400`;

    }

    function buscarSerie(){
        let xhtml = new XMLHttpRequest();

        xhtml.onreadystatechange = function(){

            if(xhtml.readyState == 4 && xhtml.status == 200) {

                datosSerie = JSON.parse(this.response);
                mostrarSerie(datosSerie);
            }

        }
        let query = document.getElementById(`serie`);

        xhtml.open(`GET`, `${query.value}.json`);
        xhtml.send();

        

        return datosSerie;

    }

    function mostrarSerie(datos){

        let tabla = document.getElementById(`mostrarSerie`);
        console.log(datos.cast);

        for (let i = 0; i < datos.cast.length; i++) {

            fila = document.createElement(`tr`);
            celdaActor = document.createElement(`td`);
            celdaActor.innerText = datos.cast[i].name;
            celdaImagen = document.createElement(`td`);
            imagen = document.createElement(`img`);
            imagen.src = `img/${datos.cast[i].image}`;
            imagen.width = 300;
            
            tabla.appendChild(fila);
            fila.appendChild(celdaActor);
            fila.appendChild(celdaImagen);
            celdaImagen.appendChild(imagen);
            
        }

    }

}