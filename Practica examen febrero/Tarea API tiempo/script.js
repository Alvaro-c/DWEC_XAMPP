let url = 'http://api.openweathermap.org/data/2.5/weather?q={city name}&appid=21952126e4846e46b748b940e0821728';
window.addEventListener('DOMContentLoaded', main);


function main() {

    let searchBox = document.querySelector('.input').value;
    let button = document.querySelector('.button');
    button.addEventListener('click', search);


}

function search() {

    let query = document.querySelector('.input').value;


    fetch(url.replace('{city name}', query))
        .then((promise) => {

            return promise.json();

        })
        .then((weather) => {

            showResult(weather);
        })
        .catch((error) => {
            console.log(error);
        })

}

function showResult(data) {

    document.querySelector('.ciudad').innerText = data.name;
    document.querySelector('.temp').innerText = `Temperatura: ${(data.main.temp - 273.15).toFixed(2)} ºC`;
    document.querySelector('.max').innerText = `Mínima: ${(data.main.temp_max - 273.15).toFixed(2)} ºC`;
    document.querySelector('.min').innerText = `Máxima: ${(data.main.temp_min - 273.15).toFixed(2)} ºC`;

}