import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../Environment/environment';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Product } from './product';

export interface WishlistItem {
  id: number; // wishlist item id
  productId: number;
  userId: number;
  product: Product;
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private base = `${environment.apiUrl}/Wishlist`;

  constructor(private http: HttpClient) {}

  /** 🔹 Get all wishlist items */
  getWishlist(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.base}`);
  }

  /** 🔹 Add product to wishlist */
  addToWishlist(productId: number) {
    return this.http.post(`${this.base}/add`, { productId });
  }

  /** 🔹 Remove wishlist item by ID (Handles 204/200 properly) */
  removeFromWishlist(id: number): Observable<void> {
    return this.http.delete(`${this.base}/remove/${id}`, {
      observe: 'response',
      responseType: 'text' as 'json'
    }).pipe(
      map(() => void 0),
      catchError(err => {
        // ✅ Treat 200 or 204 as success (Angular false error)
        if (err.status === 204 || err.status === 200) return of(void 0);
        console.error('❌ removeFromWishlist error:', err);
        return throwError(() => err);
      })
    );
  }

  /** 🔹 Move wishlist item to cart */
  moveToCart(id: number): Observable<void> {
    return this.http.post(`${this.base}/move-to-cart/${id}`, {}, {
      observe: 'response',
      responseType: 'text' as 'json'
    }).pipe(
      map(() => void 0),
      catchError(err => {
        if (err.status === 204 || err.status === 200) return of(void 0);
        console.error('❌ moveToCart error:', err);
        return throwError(() => err);
      })
    );
  }

  /** 🔹 Get count for topbar badge */
  count(): Observable<number> {
    return this.getWishlist().pipe(map(items => items.length));
  }
}
