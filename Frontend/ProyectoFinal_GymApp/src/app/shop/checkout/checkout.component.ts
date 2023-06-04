import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;

  payment: any = {
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardName: '',
    cardExpiry: ''
  };
  confirmationMessage: string = '';

  constructor(private router: Router) {}

  calculateTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  placeOrder(): void {
    // Validate the payment fields
    if (!this.payment.cardNumber || !this.payment.expDate || !this.payment.cvv || !this.payment.cardName) {
      console.log('Por favor, completar los datos de pago');
      return;
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
    window.location.href = 'https://www.sandbox.paypal.com';

    this.confirmationMessage = 'Order enviada';
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
  }
}
