import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente';
import { ClienteRequest } from '../../model/api/request/cliente-request';

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

  constructor(private clienteService: ClienteService) {}

  guardar() {
    console.log(this.request);

    this.clienteService.registrar(this.request).subscribe({
      next: (r) => {
        alert('Registrado');
        console.log(r);
      },
      error: (e) => {
        console.log(e);
        alert(JSON.stringify(e.error));
      }
    });
  }
}