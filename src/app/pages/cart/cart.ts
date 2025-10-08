import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = true;
  total: number = 0;
  userID = 1; // Replace with logged-in user ID

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCart(this.userID).subscribe({
      next: (cart) => {
        this.cartItems = cart.items;
        this.calculateTotal();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  increaseQty(item: CartItem) {
    if (item.quantity < item.product.quantity) {
      item.quantity++;
      this.cartService.updateCartItem(item).subscribe(() => this.calculateTotal());
    }
  }

  decreaseQty(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item).subscribe(() => this.calculateTotal());
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeCartItem(item.id).subscribe(() => {
      this.cartItems = this.cartItems.filter(i => i.id !== item.id);
      this.calculateTotal();
    });
  }

  checkout() {
    this.cartService.checkout(this.userID).subscribe(() => {
      alert('Order placed successfully!');
      this.router.navigate(['/checkout']); // redirect to checkout page
    });
  }
}
