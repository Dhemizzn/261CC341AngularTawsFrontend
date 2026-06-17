import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs';

import { AuthLoginService } from '../../services/auth-login.service';

@Component({
  selector: 'app-login-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-cliente.html',
  styleUrl: './login-cliente.css'
})
export class LoginCliente {
  private readonly formBuilder = inject(FormBuilder).nonNullable;
  private readonly authService = inject(AuthLoginService);
  private readonly router = inject(Router);

  loading = false;
  errorMessage = '';

  readonly form = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });

  iniciarSesion(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService
      .login(this.form.getRawValue())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          void this.router.navigate(['/mi-cuenta']);
        },
        error: error => {
          this.errorMessage =
            error?.error?.message ??
            'Correo o contraseña incorrectos.';
        }
      });
  }
}