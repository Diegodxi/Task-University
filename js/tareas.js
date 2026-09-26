const formularioTarea = document.getElementById("formTarea");
const selectUsuario = document.getElementById("usuario");
const listaTareas = document.getElementById("listaTareas");

let tareaEditandoId = null;

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
                <button onclick="editarTarea(${tarea.id})">
                    Editar
                </button>

                <button onclick="eliminarTarea(${tarea.id})">
                    Eliminar
                </button>
            </td>
        `;

        listaTareas.appendChild(fila);
    });
}

function editarTarea(id) {
    const tareas = obtenerTareas();

    const tarea = tareas.find(function (tarea) {
        return tarea.id === id;
    });

    if (!tarea) {
        return;
    }

    document.getElementById("titulo").value = tarea.titulo;
    document.getElementById("descripcion").value = tarea.descripcion;
    document.getElementById("usuario").value = tarea.usuario;
    document.getElementById("fecha").value = tarea.fecha;

    tareaEditandoId = id;

    formularioTarea.querySelector("button[type='submit']").textContent =
        "Guardar cambios";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function eliminarTarea(id) {

    const confirmar = confirm(
        "¿Está seguro de que desea eliminar esta tarea?"
    );

    if (!confirmar) {
        return;
    }

    let tareas = obtenerTareas();

    tareas = tareas.filter(function (tarea) {
        return tarea.id !== id;
    });

    guardarTareas(tareas);

    mostrarTareas();

    alert("Tarea eliminada correctamente");
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

    if (tareaEditandoId === null) {

        const nuevaTarea = {
            id: Date.now(),
            titulo: titulo,
            descripcion: descripcion,
            usuario: usuario,
            fecha: fecha,
            completada: false
        };

        tareas.push(nuevaTarea);

        alert("Tarea registrada correctamente");

    } else {

        const indice = tareas.findIndex(function (tarea) {
            return tarea.id === tareaEditandoId;
        });

        if (indice !== -1) {
            tareas[indice].titulo = titulo;
            tareas[indice].descripcion = descripcion;
            tareas[indice].usuario = usuario;
            tareas[indice].fecha = fecha;
        }

        tareaEditandoId = null;

        formularioTarea.querySelector("button[type='submit']").textContent =
            "Registrar tarea";

        alert("Tarea actualizada correctamente");
    }

    guardarTareas(tareas);

    formularioTarea.reset();

    mostrarTareas();
});

cargarUsuarios();
mostrarTareas();