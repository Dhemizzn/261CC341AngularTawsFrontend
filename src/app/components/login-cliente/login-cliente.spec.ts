import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginCliente } from './login-cliente';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

describe('LoginCliente', () => {
  let component: LoginCliente;
  let fixture: ComponentFixture<LoginCliente>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

    vi.stubGlobal('alert', vi.fn());

    await TestBed.configureTestingModule({
      imports: [LoginCliente, FormsModule],
      providers: [
        { provide: AuthLoginService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia llamar al servicio de login cuando las credenciales son correctas', () => {
    authServiceMock.login.mockReturnValue(of({}));

    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Login successful!');
  });

  it('deberia mostrar alerta cuando el login falla', () => {
    authServiceMock.login.mockReturnValue(
      throwError(() => ({ error: 'Error' }))
    );

    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalled();

    expect(window.alert).toHaveBeenCalledWith(
      'Login failed: Invalid email or password.'
    );
  });
});