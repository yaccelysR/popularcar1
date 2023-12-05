 

document.getElementById("calcular").addEventListener("click", function() {
    const obtenerValor = (id) => parseFloat(document.getElementById(id).value);

    const capital = obtenerValor("capital");
    const interes = obtenerValor("interes") / 100;
    const plazo = parseInt(obtenerValor("plazo"));

    const mostrarError = (mensaje) => {
        const errorElement = document.getElementById("error");
        errorElement.innerHTML = mensaje;
        errorElement.style.display = "block";

        // Ocultar la alerta de resultado si está visible
        document.getElementById("resultado").style.display = "none";
    };

    const ocultarError = () => {
        document.getElementById("error").style.display = "none";
    };

    if (isNaN(capital) || isNaN(interes) || isNaN(plazo) || capital <= 0 || interes <= 0 || plazo <= 0) {
        mostrarError("Por favor, ingresa valores válidos en todos los campos.");
        return;
    } else {
        ocultarError();
    }

    // Calcular la cuota del préstamo utilizando la fórmula
    var cuota = calcularCuotaPrestamo(capital, interes, plazo);

    // Total de intereses pagados
    var totalInteresPagado = cuota * plazo - capital;

    // Mostrar los resultados en la alerta
    var resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = "Cuota mensual estimada: <strong>DOP " + cuota.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</strong><br>" +
                                "Total del interes pagado: <strong>DOP " + totalInteresPagado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</strong>";

    // Mostrar la alerta de resultado
    resultadoElement.style.display = "block";
});

// Función para calcular la cuota del préstamo
function calcularCuotaPrestamo(capital, interes, plazo) {
    var tasaMensual = interes / 12;
    var cuota = (capital * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
    return cuota;
}
