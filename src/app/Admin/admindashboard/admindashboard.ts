import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth';
import { OrderService } from '../../services/order';

// ✅ Define the AdminTab type (Fixes the error)
type AdminTab = 'products' | 'inventory' | 'orders';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admindashboard.html',
  styleUrls: ['./admindashboard.css']
})
export class Admindashboard implements OnInit {
  username = '';
  activeTab: AdminTab = 'products'; // ✅ No more error
  loading = false;
  products: any[] = [];
  orders: any[] = []; 
  allOrders: any[] = [];
  searchTerm = '';

  // new product form model
  newProduct = {
    name: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    isActive: true
  };

  // edit form model
  editProduct: any = null;

  constructor(
    private productService: ProductService, 
    private authService: AuthService ,  
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'Admin';
    this.loadProducts();
    this.loadOrders();
  }

  /** 🔹 Switch Tabs */
  setTab(tab: AdminTab) {
    this.activeTab = tab;
  }

  /** 🔹 Load All Products */
  loadProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (res: any) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load products:', err);
        this.loading = false;
      }
    });
  }

  /** 🔹 Add Product (POST) */
  addProduct() {
    // Validation check
    if (
      !this.newProduct.name.trim() ||
      !this.newProduct.brand.trim() ||
      !this.newProduct.category.trim() ||
      !this.newProduct.imageUrl.trim() ||
      !this.newProduct.description.trim() ||
      this.newProduct.price <= 0 ||
      this.newProduct.stock <= 0
    ) {
      alert('⚠️ All fields are mandatory and must be valid.');
      return;
    }

    this.loading = true;
    this.productService.add(this.newProduct).subscribe({
      next: () => {
        alert('✅ Product added successfully!');
        this.resetForm();
        this.loadProducts();
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Add product failed:', err);
        alert('❌ Failed to add product');
        this.loading = false;
      }
    });
  }

  /** 🔹 Reset form after add */
  resetForm() {
    this.newProduct = {
      name: '',
      brand: '',
      category: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: '',
      isActive: true
    };
  }

  /** 🔹 Start Editing Product */
  startEdit(product: any) {
    // clone full product
    this.editProduct = { ...product };
  }

  /** 🔹 Update Product (PUT) */
 
updateProduct() {
  if (!this.editProduct || !this.editProduct.id) {
    alert('⚠️ No product selected to update.');
    return;
  }

  // Validate required fields
  if (
    !this.editProduct.name?.trim() ||
    !this.editProduct.brand?.trim() ||
    !this.editProduct.category?.trim() ||
    !this.editProduct.imageUrl?.trim() ||
    this.editProduct.price <= 0 ||
    this.editProduct.stock < 0
  ) {
    alert('⚠️ Please fill all mandatory fields correctly.');
    return;
  }

  // ✅ Ensure the payload includes all properties backend expects
  const payload = {
    id: this.editProduct.id,
    name: this.editProduct.name,
    brand: this.editProduct.brand,
    category: this.editProduct.category,
    description: this.editProduct.description || '',
    price: this.editProduct.price,
    stock: this.editProduct.stock,
    imageUrl: this.editProduct.imageUrl,
    isActive: this.editProduct.isActive ?? true
  };

  console.log('🛰️ Updating product with payload:', payload);

  this.loading = true;
  this.productService.update(this.editProduct.id, payload).subscribe({
  next: (res) => {
    // Handle both NoContent (204) and OK (200)
    if (res === null || res === undefined) {
      console.log('✅ Product updated (204 No Content)');
    } else {
      console.log('✅ Product updated:', res);
    }

    alert('✅ Product updated successfully!');
    this.editProduct = null;
    this.loadProducts();
    this.loading = false;
  },
  error: (err) => {
    // Some APIs return 200/204 but Angular still treats it as error — double-check status
    if (err.status === 200 || err.status === 204) {
      console.log('⚠️ False error (NoContent):', err);
      alert('✅ Product updated successfully!');
      this.editProduct = null;
      this.loadProducts();
      this.loading = false;
      return;
    }

    console.error('❌ Update failed:', err);
    alert('❌ Failed to update product. Check console for details.');
    this.loading = false;
  }
});
}



 
 /** 🔹 Delete Product (DELETE) */
deleteProduct(id: number) {
  if (!confirm('🗑️ Are you sure you want to delete this product?')) return;

  this.loading = true;
  this.productService.delete(id).subscribe({
    next: (res) => {
      // Handle both 204 NoContent and normal responses
      if (res === null || res === undefined) {
        console.log('✅ Product deleted (204 No Content)');
      } else {
        console.log('✅ Product deleted:', res);
      }

      alert('🗑️ Product deleted successfully!');
      this.products = this.products.filter(p => p.id !== id);
      this.loading = false;
    },
    error: (err) => {
      // Some APIs return 204 but Angular flags it as error
      if (err.status === 200 || err.status === 204) {
        console.log('⚠️ False error (NoContent) on delete:', err);
        alert('🗑️ Product deleted successfully!');
        this.products = this.products.filter(p => p.id !== id);
        this.loading = false;
        return;
      }

      console.error('❌ Delete failed:', err);
      alert('❌ Failed to delete product');
      this.loading = false;
    }
  });
}


  /** 🔹 Search by Product Name */
  searchProducts() {
    const keyword = this.searchTerm.trim();
    if (!keyword) {
      this.loadProducts();
      return;
    }

    this.loading = true;
    this.productService.search(keyword).subscribe({
      next: (res: any) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Search failed:', err);
        this.loading = false;
      }
    });
  }

  /** 🔹 Low Stock Helper */
  isLowStock(stock: number): boolean {
    return stock < 5;
  }


filterOrders() {
  const term = this.searchTerm.trim().toLowerCase();

  // if search box is empty → show all again
  if (!term) {
    this.orders = [...this.allOrders];
    return;
  }

  // filter by product name
  this.orders = this.allOrders.filter(order =>
    order.items?.some((item: any) =>
      item.product?.name?.toLowerCase().includes(term)
    )
  );
}



/** Load All Orders */
 loadOrders() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (res: any[]) => {
        this.allOrders = res;
        this.orders = [...res];  // display copy
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load orders:', err);
        this.loading = false;
      }
    });
  }

/** Update Order Status */
updateOrderStatus(order: any) {
  this.orderService.updateStatus(order.id, order.status).subscribe({
    next: () => alert(`✅ Order #${order.id} updated to ${order.status}`),
    error: (err) => console.error('❌ Failed to update order status:', err)
  });
}

/** Delete Order */
deleteOrder(id: number) {
  if (!confirm('🗑️ Are you sure you want to delete this order?')) return;

  this.orderService.deleteOrder(id).subscribe({
    next: () => {
      alert('✅ Order deleted successfully.');
      this.orders = this.orders.filter(o => o.id !== id);
    },
    error: (err) => {
      console.error('❌ Delete failed:', err);
      alert('❌ Failed to delete order.');
    }
  });
}





}

