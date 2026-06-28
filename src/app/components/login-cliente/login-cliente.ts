import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginService } from '../../services/auth-login.service';
import { AuthLoginRequest } from '../../model/api/request/auth-login-request';

@Component({
  selector: 'app-login-cliente',
  imports: [FormsModule],
  templateUrl: './login-cliente.html',
  styleUrl: './login-cliente.css',
})
export class LoginCliente {
  loginData = {
    email: '',
    password: '',
  };
  //private login: AuthLoginRequest;

  constructor(
    private router: Router,
    private authService: AuthLoginService,
  ) {}

  onLogin() {
    console.log('Attempting login with:', this.loginData);

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        alert('Inicio de sesión exitoso.');
        console.log(response);
        //this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error(err);
        if (err.status == 0) {
          alert('Error en la red: No es posible conectar con el servidor.')
        } else {
          alert(err.error);  
        }
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
