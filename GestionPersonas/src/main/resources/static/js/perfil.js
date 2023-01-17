// Call the dataTables jQuery plugin
$(document).ready(function () {
    cargarPerfil();
    $('#perfil').DataTable();
    actualizarPerfilUsuario();
});

async function actualizarPerfilUsuario() {
    document.getElementById("txt-perfilUsuario").outerHTML = localStorage.email;
}

async function cargarPerfil() {
    const email = localStorage.email;
    const request = await fetch('api/perfil/' + email, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const perfil = await request.json();

    let botonEliminar = '<a href="#" onclick="editar()" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-pen"></i></a>';
    let perfilHTML = '<tr><td>' + perfil.id + '</td><td>' + perfil.nombre + ' ' + perfil.apellido + '</td><td>' + perfil.email + '</td><td>' + perfil.telefono + '</td><td>' + botonEliminar + '</td></tr>';

    document.querySelector('#perfil tbody').outerHTML = perfilHTML;
    localStorage.id = perfil.id;

    document.getElementById("txtNombre").value = perfil.nombre;
    document.getElementById("txtApellido").value = perfil.apellido;
    document.getElementById("txtEmail").value = perfil.email;
    document.getElementById("txtTelefono").value = perfil.telefono;

}


function editar() {
    document.getElementById('cardEditarPerfil').style.opacity = '1';
}

 function cancelarEditarUsuario() {
    document.getElementById('cardEditarPerfil').style.opacity = '0';
}

async function editarUsuario() {
    datos = {}
    datos.nombre = document.getElementById("txtNombre").value;
    datos.apellido = document.getElementById("txtApellido").value;
    datos.email = document.getElementById("txtEmail").value;
    datos.telefono = document.getElementById("txtTelefono").value;
    datos.password = document.getElementById("txtPassword").value;

    validacion = await validarDatos(datos);
    if (!validacion) {
        alert('Por favor, corregir los datos ingresados en el formulario antes de enviar!');
        return;
    }

    credenciales = {};
    credenciales.email=localStorage.email;
    credenciales.password=datos.password;
    const request = await fetch('api/login',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciales)
    });
    const response = await request.text();

    if (response == 'FAIL') {
        alert('Las contraseña ingresada es incorrecta');
        return;
    } 

    datos.id = localStorage.id;
    const reques = await fetch('api/editUsuario/'+localStorage.email,{
        method : 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(datos)
        });

    localStorage.email= datos.email;
    
    document.getElementById('cardEditarPerfil').style.opacity = '0';
    

    alert('editado');
    location.reload();

}



async function validarDatos(datos) {

    let validacionCorrecta = true;

    //Expresion Regular Letras con Espacio
    const ExpRegLetrasEspacio = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    //Expresion Regular Solo Números
    const ExpRegSoloNumeros = /^\d{1,14}$/; // 7 a 14 numeros.
    //Expresión Regular Email
    const ExpRegEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    ////////////////////
    var nombre = datos.nombre;
    var apellido = datos.apellido;
    var telefono = datos.telefono;
    var email = datos.email;

    //Evaluación de Cadena Valida de Letras con Espacio
    if (nombre.match(ExpRegLetrasEspacio) != null) {
        document.getElementById('grupo-nombre').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-nombre').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-nombre .formulario__input-error').classList.remove('formulario__input-error-activo');

    } else {
        document.getElementById('grupo-nombre').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-nombre').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-nombre .formulario__input-error').classList.add('formulario__input-error-activo');
        validacionCorrecta = false;
    }


    //Evaluación de Cadena Valida de Letras con Espacio
    if (apellido.match(ExpRegLetrasEspacio) != null) {
        document.getElementById('grupo-apellido').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-apellido').classList.add('formulario__grupo-correcto');


        document.querySelector('#grupo-apellido .formulario__input-error').classList.remove('formulario__input-error-activo');

    } else {
        document.getElementById('grupo-apellido').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-apellido').classList.add('formulario__grupo-incorrecto');


        document.querySelector('#grupo-apellido .formulario__input-error').classList.add('formulario__input-error-activo');

        validacionCorrecta = false;
    }


    if (email.match(ExpRegEmail) != null) {

        document.getElementById('grupo-email').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-email').classList.add('formulario__grupo-correcto');


        document.querySelector('#grupo-email .formulario__input-error').classList.remove('formulario__input-error-activo');

    } else {
        document.getElementById('grupo-email').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-email').classList.add('formulario__grupo-incorrecto');


        document.querySelector('#grupo-email .formulario__input-error').classList.add('formulario__input-error-activo');

        validacionCorrecta = false;
    }

    //Evaluación de Cadena Valida de Solo Números
    if (telefono.match(ExpRegSoloNumeros) != null) {

        document.getElementById('grupo-te').classList.remove('formulario__grupo-incorrecto');

        document.getElementById('grupo-te').classList.add('formulario__grupo-correcto');



        document.querySelector('#grupo-te .formulario__input-error').classList.remove('formulario__input-error-activo');


    } else {

        document.getElementById('grupo-te').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-te').classList.add('formulario__grupo-incorrecto');


        document.querySelector('#grupo-te .formulario__input-error').classList.add('formulario__input-error-activo');

        validacionCorrecta = false;
    }

    if (email != localStorage.email) {
        emailRepetido = await yaExiste(email);
        //Evaluación de Cadena Valida de Email
        if (emailRepetido) {
            document.getElementById('grupo-email').classList.remove('formulario__grupo-correcto');
            document.getElementById('grupo-email').classList.add('formulario__grupo-incorrecto');
            document.querySelector('#grupo-email .formulario__input-error').classList.add('formulario__input-error-activo');
            alert("El email ingresado ya se encuentra registrado")
            validacionCorrecta = false;
        }
    }

    return validacionCorrecta;
}

async function yaExiste(email) {


    const request = await fetch('api/perfil/' + email, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const perfil = await request.json();

    if (perfil.id == 0) {
        return false;
    }
    return true;
}