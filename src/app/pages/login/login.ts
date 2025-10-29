import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields!');
      return;
    }

    this.loading = true;

    const data: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: (response) => {
        this.loading = false;
        alert('✅ Login successful!');

        // Save token and role in localStorage
        this.authService.saveToken(response.token, response.role, response.username);

        // Redirect based on role
        if (response.role.toLowerCase() === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/']);
        }

        // Clear inputs
        this.email = '';
        this.password = '';
      },
      error: (err) => {
        this.loading = false;
        alert('❌ Invalid credentials or server error!');
        console.error('Login Error:', err);
      }
    });
  }
}
