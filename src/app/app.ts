import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginCliente } from './components/login-cliente/login-cliente';

@Component({
  selector: 'app-root',
  standalone: true, // Siempre recomendado ponerlo explícitamente
  imports: [
    RouterOutlet, // Permite inyectar las rutas (como el RegistrarCliente)
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('261CC341AngularTawsFrontend');
}
