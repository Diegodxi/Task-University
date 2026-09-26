const formularioUsuario = document.getElementById("formUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function mostrarUsuarios() {

    const usuarios = obtenerUsuarios();

    listaUsuarios.innerHTML = "";

    if (usuarios.length === 0) {

        listaUsuarios.innerHTML = `
            <tr>
                <td colspan="3">
                    No existen usuarios registrados.
                </td>
            </tr>
        `;

        return;
    }

    usuarios.forEach(function (usuario) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.carrera}</td>
        `;

        listaUsuarios.appendChild(fila);
    });
}


formularioUsuario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const carrera = document.getElementById("carrera").value.trim();

    if (nombre === "" || correo === "" || carrera === "") {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        return;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
        alert("Ingrese un correo electrónico válido.");
        return;
    }

    const usuarios = obtenerUsuarios();

    const correoExiste = usuarios.some(function (usuario) {
        return usuario.correo.toLowerCase() === correo.toLowerCase();
    });

    if (correoExiste) {
        alert("Ya existe un usuario registrado con ese correo.");
        return;
    }

    const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre,
        correo: correo,
        carrera: carrera
    };

    usuarios.push(nuevoUsuario);

    guardarUsuarios(usuarios);

    formularioUsuario.reset();

    mostrarUsuarios();

    alert("Usuario registrado correctamente");
});

mostrarUsuarios();