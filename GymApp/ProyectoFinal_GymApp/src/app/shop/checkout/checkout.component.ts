import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartItems: any[] = [];
  cartTotal: number = 0;
  items: any[] = [];
  total: number = 0;

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
    // Validar los campos de pago, por ejemplo:
    if (!this.payment.cardNumber || !this.payment.expDate || !this.payment.cvv) {
      console.log('Por favor completa todos los campos de pago');
      return;
    }

    // Crear un objeto de pedido con la información necesaria
    const order = {
      items: this.items,
      total: this.calculateTotal(),
      payment: this.payment
    };

    // Simular el envío del pedido al servidor
    // Aquí puedes hacer una solicitud HTTP para guardar el pedido en la base de datos o realizar otras acciones relacionadas con el pedido
    console.log('Enviando pedido al servidor y realizando pedido', order);

    // Redirigir a la página de confirmación después de realizar el pedido
    this.router.navigate(['ruta-de-confirmacion']);
    this.confirmationMessage = 'Pedido realizado correctamente';
  }
}
