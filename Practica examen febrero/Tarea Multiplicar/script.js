document.addEventListener('DOMContentLoaded', () => {

    let main = document.querySelector('.main');

    let title = document.createElement('h1');
    main.style.margin = 'auto';
    title.style.textTransform = 'uppercase';
    title.innerText = ' Tabla de multiplicar';
    main.appendChild(title);

    let tabla = document.createElement('table');
    main.appendChild(tabla);

    let firstRow = document.createElement('tr');
    tabla.appendChild(firstRow);

    for (let k = -1; k < 11; k++) {

        let td = document.createElement('td');
        td.innerText = k;
        firstRow.appendChild(td);

    }

    for (let i = 0; i < 11; i++) {

        let row = document.createElement('tr');
        tabla.appendChild(row);

        let rowHead = document.createElement('td');
        rowHead.innerHTML = i;
        row.appendChild(rowHead);

        for (let j = 0; j < 11; j++) {

            let td = document.createElement('td');
            td.innerText = i * j;
            row.appendChild(td);


        }

    }











































})