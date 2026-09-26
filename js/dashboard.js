const totalTareas = document.getElementById("totalTareas");
const tareasCompletadas = document.getElementById("tareasCompletadas");
const tareasPendientes = document.getElementById("tareasPendientes");

function obtenerTareas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
}

function actualizarDashboard() {

    const tareas = obtenerTareas();

    const total = tareas.length;

    const completadas = tareas.filter(function (tarea) {
        return tarea.completada === true;
    }).length;

    const pendientes = tareas.filter(function (tarea) {
        return tarea.completada === false;
    }).length;

    totalTareas.textContent = total;
    tareasCompletadas.textContent = completadas;
    tareasPendientes.textContent = pendientes;
}

actualizarDashboard();