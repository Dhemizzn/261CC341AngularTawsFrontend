import { Routes } from '@angular/router';
import { RegistrarCliente } from './component/registrar-cliente/registrar-cliente';

export const routes: Routes = [
  {
    path: '',
    component: RegistrarCliente // Al cargar la app, se mostrará este componente de inmediato
  }
];