import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports:[CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist implements OnInit {
  wishlist: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlist = this.wishlistService.getWishlist();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.wishlistService.removeFromWishlist(product);
    this.loadWishlist(); // Refresh the view
    alert(`${product.name} added to cart 🛒`);
  }

  removeFromWishlist(product: any) {
    this.wishlistService.removeFromWishlist(product);
    this.loadWishlist();
  }
}
