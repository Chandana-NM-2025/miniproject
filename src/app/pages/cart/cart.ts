import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { CartItem } from '../../services/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  message = '';
  total = 0;

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.cart.getCart().subscribe({
      next: res => {
        this.items = res;
        this.recalc();
      },
      error: () => this.message = 'Failed to load cart'
    });
  }

  recalc() {
    this.total = this.items.reduce((s, ci) => s + ci.product.price * ci.quantity, 0);
  }

 inc(item: CartItem) {
  if (item.quantity >= item.product.stock) {
    this.message = `⚠️ Only ${item.product.stock} units available`;
    setTimeout(() => this.message = '', 2000);
    return;
  }

  const newQty = item.quantity + 1;
  this.cart.updateCartItem(item.id, newQty).subscribe({
    next: () => {
      // ✅ instantly update UI
      item.quantity = newQty;
      this.recalc();
      this.message = `✅ Quantity updated for ${item.product.name}`;
      setTimeout(() => this.message = '', 2000);
    },
    error: (err) => {
      console.error('❌ Failed to update quantity:', err);
      if (err.status === 204 || err.status === 200) {
        item.quantity = newQty;
        this.recalc();
        this.message = `✅ Quantity updated for ${item.product.name}`;
        setTimeout(() => this.message = '', 2000);
      } else {
        this.message = '❌ Something went wrong';
      }
    }
  });
}

dec(item: CartItem) {
  if (item.quantity <= 1) {
    this.message = `⚠️ Quantity can’t go below 1`;
    setTimeout(() => this.message = '', 2000);
    return;
  }

  const newQty = item.quantity - 1;
  this.cart.updateCartItem(item.id, newQty).subscribe({
    next: () => {
      // ✅ instantly update UI
      item.quantity = newQty;
      this.recalc();
      this.message = `✅ Quantity updated for ${item.product.name}`;
      setTimeout(() => this.message = '', 2000);
    },
    error: (err) => {
      console.error('❌ Failed to update quantity:', err);
      if (err.status === 204 || err.status === 200) {
        item.quantity = newQty;
        this.recalc();
        this.message = `✅ Quantity updated for ${item.product.name}`;
        setTimeout(() => this.message = '', 2000);
      } else {
        this.message = '❌ Something went wrong';
      }
    }
  });
}


 remove(item: CartItem) {
  this.cart.removeFromCart(item.id).subscribe({
    next: () => { this.message = 'Removed from cart'; this.load(); },
    error: err => console.error('❌ Failed to remove:', err)
  });
}

  proceedToCheckout() {
    if (!this.items.length) { this.message = 'Cart is empty'; return; }
    this.router.navigate(['/orders']);
  }
}
