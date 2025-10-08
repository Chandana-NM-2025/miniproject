import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order';
import { Order } from '../../services/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  cancelOrder(order: Order) {
    this.orderService.deleteOrder(order.orderID).subscribe(() => {
      this.orders = this.orders.filter(o => o.orderID !== order.orderID);
      alert(`Order #${order.orderID} cancelled!`);
    });
  }

  placeOrder() {
  // Example: new order object
  const newOrder: Partial<Order> = {
    userID: 1, // later replace with logged-in user ID
    totalPrice: this.orders.reduce((sum, o) => sum + o.totalPrice, 0),
    status: 'Pending'
  };

  this.orderService.placeOrder(newOrder).subscribe({
    next: (createdOrder) => {
      this.orders.push(createdOrder);
      alert(`Order #${createdOrder.orderID} placed successfully!`);
    },
    error: (err) => {
      console.error('Order placement failed', err);
      alert('Failed to place order');
    }
  });
}

  }

