
let opcion;
// Presenta el menú inicial paraq ue el usuario seleccione que funcionalidad desea utilizar

opcion = parseInt(prompt('Bienvenid@ a la sección de cálculos saludables' + '\n \n' +
    'Seleccione la tarea que desea realizar: ' + '\n \n' +
    '-> 1: Índice de masa corporal (IMS)' + '\n \n' +
    '-> 2: Reporte alimenticio de su Receta' + '\n \n' +
    '-> 3: Salir' + '\n \n ' +
    'IMPORTANTE: habilitar la consola para visualizar los resultados. ' + '\n '));

switch (opcion) {

    case 1:
        imc();
        break;
    case 2:
        reporteAlimenticio();
        alert('Muchas gracias por su visita, los resultados se pueden ver por consola');
        break;
    case 3:
        alert('Muchas gracias por su visita');
        break;
    default:
        break;
}


// se utiliza en el caso que en menú ppial seleccione la opción 1 de IMC - Índice de Masa corporal.
// (peso)/(estatura * estatura)

function imc() {

    const persona1= new Persona();
   

    // se solicitan los datos para el cálculo
    persona1.apellido = prompt('--> Ingrese su Apellido: ');
    persona1.nombre = prompt('--> Ingrese sus Nombres: ');
    persona1.fechaNacimiento = prompt('--> Ingrese su Fecha de Nacimiento: (Ej. 21/09/1990) ');
    persona1.estatura = prompt('--> Ingrese su estatura en Metros: (Ej. 1.74) ');
    persona1.peso = prompt('--> Ingrese su peso en Kgr: (Ej. 85.3)');

    // solo valida el ingreso de valores numéricos con coma

    while (persona1.estatura.includes(',') || persona1.peso.includes(',')) {

        alert('Recuerde que el seprador de decimales debe ser un punto "." ')
        persona1.estatura = prompt('--> Ingrese su estatura en Metros: (Ej. 1.74) ');
        persona1.peso = prompt('--> Ingrese su peso en Kgr: (Ej. 85.3)');

    }

    // parsefloat convierte a número real 
    // la función Math.pow (a,b) eleva "a" a la potencia "b"
    // la función Math.round() retorna el valor de un número redondeado al entero más cercano.

    alert(persona1.nombre +': Con una altura de: ' + persona1.estatura 
    + ' un peso de: ' + persona1.peso  + '\n' +
        ' Su índice de Masa Corporal es de :  ' + Math.round(persona1.imc()) + '\n \n ' +
        '-----------------------------------------------' + '\n' +
        '                     Según Tabla de IMC                    ' + '\n' +
        '-----------------------------------------------' + '\n' +
        persona1.estadoSalud() + '\n')

}

// permite el ingreso de las listas de Alimentos y bebidas

function reporteAlimenticio() {
    
       // campos que se utiliza en estructuras de control
    let tipo = "";

    // si es Alimento toma el valor gramo sino mililitro
    let unidades = "";

    // ítems de alimento y bebida
    let alimento;
    let bebida;

    //atributos de los ítems
    let nombre = "";
    let precio = 0;
    let cantidad = 0;
    let calorias = 0;
    let sodio = 0;
    let grasas = 0;
    let alcohol = 0 ;

    //listas de ítems de bebidas y alimentos
    let receta = [];
    let bodega = [];


    do {
        console.log('Ingresando un nuevo ítem de la Receta...');
        tipo = prompt('--> Nombre el tipo de producto -> A: Alimento B: Bebida : ').toUpperCase();


        while (tipo != 'A' && tipo != 'B') {
            alert('Recuerde que las opciones pueden ser A o B ');
            tipo = prompt('--> Nombre el tipo de producto -> A: Alimento B: Bebida : ').toUpperCase();
        }

        // Ingreso de campo nombre del ítem    
        if (tipo == 'A') {
            nombre = prompt('--> Nombre del Alimento: ');
            unidades = 'gramos';
        } else {
            nombre = prompt('--> Nombre de la Bebida: ');
            unidades = 'mililitros';
        }

        // ingreso del resto de los campos tener en cuenta el cambio de unidad si se agregan/modifican campos

        console.log('------------------------------------------------------------------------------------------');
        console.log('IMPORTANTE: para las cantidades recuerde ingresar las mismas en relación a cada 100 ' + unidades + ': ');
        console.log('------------------------------------------------------------------------------------------');

        precio = parseFloat(prompt('--> Precio del item: '));
        cantidad = parseInt(prompt('--> Cantidad en ' + unidades + ': '));
        calorias = parseInt(prompt('--> Calorías cada 100 ' + unidades + ': '));
        sodio = parseInt(prompt('--> Sodio cada 100 ' + unidades + ': '));

          // Ingreso de campo nombre del ítem    
          if (tipo == 'A') {
            grasas = parseInt(prompt('--> Grasas cada 100 ' + unidades + ': '));
           
        } else {
            alcohol = parseInt(prompt('--> Graduación alcohólica (%) : '));
          
        }
        
        
        // almacena el item en la lista que le corresponde

        if (tipo == 'A') {
            const alimento1= new Alimento(nombre, precio, cantidad, calorias, sodio, grasas);
            receta.push(alimento1)
        } else {
            const bebida1 = new Bebida(nombre, precio, cantidad, calorias, sodio, alcohol);
            bodega.push(bebida1)
        }
        
        continuar = prompt('** Desea agregar otro item en el carrito de compras? si/no **').toUpperCase();

    } while (continuar == 'SI' || continuar == 'S' || continuar == 'SÍ');


    // presenta por consola la tabla de alimentos 

    if (receta.length > 0) {
        console.log('------------------------------------------------------------------------------------------');
        console.log('Informe de alimentos');
        console.log('------------------------------------------------------------------------------------------');
        console.table(receta);
        calcularTotales(receta);
    }

    // presenta por consola la tabla de bebidas 

    if (bodega.length > 0) {
        console.log('------------------------------------------------------------------------------------------');
        console.log('Informe de bebidas');
        console.log('------------------------------------------------------------------------------------------');
        console.table(bodega);
        calcularTotales(bodega);
    }

}

// arma informe con totalizadores de Calorías Sodio y Grasas totales

function calcularTotales(r) {

    let iCantidad, iCalorias, iSodio, iGrasas;

    let totalCalorias = 0;
    let totalSodio = 0;
    let totalGrasas = 0;
    let totalAlcohol = 0;
    
   /// arreglar esto y agregar fecha de vencimiento y vencido si/no

    for (let i = 0; i < r.length; i++) {

        iCantidad = parseInt(r[i].cantidad);
        iCalorias = parseInt(r[i].calorias);
        iSodio = parseInt(r[i].sodio);
       
        
        totalCalorias = totalCalorias + iCantidad / 100 * iCalorias;
        totalSodio = totalSodio + iCantidad / 100 * iSodio;

        if (r[i] instanceof Alimento) {
            iGrasas= parseInt(r[i].grasas);
            totalGrasas = totalGrasas + iCantidad / 100 * iGrasas;
            
            } else if (r[i] instanceof Bebida){
            iAlcohol= parseInt(r[i].alcohol);
            totalAlcohol = totalAlcohol + iAlcohol;
            }
       
    }

    // la función Math.round()retorna el valor de un número redondeado al entero más cercano.
    let cantidades = [ ];

    if (r[1] instanceof Alimento) {
        cantidades = [ {
            descripcion: 'Calorías',
            cantidad: Math.round(totalCalorias)
        },
        {
            descripcion: 'Sodio',
            cantidad: Math.round(totalSodio)
        },
        {
            descripcion: 'Grasas',
            cantidad: Math.round(totalGrasas)
        },
        ]
        
        } else if (r[1] instanceof Bebida){
            cantidades = [ {
                descripcion: 'Calorías',
                cantidad: Math.round(totalCalorias)
            },
            {
                descripcion: 'Sodio',
                cantidad: Math.round(totalSodio)
            },
            {
                descripcion: 'Promedio % de Alcohol',
                cantidad: Math.round(totalAlcohol/r.length)
            },
            ]
        }
         
    console.table(cantidades);
}