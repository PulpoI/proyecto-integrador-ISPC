import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  mostrarSeccion3: boolean = false;

  seccionInvisible: number = 2;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  domicilio: string = '';
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

  constructor(private router: Router, private cartService: CartService) {}

  completarPago() {
    // Aquí puedes guardar la información del formulario

    // Cambiar a la sección 3
    this.seccionVisible = 3;
    this.seccionActual = 3;
    this.nombre = ''; // Limpiando los campos de entrada
    this.apellido = '';
    this.email = '';
    this.domicilio = '';
    this.mostrarSeccion3 = true;  }

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
      window.alert('Pago completado, '+this.payment.cardName+", se enviará un email con la factura a su email ");
  ;
      console.log('Por favor, completar los datos de pago');
      return 
      
    }

    // Process the payment or save shipping information
    // You can add the logic here to handle the payment or save shipping information
    // For example, you can make an HTTP request to a payment processing API or a backend server to handle the payment

    // Create an order object with the necessary information
    const order = {
      items: this.cartItems,
      total: this.calculateTotal(),
      payment: this.payment
    };

    // Simulate sending the order to the server
    // Here you can make an HTTP request to save the order to the database or perform other actions related to the order
    console.log('Enviando ordenes', order);

    // Redirect to the PayPal sandbox
    window.location.href = 'https://developer.paypal.com/tools/sandbox/';

    this.confirmationMessage = 'Orden enviada';
  }

  redirectToMercadoLibreSandbox(): void {
    // Redirigir al sandbox de Mercado Libre
    window.location.href = 'URL_DEL_SANDBOX_DE_MERCADO_LIBRE';
  }

  ngOnInit(): void {
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
}
