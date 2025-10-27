// wishlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private apiUrl = 'https://localhost:7279/api/Products'; //new
  constructor(private http: HttpClient) {}  //new
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
