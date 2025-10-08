// wishlist.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = [];

  addToWishlist(product: any) {
    if (!this.isInWishlist(product)) {
      this.wishlist.push(product);
    }
  }

  removeFromWishlist(product: any) {
    this.wishlist = this.wishlist.filter(item => item.id !== product.id);
  }

  isInWishlist(product: any): boolean {
    return this.wishlist.some(item => item.id === product.id);
  }

  getWishlist() {
    return this.wishlist;
  }
}
