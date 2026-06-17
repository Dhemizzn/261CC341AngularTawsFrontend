import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs';

import { ClienteService } from '../../services/cliente.service';
import { AuthLoginService } from '../../services/auth-login.service';

import {
  ClienteResponse
} from '../../model/api/response/cliente-response';

import {
  ClienteUpdateRequest
} from '../../model/api/request/cliente-update-request';

@Component({
  selector: 'app-datos-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './datos-usuario.html',
  styleUrl: './datos-usuario.css'
})
export class DatosUsuario implements OnInit {
  private readonly formBuilder =
    inject(FormBuilder).nonNullable;

  private readonly clienteService =
    inject(ClienteService);

  private readonly authService =
    inject(AuthLoginService);

  private readonly router =
    inject(Router);

  cliente: ClienteResponse | null = null;

  loading = true;
  saving = false;
  editando = false;

  errorMessage = '';
  successMessage = '';

  readonly form = this.formBuilder.group({
    nombre: [
      '',
      Validators.required
    ],
    apellido: [
      '',
      Validators.required
    ],
    telefono: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{9}$/)
      ]
    ],
    direccion: [''],
    fechaNacimiento: ['']
  });

  get nombreCompleto(): string {
    if (!this.cliente) {
      return '';
    }

    return [
      this.cliente.nombre,
      this.cliente.apellido
    ]
      .filter(Boolean)
      .join(' ');
  }

  get iniciales(): string {
    if (!this.cliente) {
      return '';
    }

    const inicialNombre =
      this.cliente.nombre
        ?.charAt(0)
        .toUpperCase() ?? '';

    const inicialApellido =
      this.cliente.apellido
        ?.charAt(0)
        .toUpperCase() ?? '';

    return `${inicialNombre}${inicialApellido}`;
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.clienteService
      .obtenerMisDatos()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (cliente: ClienteResponse) => {
          this.cliente = cliente;
          this.cargarFormulario(cliente);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage =
            this.obtenerMensajeError(
              error,
              'No se pudieron cargar los datos del usuario.'
            );
        }
      });
  }

  habilitarEdicion(): void {
    this.editando = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.cliente) {
      this.cargarFormulario(this.cliente);
    }
  }

  guardar(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();

    const request: ClienteUpdateRequest = {
      nombre: values.nombre.trim(),
      apellido: values.apellido.trim(),
      telefono: values.telefono.trim(),
      direccion:
        values.direccion.trim() || undefined,
      fechaNacimiento:
        values.fechaNacimiento || undefined
    };

    this.saving = true;

    this.clienteService
      .actualizarMisDatos(request)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe({
        next: (
          clienteActualizado: ClienteResponse
        ) => {
          this.cliente = clienteActualizado;

          this.cargarFormulario(
            clienteActualizado
          );

          this.editando = false;

          this.successMessage =
            'Los datos fueron actualizados correctamente.';
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage =
            this.obtenerMensajeError(
              error,
              'No se pudieron actualizar los datos.'
            );
        }
      });
  }

  cerrarSesion(): void {
    this.authService.logout();

    void this.router.navigate([
      '/login'
    ]);
  }

  private cargarFormulario(
    cliente: ClienteResponse
  ): void {
    this.form.patchValue({
      nombre:
        cliente.nombre ?? '',
      apellido:
        cliente.apellido ?? '',
      telefono:
        cliente.telefono ?? '',
      direccion:
        cliente.direccion ?? '',
      fechaNacimiento:
        cliente.fechaNacimiento ?? ''
    });
  }

  private obtenerMensajeError(
    error: HttpErrorResponse,
    mensajePredeterminado: string
  ): string {
    const mensajeBackend =
      typeof error.error === 'object'
        ? error.error?.message
        : null;

    return (
      mensajeBackend ??
      error.message ??
      mensajePredeterminado
    );
  }
}