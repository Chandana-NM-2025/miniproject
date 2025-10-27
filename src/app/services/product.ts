import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  productID: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = ''; // Add your API URL here

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
