class Persona {
    apellido;
    nombre;
    fechaNacimiento;
    estatura;
    peso;

    constructor(apellido, nombre, fechaNacimiento, estatura, peso) {

        this.apellido = apellido;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.estatura = estatura;
        this.peso = peso;
    }

    imc = function () {
        return parseFloat(this.peso) / Math.pow(this.estatura, 2);
    }

    estadoSalud = function () {

        let opcion = this.imc();

        if (opcion <= 18.5)
            return ('La Persona se encuentra Bajo de peso');
        else if (opcion > 18.5 && opcion <= 25)
            return ('La Persona posee un peso normal');
        else if (opcion > 25 && opcion <= 30)
            return ('La Persona posee Pre-obesidad o Sobrepeso');
        else if (opcion > 30 && opcion <= 35)
            return ('La Persona posee Obesidad clase I ');
        else if (opcion > 35 && opcion <= 40)
            return ('La Persona posee Obesidad clase I ');
        else if (opcion > 40)
            return('La Persona posee Obesidad clase III');
    }



}

