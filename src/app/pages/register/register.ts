import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username = '';
  email = '';
  password = '';
  confirmPassword = ''; //if required

  constructor(private router: Router) {}

  register() {
    if (this.email && this.password && this.confirmPassword) {
      if (this.password === this.confirmPassword) {
        alert(`Registered successfully as ${this.email}`);
        this.router.navigate(['/login']); // Redirect to login
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Please fill in all fields');
    }
  }
}
