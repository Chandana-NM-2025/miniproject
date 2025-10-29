import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();

    if (role === 'Admin') {
      return true; // allow access
    } else {
      alert(' Access Denied! Admins only.');
      this.router.navigate(['/']); // redirect to home or login
      return false;
    }
  }
}
