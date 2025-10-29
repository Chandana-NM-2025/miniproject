// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { OrderComponent} from '../pages/orders/orders';



// export interface Order {
//   orderID: number;     // match C# casing
//   userID: number;
//   totalPrice: number;
//   orderDate: string;
//   status: string;
 
// }



// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   private apiUrl = 'https://localhost:7279/api/Orders';

//   constructor(private http: HttpClient) {}

//   getOrders(): Observable<Order[]> {
//     return this.http.get<Order[]>(this.apiUrl);
//   }

//   placeOrder(order: Partial<Order>): Observable<Order> {
//     return this.http.post<Order>(this.apiUrl, order);
//   }

//   deleteOrder(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
  
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../Environment/environment';
import { Observable } from 'rxjs';

export interface Address {
  id?: number;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = `${environment.apiUrl}/Orders`;
  constructor(private http: HttpClient) {}

  createAddress(address: Address): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.base}/addresses`, address);
  }

  placeOrder(addressId: number) {
    // COD only (backend expects just addressId)
    return this.http.post(`${this.base}/place`, { addressId });
  }

  getMyOrders() {
    return this.http.get(`${this.base}/my`);
  }

   getAllOrders(): Observable<any[]> {
  return this.http.get<any[]>(`${this.base}`);
}


  updateStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.base}/update-status/${orderId}`, { status });
  }
deleteOrder(orderId: number): Observable<any> {
  return this.http.delete(`${this.base}/${orderId}`);
}



}
