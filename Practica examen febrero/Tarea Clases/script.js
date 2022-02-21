/* Estructura de clases */

class Animal {

    constructor(peso, color) {
        this.peso = peso;
        this.color = color;
    }

    toString() {
        return `Peso: ${this.peso}; Color: ${this.color}`;
    }
}

class Vacuna {

    constructor(fecha, nombre, dosis) {

        this.fecha = fecha;
        this.nombre = nombre;
        this.dosis = dosis;

    }

}

class Perro {

    constructor(raza, nombre, vacunas, identificador) {

        this.raza = raza;
        this.nombre = nombre;
        this.vacunas = [];
        this.identificador = identificador;


    }




}