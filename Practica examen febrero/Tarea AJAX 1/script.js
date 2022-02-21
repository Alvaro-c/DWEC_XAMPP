let select, input, resultado, color, enviar;

window.addEventListener('DOMContentLoaded', () => {

    /* Cookies y colores */
    select = document.querySelector('#color');
    select.addEventListener('change', setCookie);
    getColorCookie();


    /*Petición AJAX al sv */

    enviar = document.getElementById('enviar');
    enviar.addEventListener('click', peticion);


});


function setCookie() {
    document.cookie = `color=${select.value}`;
    getColorCookie();


}

function getColorCookie() {
    cookie = document.cookie;
    color = cookie.split('=')[1];
    setColor(color);

}

function setColor(color) {
    document.body.style.backgroundColor = color;
    select.value = color;
}

function peticion() {

    let serie = document.getElementById('serie').value;

    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', `${serie}.json`);
    xhttp.addEventListener('load', () => {

        if (xhttp.status != 200) {

            let tabla = document.getElementById('tabla');
            tabla.innerHTML = '';
            return
        }

        let respuesta = JSON.parse(xhttp.response);

        cargarTabla(respuesta);

    })

    xhttp.send();
}

function cargarTabla(serie) {


    let resultados = document.querySelector('.resultados');
    resultados.innerText = `Número de resultados: ${serie.cast.length}`;

    let tabla = document.getElementById('tabla');
    tabla.innerHTML = '';



    for (let i = 0; i < serie.cast.length; i++) {

        let row = document.createElement('tr');
        tabla.appendChild(row);

        let character = document.createElement('td');
        character.innerText = serie.cast[i].character;
        let name = document.createElement('td');
        name.innerText = serie.cast[i].name;
        let imageTd = document.createElement('td');
        let image = document.createElement('img');
        image.setAttribute('src', `img/${serie.cast[i].image}`);
        imageTd.appendChild(image);


        row.appendChild(character);
        row.appendChild(name);
        row.appendChild(imageTd);


    }




}