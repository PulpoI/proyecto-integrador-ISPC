const $firstname = document.getElementById("firstname");
const $lastname = document.getElementById("lastname");
const $messageInput = document.getElementById("messageInput");
const $email = document.getElementById("email");
const $contactoForm = document.getElementById("contacto-form");
(function(){
  $contactoForm.addEventListener("submit", function(e){
    let nombre=String($firstname.value).trim();
    if(nombre.length===0){
      alert("Debe escribir su nombre");
      e.preventDefault();
    };
 $contactoForm.addEventListener("submit", function(e){
   let apellido=String($lastname.value).trim();
     if(nombre.length===0){
       alert("Debe escribir su apellido");
       e.preventDefault();
      }
}
  });

})();

