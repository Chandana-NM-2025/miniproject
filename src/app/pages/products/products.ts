import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  message = '';
  wishCount = 0;
  cartCount = 0;

  constructor(
    private productSvc: ProductService,
    private cartSvc: CartService,
    private wishSvc: WishlistService,
     private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const q = params['q'];
    if (q) {
      this.searchProducts(q);
    } else {
      this.load();
    }
  });
}


searchProducts(q: string) {
  this.loading = true;
  this.productSvc.searchProducts(q).subscribe({
    next: res => {
      this.products = res;
      this.loading = false;
      this.message = res.length ? '' : 'No products found.';
    },
    error: () => {
      this.loading = false;
      this.message = '❌ Failed to search products';
    }
  });
}

  // 🔹 Load all products
  load() {
    this.loading = true;
    this.productSvc.getAll().subscribe({
      next: res => {
        this.products = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message = '❌ Failed to load products';
      }
    });
    this.refreshBadges();
  }

  // 🔹 Refresh wishlist and cart count
  refreshBadges() {
    this.wishSvc.count().subscribe(c => this.wishCount = c);
    this.cartSvc.count().subscribe(c => this.cartCount = c);
  }

  // 🔹 Add to Cart
  addToCart(p: Product) {
    if (p.stock <= 0) {
      this.message = `❌ ${p.name} is out of stock`;
      return;
    }

    this.cartSvc.addToCart(p.id, 1).subscribe({
      next: () => {
        this.message = `✅ ${p.name} added to cart`;
        p.stock--; // update frontend stock immediately
        this.productSvc.updateStock(p.id, p.stock).subscribe();
        this.refreshBadges();
      },
      error: (err) => {
        if (err.status === 200 || err.status === 0) {
          this.message = `✅ ${p.name} added to cart`;
          p.stock--;
          this.refreshBadges();
        } else {
          this.message = `❌ Failed to add ${p.name} to cart`;
        }
      }
    });
  }

  // 🔹 Add to Wishlist
  addToWishlist(p: Product) {
    this.wishSvc.addToWishlist(p.id).subscribe({
      next: () => {
        this.message = `✅ ${p.name} added to wishlist`;
        this.refreshBadges();
      },
      error: (err) => {
        if (err.status === 200 || err.status === 0) {
          this.message = `✅ ${p.name} added to wishlist`;
          this.refreshBadges();
        } else {
          this.message = `❌ Failed to add ${p.name} to wishlist`;
        }
      }
    });
  }
}
