import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService, WishlistItem } from '../../services/wishlist';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist implements OnInit {
  items: WishlistItem[] = [];
  message = '';
  loading = false;

  constructor(private wish: WishlistService, private cart: CartService) {}

  ngOnInit(): void {
    this.load();
  }

  /** 🔹 Load wishlist items */
  load() {
    this.loading = true;
    this.wish.getWishlist().subscribe({
      next: (res) => {
        this.items = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message = '❌ Failed to load wishlist';
      },
    });
  }

  /** 🔹 Remove item (instant update, no route) */
  remove(item: WishlistItem) {
    this.wish.removeFromWishlist(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== item.id); // instantly remove from UI
        this.message = `🗑️ ${item.product.name} removed from wishlist`;
      },
      error: (err) => {
        console.error('❌ Remove failed:', err);
        // handle Angular’s false 204 “error”
        if (err.status === 204 || err.status === 200) {
          this.items = this.items.filter(i => i.id !== item.id);
          this.message = `🗑️ ${item.product.name} removed from wishlist`;
        } else {
          this.message = `❌ Failed to remove ${item.product.name}`;
        }
      },
    });
  }

  /** 🔹 Move to cart (instant update, no reload) */
  moveToCart(item: WishlistItem) {
    this.wish.moveToCart(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== item.id);
        this.message = `✅ ${item.product.name} moved to cart`;
      },
      error: (err) => {
        console.error('❌ Move to cart failed:', err);
        if (err.status === 204 || err.status === 200) {
          this.items = this.items.filter(i => i.id !== item.id);
          this.message = `✅ ${item.product.name} moved to cart`;
        } else {
          this.message = '❌ Failed to move item to cart';
        }
      },
    });
  }
}
