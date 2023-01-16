// Call the dataTables jQuery plugin
$(document).ready(function() {

});

const inputs = document.querySelectorAll('formulario input');

async function registrarUsuario(){

    let datos = {};
    datos.nombre= document.getElementById('txtNombre').value;
    datos.apellido= document.getElementById('txtApellido').value;
    datos.email= document.getElementById('txtEmail').value;
    datos.telefono= document.getElementById('txtTelefono').value;
    datos.password= document.getElementById('txtPassword').value;
    datos.repetirPassword= document.getElementById('txtRepetirPassword').value;
    
    validacion = await validarDatos(datos);
    if(!validacion){
        alert('Por favor, corregir los datos ingresados en el formulario antes de enviar!');
        return;
    }
    
    const request = await fetch('api/usuario',{
    method : 'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify(datos)
    });
    alert('La cuenta fue creada con exito!');
    window.location.href= 'index.html';

}

async function validarDatos(datos){

    let validacionCorrecta=true;

    //Expresion Regular Letras con Espacio
    const ExpRegLetrasEspacio=/^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    //Expresion Regular Solo Números
    const ExpRegSoloNumeros=/^\d{1,14}$/; // 7 a 14 numeros.
    //Expresión Regular Email
    const ExpRegEmail=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	//Expresión Regular password
	const ExpRegPassword= /^.{4,255}$/; // 4 a 12 digitos.
	
    ////////////////////
    var nombre= datos.nombre;
    var apellido=datos.apellido;
    var telefono=datos.telefono;
    var email=datos.email;
    var password=datos.password;
    var repetirPassword=datos.repetirPassword;

    //Evaluación de Cadena Valida de Letras con Espacio
    if(nombre.match(ExpRegLetrasEspacio)!=null){
        document.getElementById('grupo-nombre').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-nombre').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-nombre i').classList.remove('bi-x-circle');
      
        document.querySelector('#grupo-nombre .formulario__input-error').classList.remove('formulario__input-error-activo');
     
    }else{
        document.getElementById('grupo-nombre').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-nombre').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-nombre i').classList.add('bi-x-circle');
     
        document.querySelector('#grupo-nombre .formulario__input-error').classList.add('formulario__input-error-activo');
    
        validacionCorrecta=false;
    }


    //Evaluación de Cadena Valida de Letras con Espacio
    if(apellido.match(ExpRegLetrasEspacio)!=null){
        document.getElementById('grupo-apellido').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-apellido').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-apellido i').classList.remove('bi-x-circle');
   
        document.querySelector('#grupo-apellido .formulario__input-error').classList.remove('formulario__input-error-activo');
    
    }else{
        document.getElementById('grupo-apellido').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-apellido').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-apellido i').classList.add('bi-x-circle');
    
        document.querySelector('#grupo-apellido .formulario__input-error').classList.add('formulario__input-error-activo');
    
        validacionCorrecta=false;
    }
    

    if(email.match(ExpRegEmail)!=null){
        
        document.getElementById('grupo-email').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-email').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-email i').classList.remove('bi-x-circle');
    
        document.querySelector('#grupo-email .formulario__input-error').classList.remove('formulario__input-error-activo');
    
    }else{
        document.getElementById('grupo-email').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-email').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-email i').classList.add('bi-x-circle');
    
        document.querySelector('#grupo-email .formulario__input-error').classList.add('formulario__input-error-activo');
   
        validacionCorrecta=false;
    }

    //Evaluación de Cadena Valida de Solo Números
    if(telefono.match(ExpRegSoloNumeros)!=null){
        
        document.getElementById('grupo-te').classList.remove('formulario__grupo-incorrecto');
        
        document.getElementById('grupo-te').classList.add('formulario__grupo-correcto');
        
        document.querySelector('#grupo-te i').classList.remove('bi-x-circle');
    
        
    document.querySelector('#grupo-te .formulario__input-error').classList.remove('formulario__input-error-activo');
    
        
    }else{
        
        document.getElementById('grupo-te').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-te').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-te i').classList.add('bi-x-circle');
    
        document.querySelector('#grupo-te .formulario__input-error').classList.add('formulario__input-error-activo');
   
        validacionCorrecta=false;
    }

    if(password.match(ExpRegPassword)!=null){
        document.getElementById('grupo-password').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-password').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-password i').classList.remove('bi-x-circle');
    
        document.querySelector('#grupo-password .formulario__input-error').classList.remove('formulario__input-error-activo');
  
    }else{
        document.getElementById('grupo-password').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-password').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-password i').classList.add('bi-x-circle');
   
        document.querySelector('#grupo-password .formulario__input-error').classList.add('formulario__input-error-activo');
        document.getElementById('estado-password').style.bottom = '400px';
        document.getElementById('estado-password').style.right = '50px';
        validacionCorrecta=false;
    }
    
    if(repetirPassword==""){
        document.getElementById('grupo-repetirPassword').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-repetirPassword').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-repetirPassword i').classList.add('bi-x-circle');
  
        document.getElementById('estado-repetirPassword').style.bottom = '310px';
        document.getElementById('estado-repetirPassword').style.right = '50px';
        validacionCorrecta=false;
        return;
    }

    if(password==repetirPassword ){
        document.getElementById('grupo-repetirPassword').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo-repetirPassword').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo-repetirPassword i').classList.remove('bi-x-circle');
    
        document.querySelector('#grupo-repetirPassword .formulario__input-error').classList.remove('formulario__input-error-activo');
  
    }else{
        document.getElementById('grupo-repetirPassword').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-repetirPassword').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-repetirPassword i').classList.add('bi-x-circle');
    
        document.querySelector('#grupo-repetirPassword .formulario__input-error').classList.add('formulario__input-error-activo');
        document.getElementById('estado-repetirPassword').style.bottom = '330px';
        document.getElementById('estado-repetirPassword').style.right = '50px';
        validacionCorrecta=false;
    }

    emailRepetido =await yaExiste(email);
    //Evaluación de Cadena Valida de Email
    if(emailRepetido){
        document.getElementById('grupo-email').classList.remove('formulario__grupo-correcto');
        document.getElementById('grupo-email').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo-email i').classList.add('bi-x-circle');
        document.querySelector('#grupo-email .formulario__input-error').classList.add('formulario__input-error-activo');
        document.getElementById('estado-email').style.bottom = '50px';
        alert("El email ingresado ya se encuentra registrado")
        validacionCorrecta=false;
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