// Función para mostrar/ocultar la contraseña
function mostrarOcultar(boton, input) {
    const esContraseña = input.getAttribute('type') === 'password';
    input.setAttribute('type', esContraseña ? 'text' : 'password');
    boton.textContent = esContraseña ? 'Ocultar' : 'Mostrar';
}

// Mostrar/Ocultar contraseña en el formulario de login
const btnLogin = document.getElementById('togglePassword'); // Cambia el ID si deseas consistencia
if (btnLogin) {
    btnLogin.addEventListener('click', function() {
        const inputPass = document.getElementById('password');
        mostrarOcultar(btnLogin, inputPass);
    });
}

// Mostrar/Ocultar contraseña en el formulario de registro
document.querySelectorAll('.mostrarContrasena').forEach((boton) => {
    boton.addEventListener('click', function () {
        const input = document.querySelector(boton.getAttribute('data-toggle'));
        if (input) {
            mostrarOcultar(boton, input);
        }
    });
});

