import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class Topbar {
  isLoggedIn = false;       // Change to true to test logged-in UI
  username = 'Chandana';
  cartCount = 3;

  logout() {
    this.isLoggedIn = false;
    alert('Logged out!');
  }
}

