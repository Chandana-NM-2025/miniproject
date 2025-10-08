import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  productID: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  product: Product;
  quantity: number;
}

export interface ShopCart {
  id: number;
  userId: number;
  createdAt: string;
  items: CartItem[];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'https://localhost:7147/api/Carts'; // replace with your backend API

  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<ShopCart> {
    return this.http.get<ShopCart>(`${this.baseUrl}/${userId}`);
  }

  addToCart(cartItem: { userID: number; productID: number; quantity: number }) {
    return this.http.post(`${this.baseUrl}/add`, cartItem);
  }

  updateCartItem(item: CartItem) {
    return this.http.put(`${this.baseUrl}/update`, item);
  }

  removeCartItem(itemId: number) {
    return this.http.delete(`${this.baseUrl}/${itemId}`);
  }

  checkout(userId: number) {
    return this.http.post(`${this.baseUrl}/checkout`, { userId });
    
  }
}
