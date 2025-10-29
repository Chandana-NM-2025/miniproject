import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, RegisterRequest } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username = '';
  email = '';
  password = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.username || !this.email || !this.password) {
      alert('Please fill all fields!');
      return;
    }

    this.loading = true;

    const data: RegisterRequest = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(data).subscribe({
      next: (res) => {
        this.loading = false;
        alert('🎉 Registered successfully! You can now log in.');
        this.router.navigate(['/login']);

        // Clear form fields
        this.username = '';
        this.email = '';
        this.password = '';
      },
      error: (err) => {
        this.loading = false;
        alert('❌ Registration failed! Please try again.');
        console.error('Register Error:', err);
      }
    });
  }
}
