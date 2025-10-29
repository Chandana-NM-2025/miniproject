import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order';
import { Address } from '../../services/order';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrderComponent {
  addr: Address = {
    fullName: '', street: '', city: '', state: '', postalCode: '', country: ''
  };
  message = '';
  
  loading = false;

  constructor(private orders: OrderService, private cart: CartService, private router: Router) {}

  orderConfirmed = false;

placeOrder() {
  const a = this.addr;
  if (!a.fullName || !a.street || !a.city || !a.state || !a.postalCode || !a.country) {
    this.message = 'All address fields are mandatory.';
    alert('Please fill all fields!');
    return;
  }

  this.loading = true;

  this.orders.createAddress(this.addr).subscribe({
    next: (res) => {
      const addressId = res.id;
      this.orders.placeOrder(addressId).subscribe({
        next: () => {
          this.loading = false;
          this.orderConfirmed = true; // ✅ Trigger toast animation
          this.cart.count().subscribe();

          // Auto hide and redirect
          setTimeout(() => {
            this.orderConfirmed = false;
            this.router.navigate(['/products']);
          }, 4500);
        },
        error: () => {
          this.loading = false;
          this.message = 'Failed to place order';
        }
      });
    },
    error: () => {
      this.loading = false;
      this.message = 'Failed to save address';
    }
  });
}
}