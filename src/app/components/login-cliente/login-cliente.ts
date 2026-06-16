import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-cliente',
  imports: [],
  templateUrl: './login-cliente.html',
  styleUrl: './login-cliente.css',
})
export class LoginCliente {
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
