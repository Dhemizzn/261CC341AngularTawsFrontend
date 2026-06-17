import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-cliente/login-cliente')
        .then(component => component.LoginCliente)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registrar-cliente/registrar-cliente')
        .then(component => component.RegistrarCliente)
  },
  {
    path: 'mi-cuenta',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/datos-usuario/datos-usuario')
        .then(component => component.DatosUsuario)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
