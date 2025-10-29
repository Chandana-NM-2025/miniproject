import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../Environment/environment';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.apiUrl}/Products`;

  constructor(private http: HttpClient) {}

  // ✅ Get all products
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}/all`);
  }

  // ✅ Get single product
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  // ✅ Add new product (admin only)
    add(product: any): Observable<any> {
    return this.http.post(`${this.base}/add`, product);
  }

  // ✅ Update product details

  /** 🔹 Update Product (PUT) */
update(id: number, product: any): Observable<any> {
  return this.http.put(`${this.base}/update/${id}`, product);
}


    

  // ✅ Update product stock
  updateStock(id: number, stock: number): Observable<any> {
    return this.http.put(`${this.base}/stock/${id}`, { stock });
  }

  // ✅ Check API connection
  checkApiConnection(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.base}/all`, { observe: 'response' });
  }
  
 searchProducts(query: string) {
  return this.http.get<Product[]>(`${this.base}/search?keyword=${encodeURIComponent(query)}`);
}

 delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/delete/${id}`);
  }

  search(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/search`, { params: { keyword } });
  }



}
