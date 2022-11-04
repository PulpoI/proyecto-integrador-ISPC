
$("#form-registro").validate({
	rules: {
		Nombre: { required: true, minlength: 2, maxlength: 50 },
        Nif: { required: true },
        Direccion: { required: true, minlength: 2, maxlength: 50 },
        Email: { required: true, minlength: 4, maxlength: 100, email: true },
        Telefono: { required: true, minlength: 2, maxlength: 50	},
		password: { 
		  required: true,
			 minlength: 6,
			 maxlength: 20,

		} , 

			cfmPassword: { 
			 equalTo: "#password",
			  minlength: 6,
			  maxlength: 20
		}


	},
messages:{
	    Nombre: { required:"El campo Nombre es obligatorio (de 2 a 50 caracteres)"},
        
        Direccion: { required:"El campo Dirección es obligatorio (de 6 a 50 caracteres)",
		minlength: "Minimo 6 caracteres",
		maxlength: "Maximo 20 caracteres"},
        Email: { required:"El campo Email es obligatorio (de 4 a 100 caracteres con formato email)"},
        Telefono: { required:"El campo Teléfono es obligatorio (de 7 a 50 caracteres)",
		minlength: "Minimo 6 caracteres",
		maxlength: "Maximo 20 caracteres"
      },
  password: { 
		  required:"Contraseña obligatoria",
		  minlength: "Minimo 8 caracteres",
		  maxlength: "Maximo 50 caracteres"
		},
cfmPassword: { 
  equalTo: "El password debe ser igual al anterior",
  minlength: "Minimo 8 caracteres",
  maxlength: "Maximo 50 caracteres"
}
}

});

$.extend($.validator.messages, {
    required: "El campo es obligatorio",
    email: "El email es obligatorio",

});

 // Function to check Whether both passwords
            // is same or not.
            function checkPassword(form) {
                password = form.password.value;
                cfmPassword = form.cfmPassword.value;
  
                // If password not entered
                if (password == '')
                    alert ("Por favor, ingrese su contraseña");
                      
                // If confirm password not entered
                else if (cfmPassword == '')
                    alert ("por favor, confirme su contraseña");
                      
                // If Not same return False.    
                else if (password != cfmPassword) {
                    alert ("\nLas contraseñas no coinciden: inténtelo nuevamente...")
                    return false;
                }
  
                // If same return True.
                else{
                    alert("Exito! Las contraseñas coinciden!")
                    return true;
                }
            }

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
	'use strict'
  
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')
  
	// Loop over them and prevent submission
	Array.prototype.slice.call(forms)
	  .forEach(function (form) {
		form.addEventListener('submit', function (event) {
		  if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		  }
  
		  form.classList.add('was-validated')
		}, false)
	  })
  })()

