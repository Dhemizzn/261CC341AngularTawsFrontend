import { Routes } from '@angular/router';
import { RegistrarCliente } from './components/registrar-cliente/registrar-cliente';
import { LoginCliente } from './components/login-cliente/login-cliente';

export const routes: Routes = [
  {
    path: 'register',
    component: RegistrarCliente, // Al cargar la app, se mostrará este componente de inmediato
  },
  {
    path: '',
    component: LoginCliente,
  },
];
