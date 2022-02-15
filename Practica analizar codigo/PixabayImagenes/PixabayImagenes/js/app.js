//pixabay.com/api/docs/

// target del div que va a mostrar el resultado y las pags
const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');

let paginaActual = 1;
let totalPaginas;
let iteradorSiguiente;

// WORKFLOW: valdiarFormulario() -> buscarImagenes()-> mostrarImagenes()

// Cuando carga la pag se cargan form y pags en 2 variables
window.onload = () => {
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarFormulario);
    paginacionDiv.addEventListener('click', direccionPaginacion);
};

// Función que comprueba que el input del form no esté vacío
function validarFormulario(e) {
    // Se cancela el submit
    e.preventDefault();

    // eesta var tiene lo que se ha buscado
    const terminoBusqueda = document.querySelector('#termino').value;

    // Si está vacía se muestra un error. Sino se llama a la siguiente función
    if(terminoBusqueda === '') {
        // mensaje de error
        mostrarAlerta('Agrega un término de búsqueda');
        return;
    }

    buscarImagenes();
}


// Muestra una alerta de error o correcto
function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    // Si no está la alerta creada
    if(!alerta) {
        // Se crea un párrafo y se añaden clases (estilos)
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded",  "max-w-lg", "mx-auto", "mt-6", "text-center" );
    
        // Se escribe la alerta
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
        // Se añade la alerta al form
        formulario.appendChild(alerta);
    
        // Después de 3 segundos, se quita el elemento que era la alerta
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}


// Busca las imagenes en una API
// Esta función se llama desde validar formulario
function buscarImagenes() {
    const terminoBusqueda = document.querySelector('#termino').value;

    const key = '25706702-cfbdb3d91a6b0935d76984172'; //'1732750-d45b5378879d1e877cd1d35a6';
    // Parametros de la api: 
    // Key (del usuario registrado)
    // Término de búsqueda
    // Número de resultados por página
    // En qué página se empieza a mostrar
    const url = `https://pixabay.com/api/?key=${key}&q=${terminoBusqueda}&per_page=30&page=${paginaActual}`;

    // Promesa
    // 1. Abre la url
    // 2. Obtiene un JSON con la información
    // 3. Calcula las páginas que va a mostrar
    // 4. muestra las imagenes
    fetch(url) 
        .then(respuesta => respuesta.json())
        .then( resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);

             console.log(totalPaginas);

            mostrarImagenes(resultado.hits, totalPaginas);
        });


}

function mostrarImagenes(imagenes, paginas ) {
    // Si hay un elemento dentro de resultado (una imagen) la elimina hasta que no quede ninguna
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    // For each para cada imagen del JSON recogido en el fetch
    imagenes.forEach( imagen => {

        // Parametros que tiene el JSON con info de las imagenes
        const { likes, views, previewURL, largeImageURL } = imagen;

        // Se añade este texto al innerHTML de resultado
        // Cada iteración es una nueva tarjeta con una nueva imagen y su información
        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
                <div class="bg-white ">
                    <img class="w-full" src=${previewURL} alt={tags} />
                    <div class="p-4">
                        <p class="card-text">${likes} Me Gusta</p>
                        <p class="card-text">${views} Vistas </p>
        
                        <a href=${largeImageURL} 
                        rel="noopener noreferrer" 
                        target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                    </div>
                </div>
            </div>
            `;
    });

    mostrarPaginacion(paginas);

 
}


function mostrarPaginacion(totalPaginas) {

    if(iteradorSiguiente) {
        paginacionDiv.innerHTML = '';
    }

    // recorrer el iterador
    iteradorSiguiente = crearPaginacion(totalPaginas);
    while( true ) {
        const { value, done } = iteradorSiguiente.next();

        // Sale del bucle while si done es true
        if(done) return;

        // Crear botón de sig
        const botonSiguiente = document.createElement('a');
        botonSiguiente.href = "#";
        botonSiguiente.dataset.pagina = value;
        botonSiguiente.textContent = value;
        botonSiguiente.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'mx-auto', 'mb-10', 'font-bold', 'uppercase', 'rounded');
        paginacionDiv.appendChild(botonSiguiente);
    }
}

function calcularPaginas(total) {
    return parseInt( Math.ceil( total / 30 ));
}


// Crear el generador
// *??
function *crearPaginacion(total) {
    console.log(total);
    for( let i = 1; i <= total; i++) {
        yield i; // ??
    }
}

function direccionPaginacion(e) {
    if(e.target.classList.contains('siguiente')) {

        paginaActual= Number( e.target.dataset.pagina);
        buscarImagenes();
        formulario.scrollIntoView();
    }
}