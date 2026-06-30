import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginCliente } from './login-cliente';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';
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
      imports: [LoginCliente],
      providers: [
        { provide: AuthLoginService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al servicio de login cuando las credenciales son correctas', () => {
    authServiceMock.login.mockReturnValue(of({}));

    component.loginData = {
      email: 'correo@correo.com',
      password: '12345678'
    };

    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith(component.loginData);
    expect(window.alert).toHaveBeenCalledWith('Inicio de sesión exitoso.');
  });

  it('debería mostrar mensaje de error cuando falla el login', () => {
    authServiceMock.login.mockReturnValue(
      throwError(() => ({
        status: 401,
        error: 'Credenciales inválidas'
      }))
    );

    component.loginData = {
      email: 'correo@correo.com',
      password: '12345678'
    };

    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith(component.loginData);
    expect(window.alert).toHaveBeenCalledWith('Credenciales inválidas');
  });

  it('debería mostrar error de red cuando el servidor no responde', () => {
    authServiceMock.login.mockReturnValue(
      throwError(() => ({
        status: 0
      }))
    );

    component.onLogin();

    expect(window.alert).toHaveBeenCalledWith(
      'Error en la red: No es posible conectar con el servidor.'
    );
  });

  it('debería navegar al registro', () => {
    component.goToRegister();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/register']);
  });
});