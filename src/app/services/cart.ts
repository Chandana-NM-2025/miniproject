import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../Environment/environment';
import { Observable, map } from 'rxjs';
import { Product } from './product';

export interface CartItem {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
  product: Product;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private base = `${environment.apiUrl}/Cart`;

  constructor(private http: HttpClient) {}

  // ✅ Get cart items
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.base);
  }

  // ✅ Add product to cart
  addToCart(productId: number, quantity = 1) {
    return this.http.post(`${this.base}/add`, { ProductID: productId, Quantity: quantity });
  }

  // ✅ Update quantity
  updateCartItem(itemId: number, quantity: number) {
  // send quantity as query param (backend expects it)
  return this.http.put(`${this.base}/update/${itemId}?quantity=${quantity}`, {});
}

  // ✅ Remove item from cart
  removeFromCart(itemId: number) {
  return this.http.delete(`${this.base}/remove/${itemId}`);
}
  // ✅ Clear entire cart
  clearCart() {
    return this.http.delete(`${this.base}/clear`);
  }

  // ✅ Count items
  count(): Observable<number> {
    return this.getCart().pipe(map(items => items.reduce((a, c) => a + c.quantity, 0)));
  }

  // ✅ Total price
  total(): Observable<number> {
    return this.getCart().pipe(map(items => items.reduce((s, c) => s + c.product.price * c.quantity, 0)));
  }
}
