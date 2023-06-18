import { ClientesService } from 'src/app/service/clientes.service';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Subject, Observable } from 'rxjs';
import { FormService } from './../services/form.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  formData: any = {};
  mostrarSeccion3: boolean = false;
  clienteInfo: any = {};
  seccionInvisible: number = 2;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  domicilio: string = '';
  pais: string = ''; 
  provincia: string = ''; 
  cp: string = ''; 
  cartItems: any[] = [];
  cartTotal: number = 0;
  payment: any = {
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardName: ''
    
  };
  seccionActual: number = 1;
  seccionVisible: number = 1;
  confirmationMessage: string = '';

 

  constructor(
    private router: Router,
    private cartService: CartService,
    private formService: FormService,
    private http: HttpClient,
    private authService: AuthService,
    private clientesService: ClientesService,
  ) {}
//simular pago

private isPaymentTestData() {
  return (
    this.payment.cardNumber === '4111111111111111' &&
    this.payment.expDate === '12/23' &&
    this.payment.cvv === '123'
    
  );
  
 
}
  completarPago() {
    const isPaymentTestData = this.isPaymentTestData();
    const isPaymentValid = this.validarNumeroTarjeta() && this.validarFechaVencimiento() && this.validarCVV();
  
    if (
      !this.validarNombre() ||
      !this.validarApellido() ||
      !this.emailValido() ||
      !this.domicilio ||
      (isPaymentValid && !isPaymentTestData && !this.payment.cardName)
    ) {
      // Mostrar mensaje de error y regresar si falta algún campo obligatorio
      let errorMessage = 'Por favor, completa los siguientes campos:';
      // ...
  
      console.log(errorMessage);
      return;
    }
  
    // Guarda los datos del formulario en el objeto formData
    this.formData.nombre = this.nombre;
    this.formData.apellido = this.apellido;
    this.formData.email = this.email;
    this.formData.domicilio = this.domicilio;
  
    // Agrega aquí los demás campos del formulario que deseas guardar
  
    // Guarda la información del formulario utilizando el servicio FormService
    this.formService.setFormData(this.formData);
  
    // Verifica si todos los campos del formulario están completos
    if (
      this.validarNombre() &&
      this.validarApellido() &&
      this.emailValido() &&
      this.domicilio &&
      isPaymentValid
    ) {
      // Realiza el envío del formulario con los datos de prueba
      this.enviarFormularioPrueba();
    }
  
    // Cambiar a la sección 3
    this.seccionVisible = 3;
    this.seccionActual = 3;
    this.nombre = ''; // Limpiando los campos de entrada
    this.apellido = '';
    this.email = '';
    this.domicilio = '';
    this.mostrarSeccion3 = true;
  }
  
  enviarFormularioPrueba() {
    const order = {
      items: this.cartItems,
      total: this.calculateTotal(),
      payment: this.payment
    };
    
  
    // Realiza el envío del formulario utilizando el servicio o método correspondiente
    this.processPayment(order).subscribe(
      (response) => {
        console.log('Pago procesado correctamente', response);
        
        // Guarda la información de envío
        this.saveShippingInformation(this.formData).subscribe(
          () => {
            console.log('Información de envío guardada correctamente');
            
            // Realiza el redireccionamiento a la página de confirmación o a donde sea necesario
            this.redireccionarPaginaConfirmacion();
          },
          (error) => {
            console.error('Error al guardar la información de envío', error);
          }
        );
      },
      (error) => {
        console.error('Error al procesar el pago', error);
      }
    );
  }
  
  redireccionarPaginaConfirmacion() {
    // Redirecciona a la página de confirmación o a donde sea necesario
    this.router.navigate(['/confirmacion']);
  }

  ngOnInit(): void {
    
    (function () {
      'use strict';

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event: Event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      });
    })();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const state = this.router.getCurrentNavigation()?.extras.state;
        if (state && state['items']) {
          this.cartItems = Array.isArray(state['items']) ? state['items'] : [state['items']];
        }
      }
    });

    this.cartService.itemAdded.subscribe((item: any) => {
      this.cartItems.push(item);
    });

    this.cartTotal = this.calculateTotal();
  }

  mostrarSeccion(seccion: number) {
    if (seccion === 3) {
      // Si se hace clic en la sección 3, no se muestra la sección 2
      this.seccionVisible = 3;
      this.seccionInvisible = 2;
      this.seccionActual = 3;
    } else {
      this.seccionVisible = seccion;
      this.seccionInvisible = seccion === 1 ? 2 : 1; // Actualizamos la sección invisible en función de la sección actual
      this.seccionActual = seccion;
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  placeOrder(): void {
    // Validate the payment fields
    // if (
    //   !this.payment.cardNumber ||
    //   !this.payment.expDate ||
    //   !this.payment.cvv ||
    //   !this.payment.cardName
    // ) {
    //   let errorMessage = 'Por favor, complete los siguientes campos:';
  
    //   if (!this.payment.cardNumber) {
    //     errorMessage += '\n- Número de tarjeta';
    //   } else if (!/^\d{16}$/.test(this.payment.cardNumber)) {
    //     errorMessage += '\n- Número de tarjeta inválido. Debe contener 16 dígitos.';
    //   }
  
    //   if (!this.payment.expDate) {
    //     errorMessage += '\n- Fecha de vencimiento';
    //   } else if (!/^\d{2}\/\d{2}$/.test(this.payment.expDate)) {
    //     errorMessage += '\n- Fecha de vencimiento inválida. Use el formato MM/AA.';
    //   }
  
    //   if (!this.payment.cvv) {
    //     errorMessage += '\n- CVV';
    //   } else if (!/^\d{3}$/.test(this.payment.cvv)) {
    //     errorMessage += '\n- CVV inválido. Debe contener 3 dígitos.';
    //   }
  
    //   if (!this.payment.cardName) {
    //     errorMessage += '\n- Nombre en la tarjeta';
    //   }
  
    //   window.alert(errorMessage);
    //   return;
    // }
    // Create an order object with the necessary information
    const planId = this.cartService.getItems()[0]
    const isoDate = new Date().toISOString();
    const formattedDate = isoDate.slice(0, isoDate.indexOf('T'));

    const order = {
      cliente_id: this.authService.getClienteIdFromSessionStorage(),
      plan_id: planId.id,
      precio: planId.precio,
      fecha: formattedDate
    };

    console.log(this.cartService.getItems())

    console.log(this.authService.getClienteIdFromSessionStorage());

    const clienteId = this.authService.getClienteIdFromSessionStorage()

    const userUpdate = {
      plan_id: planId.id, // Actualiza la propiedad "plan_id" con el valor de "planId"
      clases_restantes: planId.cantidad_clases
    };
    

    this.clientesService.obtenerCliente(clienteId).subscribe(clientes => {
      console.log('Datos del cliente:', clientes);

      
     
    });

    
    // Process the payment
    this.processPayment(order).subscribe(
      (response) => {
        console.log('Pago procesado correctamente', response);

        // Save the shipping information
        this.saveShippingInformation(userUpdate).subscribe(
          () => {
            console.log('Información de envío guardada correctamente');
            
            // Redirect a suscripciones
            window.location.href = 'http://localhost:4200/mis-suscripciones';

            this.confirmationMessage = 'Orden enviada';
          },
          (error) => {
            console.error('Error al guardar la información de envío', error);
          }
        );
      },
      (error) => {
        console.error('Error al procesar el pago', error);
      }
    );
  }

  processPayment(order: any) {
    // pago info
    return this.http.post('http://127.0.0.1:8000/api/ordenes/', order);
  }

  // updatePlan(planId: number): Observable<any> {
  //   const userId = this.authService.getClienteIdFromSessionStorage(); // Obtén el ID del usuario logueado desde el AuthService

  //   // Crea el objeto con los datos a actualizar en el usuario
  //   const userUpdate = {
  //     plan_id: planId // Actualiza la propiedad "plan_id" con el valor de "planId"
  //   };

  //   // Realiza la solicitud PUT para actualizar el usuario
  //   return this.http.put<any>(`http://127.0.0.1:8000/api/clientes/${userId}`, userUpdate);
  // }

  saveShippingInformation(userUpdate: any) {

    // envio info
    return this.http.put(`http://127.0.0.1:8000/api/clientes/${this.authService.getClienteIdFromSessionStorage()}`, userUpdate);
  }

  

  showPaymentForm(): void {
    const paymentForm = document.getElementById('payment-form');
    const buttonContainer = document.getElementById('button-container');
    const submitContainer = document.getElementById('submit-container');

    if (paymentForm && buttonContainer && submitContainer) {
      paymentForm.style.display = 'block';
      buttonContainer.style.display = 'none';
      submitContainer.style.display = 'block';
    }
  }

  validarNombre(): boolean {
    if (!this.nombre) {
      return false; // El campo está vacío, no es válido
    }
    
    // Verificar si el campo cumple con las condiciones necesarias, como la longitud mínima, formato, etc.
    return this.nombre.length > 0;
  }
  
  validarApellido(): boolean {
    if (!this.apellido) {
      return false; // El campo está vacío, no es válido
    }
    
    // Verificar si el campo cumple con las condiciones necesarias, como la longitud mínima, formato, etc.
    return this.apellido.length > 0;
  }
  
  emailValido(): boolean {
    if (!this.email) {
      return false; // El campo está vacío, no es válido
    }
    
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validar si el correo electrónico cumple con el formato esperado
    return emailRegex.test(this.email);
  }
  
  validarNumeroTarjeta(): boolean {
    if (!this.payment.cardNumber) {
      return false; // El campo está vacío, no es válido
    }
  
    // Expresión regular para validar el número de tarjeta
    const cardNumberRegex = /^\d{16}$/;
  
    // Validar si el número de tarjeta cumple con el formato esperado
    const isValid = cardNumberRegex.test(this.payment.cardNumber);
  
    return isValid || this.payment.cardNumber === '';
  }
  
  
  validarFechaVencimiento(): boolean {
    if (!this.payment.expDate) {
      return false; // El campo está vacío, no es válido
    }
  
    // Expresión regular para validar el formato de la fecha de vencimiento (MM/AA)
    const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  
    // Validar si la fecha de vencimiento cumple con el formato esperado
    const isValid = expDateRegex.test(this.payment.expDate);
  
    return isValid || this.payment.expDate === '';
  }
  
  validarCVV(): boolean {
    if (!this.payment.cvv) {
      return false; // El campo está vacío, no es válido
    }
  
    // Expresión regular para validar el CVV (código de seguridad de la tarjeta)
    const cvvRegex = /^\d{3}$/;
  
    // Validar si el CVV cumple con el formato esperado
    const isValid = cvvRegex.test(this.payment.cvv);
  
    return isValid || this.payment.cvv === '';
  }

  
  validarTelefono(): boolean {
    if (!this.payment.telefono) {
      return false; // El campo está vacío, no es válido
    }
    // Expresión regular para validar el número de teléfono (solo dígitos)
    const phoneRegex = /^\d+$/;
  
    // Validar si el número de teléfono cumple con el formato esperado
    return phoneRegex.test(this.payment.telefono);
  }
  
}
