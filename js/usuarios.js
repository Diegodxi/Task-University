const formularioUsuario = document.getElementById("formUsuario");

formularioUsuario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const carrera = document.getElementById("carrera").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre,
        correo: correo,
        carrera: carrera
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    formularioUsuario.reset();

    alert("Usuario registrado correctamente");
});