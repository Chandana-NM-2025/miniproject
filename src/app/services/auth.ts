import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({ 
  providedIn: 'root' 
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  // 🔹 Register API
  register(data: RegisterRequest): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, data, {
    responseType: 'text' as 'json'   // ✅ prevents JSON parse error
  });
}


  // 🔹 Login API
  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // 🔹 Save Token + Role + Username
  saveToken(token: string, role: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  }

  // 🔹 Get Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 Get Role
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  // 🔹 Get Username
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // 🔹 Check Login
  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

   isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🔹 Logout
  logout(): void {
    localStorage.removeItem('token');
      localStorage.removeItem('role');
  localStorage.removeItem('username');
  }
}
//alert('You must log in to access this page!');   for alert
//console.warn('User not logged in. Redirecting...'); for no alert