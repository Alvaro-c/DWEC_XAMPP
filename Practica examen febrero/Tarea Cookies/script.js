let nombre, color, boton, colorCookie, nombreCookie;

window.addEventListener('DOMContentLoaded', () => {

    nombre = document.querySelector('#nombre');
    color = document.querySelector('#color');
    boton = document.querySelector('#aceptar');
    nombreShown = document.querySelector('#nombreShown');

    leerCookie();

    boton.addEventListener('click', setCookie);

});


function setCookie() {

    document.cookie = `color=${color.value}`;
    document.cookie = `nombre=${nombre.value}`;

}

function leerCookie() {

    let cookies = document.cookie;

    if (cookies != '') {

        cookies = cookies.split(';');
        colorCookie = cookies[0].split('=')[1];
        nombreCookie = cookies[1].split('=')[1];

        aplicarCookie();

    }
}

function aplicarCookie() {

    nombreShown.innerText = nombreCookie;

    if (colorCookie == 'Amarillo') document.body.style.backgroundColor = 'yellow';
    if (colorCookie == 'Negro') document.body.style.backgroundColor = 'black';
    if (colorCookie == 'Azul') document.body.style.backgroundColor = 'blue';
    if (colorCookie == 'Rojo') document.body.style.backgroundColor = 'red';
    if (colorCookie == 'Verde') document.body.style.backgroundColor = 'green';

    color.value = colorCookie;

}