import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../services/product';
import { CartService } from '../../services/cart';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  pagedProducts: Product[] = [];
  loading = true;
  userID = 1;

  // Pagination
  currentPage = 1;
  pageSize = 20; // 5 columns × 4 rows
  totalPages = 1;

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        this.setPage(this.currentPage);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.products.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  addToCart(product: Product) {
    const cartItem = {
      userID: this.userID,
      productID: product.productID,
      quantity: 1
    };
    this.cartService.addToCart(cartItem).subscribe(() => {
      alert(`${product.name} added to cart!`);
      this.router.navigate(['/cart']); // redirect to cart page
    });
    
  }
}