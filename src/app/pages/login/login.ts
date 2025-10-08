import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    // Just UI placeholder; later connect to API
    if(this.email && this.password) {
      alert(`Logged in as ${this.email}`);
      this.router.navigate(['/']); // Redirect to home
    } else {
      alert('Please enter email and password');
    }
  }
}
