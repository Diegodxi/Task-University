const formularioTarea = document.getElementById("formTarea");
const selectUsuario = document.getElementById("usuario");
const listaTareas = document.getElementById("listaTareas");

function obtenerTareas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
}

function guardarTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    selectUsuario.innerHTML = `
        <option value="">
            Seleccione un usuario
        </option>
    `;

    usuarios.forEach(function (usuario) {
        const opcion = document.createElement("option");

        opcion.value = usuario.nombre;
        opcion.textContent = usuario.nombre;

        selectUsuario.appendChild(opcion);
    });
}

function mostrarTareas() {
    const tareas = obtenerTareas();

    listaTareas.innerHTML = "";

    if (tareas.length === 0) {
        listaTareas.innerHTML = `
            <tr>
                <td colspan="6">
                    No existen tareas registradas.
                </td>
            </tr>
        `;

        return;
    }

    tareas.forEach(function (tarea) {
        const fila = document.createElement("tr");

        const estado = tarea.completada ? "Completada" : "Pendiente";

        fila.innerHTML = `
            <td>${tarea.titulo}</td>
            <td>${tarea.descripcion}</td>
            <td>${tarea.usuario}</td>
            <td>${tarea.fecha}</td>
            <td>${estado}</td>
            <td>
                Próximamente
            </td>
        `;

        listaTareas.appendChild(fila);
    });
}

formularioTarea.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const usuario = document.getElementById("usuario").value;
    const fecha = document.getElementById("fecha").value;

    if (titulo === "" || descripcion === "" || usuario === "" || fecha === "") {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const tareas = obtenerTareas();

    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo,
        descripcion: descripcion,
        usuario: usuario,
        fecha: fecha,
        completada: false
    };

    tareas.push(nuevaTarea);

    guardarTareas(tareas);

    formularioTarea.reset();

    mostrarTareas();

    alert("Tarea registrada correctamente");
});

cargarUsuarios();
mostrarTareas();