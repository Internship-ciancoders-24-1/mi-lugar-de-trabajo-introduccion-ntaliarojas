function agregarAlCampo(value) {
    const display = document.getElementById('display');
    display.value += value; 
}

function limpiar(){
    const display = document.getElementById('display');
    display.value = '';
}

function calcular() {
    const display = document.getElementById('display');
    const expresion = display.value; 
    const resultado = calcularExpresiones(expresion); 
    display.value = resultado; 
}

function calcularExpresiones(expresion){
    const unidades = expresion.match(/\d+|\+|\-|\*|\//g); 

    // Manejar primero las multiplicaciones y divisiones
    let i = 1;
    while (i < unidades.length) {
        const operador = unidades[i];

        // Si el operador es multiplicación o división
        if (operador === '*' || operador === '/') {
            const num1 = parseFloat(unidades[i - 1]); // Obtener el número antes del operador
            const num2 = parseFloat(unidades[i + 1]); // Obtener el número después del operador

            // Realizar la operación correspondiente
            const resultado = (operador === '*') ? num1 * num2 : num1 / num2;

            // Reemplazar los operandos y el operador con el resultado de la operación
            unidades.splice(i - 1, 3, resultado.toString());
        } else {
            // Pasar al siguiente operador
            i += 2;
        }
    }

    // Realizar las sumas y restas
    let resultado = parseFloat(unidades[0]);
    for (let i = 1; i < unidades.length; i += 2) {
        const operador = unidades[i];
        const operando = parseFloat(unidades[i + 1]);

        if (operador === '+') {
            resultado += operando;
        } else if (operador === '-') {
            resultado -= operando;
        }
    }

    return resultado;
}

