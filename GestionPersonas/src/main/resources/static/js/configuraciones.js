// Call the dataTables jQuery plugin
$(document).ready(function() {

});



async function cambiarPassword(){

    let datos = {};

    datos.email = localStorage.email;
    datos.password= document.getElementById('txtPassword').value;
    datos.passwordNuevo= document.getElementById('txtPasswordNuevo').value;
    datos.repetirPasswordNuevo= document.getElementById('txtRepetirPasswordNuevo').value;
    
    validacion = await validarDatos(datos);
    if(!validacion){
        alert('Por favor, corregir los datos ingresados en el formulario antes de enviar!');
        return;
    }
    datos.password=datos.passwordNuevo;
    const request = await fetch('api/password', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    let response = await request.json();

    alert('La contraseña fue cambiada con exito!');
    location.reload();

}

async function validarDatos(datos){

    let validacionCorrecta=true;

	//Expresión Regular password
	const ExpRegPassword= /^.{4,255}$/; // 4 a 12 digitos.
	
    var email = datos.email;
    var password=datos.password;
    var passwordNuevo=datos.passwordNuevo;
    var repetirPasswordNuevo=datos.repetirPasswordNuevo;

    let credenciales = {};

    credenciales.email= email;
    credenciales.password= password;

    esCorrectas = await sonCorrectas(credenciales);
    if(esCorrectas){
        document.getElementById('grupo-password').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-password').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-password .formulario__input-error').classList.remove('formulario__input-error-activo');
  
    }else{
        document.getElementById('grupo-password').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-password').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-password .formulario__input-error').classList.add('formulario__input-error-activo');
        validacionCorrecta = false;
    }

    if (passwordNuevo.match(ExpRegPassword) != null) {
        document.getElementById('grupo-passwordNuevo').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-passwordNuevo').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-passwordNuevo .formulario__input-error').classList.remove('formulario__input-error-activo');

    } else {
        document.getElementById('grupo-passwordNuevo').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-passwordNuevo').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-passwordNuevo .formulario__input-error').classList.add('formulario__input-error-activo');
        validacionCorrecta = false;
        return;
    }

    if(passwordNuevo==repetirPasswordNuevo ){
        document.getElementById('grupo-repetirPasswordNuevo').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-repetirPasswordNuevo').classList.add('formulario__grupo-correcto');
       
    
        document.querySelector('#grupo-repetirPasswordNuevo .formulario__input-error').classList.remove('formulario__input-error-activo');
  
    }else{
        document.getElementById('grupo-repetirPasswordNuevo').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-repetirPasswordNuevo').classList.add('formulario__grupo-incorrecto');
  
    
        document.querySelector('#grupo-repetirPasswordNuevo .formulario__input-error').classList.add('formulario__input-error-activo');
     
        validacionCorrecta=false;
    }
    
    return validacionCorrecta;
}


async function sonCorrectas(credenciales){


    const request = await fetch('api/login',{
    method : 'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify(credenciales)
    });
    const response = await request.text();

    if(response != 'FAIL'){
        return true;
    }else{
        return false;
   }
}