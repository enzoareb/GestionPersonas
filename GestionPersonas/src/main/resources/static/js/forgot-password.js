// Call the dataTables jQuery plugin
$(document).ready(function () {

});

async function restablecerPassword() {
    let datos = {};
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtNuevaContraseña').value;
    datos.repetirPassword = document.getElementById('txtRepitaNuevaContraseña').value;

    validacion = await validarDatos(datos);
    if (!validacion) {
        alert('Por favor, corregir los datos ingresados en el formulario antes de enviar!');
        return;
    }

    const request = await fetch('api/password', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    let response = await request.json();
    
    alert('La contraseña fue reestablecida con exito!');
    window.location.href = 'index.html';
    
}

async function validarDatos(datos) {

    let validacionCorrecta = true;

    //Expresión Regular Email
    const ExpRegEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    //Expresión Regular password
    const ExpRegPassword = /^.{4,255}$/; // 4 a 12 digitos.

    ////////////////////
    var email = datos.email;
    var password = datos.password;
    var repetirPassword = datos.repetirPassword;

    if ((email.match(ExpRegEmail) != null)) {
        document.getElementById('grupo-email').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-email').classList.remove('formulario__grupo-incorrecto');
        document.querySelector('#grupo-email .formulario__input-error').classList.remove('formulario__input-error-activo');
    }else{
        document.getElementById('grupo-email').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-email').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-email .formulario__input-error').classList.add('formulario__input-error-activo');
        validacionCorrecta = false;
    }

    if (password.match(ExpRegPassword) != null) {
        document.getElementById('grupo-password').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-password').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-password .formulario__input-error').classList.remove('formulario__input-error-activo');
    } else {
        document.getElementById('grupo-password').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-password').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-password .formulario__input-error').classList.add('formulario__input-error-activo');
        validacionCorrecta = false;
    }

    if (password == repetirPassword) {
        document.getElementById('grupo-repetirPassword').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-repetirPassword').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-repetirPassword .formulario__input-error').classList.remove('formulario__input-error-activo');

    } else {
        document.getElementById('grupo-repetirPassword').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-repetirPassword').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-repetirPassword .formulario__input-error').classList.add('formulario__input-error-activo');
        validacionCorrecta = false;
    }
    if (repetirPassword == "") {
        document.getElementById('grupo-repetirPassword').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-repetirPassword').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-repetirPassword .formulario__input-error').classList.remove('formulario__input-error-activo');
        validacionCorrecta = false;
        
    }

    emailYaExiste = await yaExiste(email);
    //Evaluación de Cadena Valida de Email
    if (emailYaExiste) {
        document.getElementById('grupo-email').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-email').classList.add('formulario__grupo-correcto');

        document.querySelector('#grupo-email .formulario__input-error').classList.remove('formulario__input-error-activo');

    } else {
        document.getElementById('grupo-email').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-email').classList.add('formulario__grupo-incorrecto');

        document.querySelector('#grupo-email .formulario__input-error').classList.add('formulario__input-error-activo');

        validacionCorrecta = false;
    }

    return validacionCorrecta;
}

async function yaExiste(email){

    
    const request = await fetch('api/perfil/'+email,{
    method : 'GET',
    headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
    }
    });

    const perfil = await request.json();
    
    if(perfil.id==0){
        return false;   
    }
    return true;
}