// Guardo en una variable el botón y le añado un evento cuando el DOM ha cargado
// Guardadas en variables el resto de zonas donde escribir
let ciudad, temp, max, min;
window.addEventListener('DOMContentLoaded', () => {
    let button = document.querySelector('.button');
    button.addEventListener('click', buscar);
    ciudad = document.querySelector('.ciudad');
    temp = document.querySelector('.temp');
    max = document.querySelector('.max');
    min = document.querySelector('.min');
});



// La función se lanza cuando se hace click en consultar
// Esta función hace un fetch a la api con la ciudad seleccionada
function buscar() {

    let city = document.querySelector('.input').value;
    let APIKey = '21952126e4846e46b748b940e0821728';

    // Se comprueba si la ciudad no se ha dejado en blanco
    if (city != '') {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

        // Si la ciudad se ha escrito, se envía la petición a la API
        fetch(url)
            .then((resultadoP) => {

                return resultadoP.json();
            })
            .then((resultado) => {
                
                // Si el código es 200, la ciudad se ha encontrado y se muestra el resultado
                if (resultado.cod == 200) {

                    mostrarResultado(resultado);

                } else {

                    // Si la ciudad no se ha encontrado, se avisa
                    document.querySelector('.ciudad').innerHTML = `Ciudad no encontrada`;
                    temp.innerText = ``;
                    max.innerText = ``;
                    min.innerText = ``;

                }

            })
            .catch((error) => {
                console.log(error);
            });

    } else {

        // Si la ciudad se ha dejado vacía, se avisa
        document.querySelector('.ciudad').innerHTML = `Introduce una ciudad`;
        temp.innerText = ``;
        max.innerText = ``;
        min.innerText = ``;

    }


}

// Función para mostrar el resultado
function mostrarResultado(resultado) {

    ciudad.innerText = `El tiempo en: ${resultado.name}`;
    temp.innerText = `Temperatura: ${(resultado.main.temp - 273.15).toFixed(2)} ºC`;
    max.innerText = `Máxima: ${(resultado.main.temp_max - 273.15).toFixed(2)} ºC`;
    min.innerText = `Mínima: ${(resultado.main.temp_min - 273.15).toFixed(2)} ºC`;


}