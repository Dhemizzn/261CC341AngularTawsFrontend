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
    console.log(this.request);
    if(form.invalid) {
      alert('Formulario inválido. Por favor, complete todos los campos requeridos.');
      return;
    }else {
      this.clienteService.registrar(this.request).subscribe({
        
        next: (r) => {
          alert('Registrado');
          console.log(r);
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.log(e);
          alert(e.error);
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

}