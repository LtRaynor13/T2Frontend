import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { ProductosComponent } from './pages/productos/productos';
import { PedidosComponent } from './pages/pedidos/pedidos';
import { LayoutComponent } from './sidebar/sidebar'; // Importa tu componente sidebar/layout
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: '',
    component: LayoutComponent, // <--- AQUÍ SE LLAMA EL SIDEBAR
    canActivate: [authGuard],     // <--- Protegido: solo entra si está logueado
    children: [
      { 
        path: 'productos', 
        component: ProductosComponent 
      },
      { 
        path: 'pedidos', 
        component: PedidosComponent 
      },
      { 
        path: '', 
        redirectTo: 'productos', 
        pathMatch: 'full' 
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];