import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  searchQuery = '';

  constructor(private router: Router) {}

  search() {
    const trimmed = this.searchQuery.trim();
    if (!trimmed) return;
    this.router.navigate(['/products'], { queryParams: { q: trimmed } });
  }
}
