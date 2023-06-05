import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Subject } from 'rxjs';
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

  seccionInvisible: number = 2;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  domicilio: string = '';
  pais: string = ''; // Propiedad añadida
  provincia: string = ''; // Propiedad añadida
  cp: string = ''; // Propiedad añadida
  cartItems: any[] = [];
  cartTotal: number = 0;
  payment: any = {
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardName: '',
    cardExpiry: ''
  };
  seccionActual: number = 1;
  seccionVisible: number = 1;
  confirmationMessage: string = '';

  constructor(
    private router: Router,
    private cartService: CartService,
    private formService: FormService,
    private http: HttpClient
  ) {}
//simular pago

private isPaymentTestData() {
  return (
    this.payment.cardNumber === '4111111111111111' &&
    this.payment.expDate === '12/23' &&
    this.payment.cvv === '123'
  );
  console.log("test llamado")
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
    let errorMessage = 'Por favor, completa los siguientes campos:';
    
    if (!this.validarNombre()) {
      errorMessage += '\n- Nombre';
    }

    if (!this.validarApellido()) {
      errorMessage += '\n- Apellido';
    }

    if (!this.emailValido()) {
      errorMessage += '\n- Email válido';
    }

    if (!this.domicilio) {
      errorMessage += '\n- Domicilio';
    }

    if (isPaymentValid && !isPaymentTestData && !this.payment.cardName) {
      errorMessage += '\n- Nombre en la tarjeta';
    }

    if (!isPaymentValid && !isPaymentTestData) {
      if (!this.validarNumeroTarjeta()) {
        errorMessage += '\n- Número de tarjeta inválido. Debe contener 16 dígitos.';
      }

      if (!this.validarFechaVencimiento()) {
        errorMessage += '\n- Fecha de vencimiento inválida. Use el formato MM/AA.';
      }

      if (!this.validarCVV()) {
        errorMessage += '\n- CVV inválido. Debe contener 3 dígitos.';
      }
    }

    window.alert(errorMessage);
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

    // Cambiar a la sección 3
    this.seccionVisible = 3;
    this.seccionActual = 3;
    this.nombre = ''; // Limpiando los campos de entrada
    this.apellido = '';
    this.email = '';
    this.domicilio = '';
    this.mostrarSeccion3 = true;
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
    if (
      !this.payment.cardNumber ||
      !this.payment.expDate ||
      !this.payment.cvv ||
      !this.payment.cardName
    ) {
      let errorMessage = 'Por favor, complete los siguientes campos:';
  
      if (!this.payment.cardNumber) {
        errorMessage += '\n- Número de tarjeta';
      } else if (!/^\d{16}$/.test(this.payment.cardNumber)) {
        errorMessage += '\n- Número de tarjeta inválido. Debe contener 16 dígitos.';
      }
  
      if (!this.payment.expDate) {
        errorMessage += '\n- Fecha de vencimiento';
      } else if (!/^\d{2}\/\d{2}$/.test(this.payment.expDate)) {
        errorMessage += '\n- Fecha de vencimiento inválida. Use el formato MM/AA.';
      }
  
      if (!this.payment.cvv) {
        errorMessage += '\n- CVV';
      } else if (!/^\d{3}$/.test(this.payment.cvv)) {
        errorMessage += '\n- CVV inválido. Debe contener 3 dígitos.';
      }
  
      if (!this.payment.cardName) {
        errorMessage += '\n- Nombre en la tarjeta';
      }
  
      window.alert(errorMessage);
      return;
    }
    // Create an order object with the necessary information
    const order = {
      items: this.cartItems,
      total: this.calculateTotal(),
      payment: this.payment
    };

    // Process the payment
    this.processPayment(order).subscribe(
      (response) => {
        console.log('Pago procesado correctamente', response);

        // Save the shipping information
        this.saveShippingInformation(this.formData).subscribe(
          () => {
            console.log('Información de envío guardada correctamente');

            // Redirect to the PayPal sandbox
            window.location.href = 'https://developer.paypal.com/tools/sandbox/';

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
    return this.http.post('http://127.0.0.1:8000/api/cliente', order);
  }

  saveShippingInformation(shippingData: any) {
    // envio info
    return this.http.post('http://127.0.0.1:8000/api/cliente', shippingData);
  }

  redirectToMercadoLibreSandbox(): void {
    // Redirigir al sandbox de Mercado Libre
    window.location.href = 'URL_DEL_SANDBOX_DE_MERCADO_LIBRE';
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
    return this.nombre.length > 0;
  }

  validarApellido(): boolean {
    return this.apellido.length > 0;
  }
  emailValido(): boolean {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validar si el correo electrónico cumple con el formato esperado
    return emailRegex.test(this.email);
  }
  
  validarNumeroTarjeta(): boolean {
    // Expresión regular para validar el número de tarjeta
    const cardNumberRegex = /^\d{16}$/;
  
    // Validar si el número de tarjeta cumple con el formato esperado
    return cardNumberRegex.test(this.payment.cardNumber);
  }
  
  validarFechaVencimiento(): boolean {
    // Expresión regular para validar el formato de la fecha de vencimiento (MM/AA)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  
    // Validar si la fecha de vencimiento cumple con el formato esperado
    return expiryDateRegex.test(this.payment.expDate);
  }
  
  validarCVV(): boolean {
    // Expresión regular para validar el CVV (código de seguridad de la tarjeta)
    const cvvRegex = /^\d{3}$/;
  
    // Validar si el CVV cumple con el formato esperado
    return cvvRegex.test(this.payment.cvv);
  }
  
  validarTelefono(): boolean {
    // Expresión regular para validar el número de teléfono (solo dígitos)
    const phoneRegex = /^\d+$/;
  
    // Validar si el número de teléfono cumple con el formato esperado
    return phoneRegex.test(this.formData.telefono);
  }
  
}
