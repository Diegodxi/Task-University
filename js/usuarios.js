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

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const carrera = document.getElementById("carrera").value;

    const usuarios = obtenerUsuarios();

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