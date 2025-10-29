
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth'; // ✅ Import AuthService

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class Topbar implements OnInit {
  isLoggedIn = false;
  username = '';
  cartCount = 0; // (later we’ll hook this to CartService)

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateAuthState();

    // ✅ Update dynamically when login/logout happens
    window.addEventListener('storage', () => this.updateAuthState());
  }

  // ✅ Check if logged in and fetch username
  updateAuthState() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername() || '';
  }

  // ✅ Logout
  logout() {
    this.authService.logout();
    alert('Logged out successfully!');
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigate(['/login']);
  }
}
