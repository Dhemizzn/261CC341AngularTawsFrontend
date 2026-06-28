import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente';
import { ClienteRequest } from '../../model/api/request/cliente-request';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar-cliente.html',
  styleUrl: './registrar-cliente.css'
})
export class RegistrarCliente {
  
  request: ClienteRequest = {
    nombre: '',
    apellidoPrimero: '',
    apellidoSegundo: '',
    telefono: '',
    email: '',
    numeroDni: '',
    numeroRuc: null,
    password: ''
  };

  constructor(private clienteService: ClienteService, private router: Router) {}

  guardar(form: NgForm) {
    console.log('Attempting register with:', this.request);

    this.clienteService.registrar(this.request).subscribe({
      next: (response) => {
        alert('Registro exitoso.');
        console.log(response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      if (err.status == 0) {
        alert('Error en la red: No es posible conectar con el servidor.')
      } else {
        alert(err.error);  
      }
      }
    });    
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

}