import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
import { CartComponent } from './pages/cart/cart';
import { OrderComponent } from './pages/orders/orders';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Contact } from './pages/contact/contact';
import { Wishlist} from './pages/wishlist/wishlist';
import { authGuard } from './guards/auth-guard';
// import { Admindashboard } from './Admin/admindashboard/admindashboard';
import { AdminGuard } from './guards/admin.guard';



export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: Wishlist, canActivate: [authGuard] },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'contact', component: Contact },

  // { path: 'admin-dashboard', component: Admindashboard },
  { path: 'admin-dashboard',
    loadComponent: () => import('./Admin/admindashboard/admindashboard').then(m => m.Admindashboard),
    canActivate: [AdminGuard]
  },
 
  
  { path: '**', redirectTo: '' } // fallback for 404
];
