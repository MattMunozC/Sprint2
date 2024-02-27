let datosExamen = [];

function agregarExamen() {
    const examen = {
        tipo: document.getElementById('exam-type').value,
        fecha: document.getElementById('exam-date').value,
        resultado: 'Normal', // Por defecto, se asume que el resultado es normal
        datos: generarDatosAleatorios() // Generar datos aleatorios para el examen
    };

    datosExamen.push(examen);
    mostrarTabla();
    generarGraficos(datosExamen[datosExamen.length - 1].datos); // Mostrar gráficos con los datos del último examen agregado
}

function mostrarTabla() {
    const table = document.getElementById('exam-table');
    table.innerHTML = '';

    datosExamen.forEach(examen => {
        const row = table.insertRow();
        row.insertCell(0).textContent = examen.tipo;
        row.insertCell(1).textContent = examen.fecha;
        row.insertCell(2).textContent = examen.resultado;
        row.insertCell(3).textContent = examen.datos.hemograma.join(', '); // Mostrar más datos según sea necesario
        row.insertCell(4).textContent = examen.datos.perfilLipidico.join(', ');
        row.insertCell(5).textContent = examen.datos.colesterol.join(', ');
        row.insertCell(6).textContent = examen.datos.trigliceridos.join(', ');
    });
}


function generarGraficos(datos) {
    // Eliminar los gráficos existentes si los hay
    if (window.chartLine1) window.chartLine1.destroy();
    if (window.chartLine2) window.chartLine2.destroy();
    if (window.chartBar1) window.chartBar1.destroy();
    if (window.chartBar2) window.chartBar2.destroy();

    const ctxLineChart1 = document.getElementById('line-chart-1-canvas').getContext('2d');
    const ctxLineChart2 = document.getElementById('line-chart-2-canvas').getContext('2d');
    const ctxBarChart1 = document.getElementById('bar-chart-1-canvas').getContext('2d');
    const ctxBarChart2 = document.getElementById('bar-chart-2-canvas').getContext('2d');

    // Generar nuevos datos aleatorios para los gráficos
    const nuevosDatos = generarDatosAleatorios();

    // Generar gráficos de línea
    window.chartLine1 = new Chart(ctxLineChart1, {
        type: 'line',
        data: {
            labels: Array.from({ length: nuevosDatos.hemograma.length }, (_, i) => (i + 1).toString()),
            datasets: [{
                label: 'Hemograma',
                data: nuevosDatos.hemograma,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    window.chartLine2 = new Chart(ctxLineChart2, {
        type: 'line',
        data: {
            labels: Array.from({ length: nuevosDatos.perfilLipidico.length }, (_, i) => (i + 1).toString()),
            datasets: [{
                label: 'Perfil Lipídico',
                data: nuevosDatos.perfilLipidico,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Generar gráficos de barra
    window.chartBar1 = new Chart(ctxBarChart1, {
        type: 'bar',
        data: {
            labels: Array.from({ length: nuevosDatos.colesterol.length }, (_, i) => (i + 1).toString()),
            datasets: [{
                label: 'Colesterol',
                data: nuevosDatos.colesterol,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    window.chartBar2 = new Chart(ctxBarChart2, {
        type: 'bar',
        data: {
            labels: Array.from({ length: nuevosDatos.trigliceridos.length }, (_, i) => (i + 1).toString()),
            datasets: [{
                label: 'Triglicéridos',
                data: nuevosDatos.trigliceridos,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function generarDatosAleatorios() {
    const cantidadDatos = 10; // Número de datos a generar
    const datos = {
        hemograma: [],
        perfilLipidico: [],
        colesterol: [],
        trigliceridos: []
    };

    // Generar datos aleatorios para cada tipo de examen
    for (let i = 0; i < cantidadDatos; i++) {
        datos.hemograma.push(Math.floor(Math.random() * (150 - 100 + 1)) + 100); // Ejemplo de valores entre 100 y 150
        datos.perfilLipidico.push(Math.floor(Math.random() * (300 - 200 + 1)) + 200); // Ejemplo de valores entre 200 y 300
        datos.colesterol.push(Math.floor(Math.random() * (200 - 150 + 1)) + 150); // Ejemplo de valores entre 150 y 200
        datos.trigliceridos.push(Math.floor(Math.random() * (250 - 200 + 1)) + 200); // Ejemplo de valores entre 200 y 250
    }

    return datos;
}

window.onload = function () {
    generarGraficos(generarDatosAleatorios());
    mostrarTabla();
};

document.getElementById('exam-date').addEventListener('change', function () {
    generarGraficos(generarDatosAleatorios());
});
