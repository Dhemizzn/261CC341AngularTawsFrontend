import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarCliente } from './registrar-cliente';
import { ClienteService } from '../../services/cliente';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

describe('RegistrarCliente', () => {
  let component: RegistrarCliente;
  let fixture: ComponentFixture<RegistrarCliente>;
  let clienteServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    clienteServiceMock = {
      registrar: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

    vi.stubGlobal('alert', vi.fn());

    await TestBed.configureTestingModule({
      imports: [RegistrarCliente],
      providers: [
        { provide: ClienteService, useValue: clienteServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería registrar un cliente correctamente', () => {
    clienteServiceMock.registrar.mockReturnValue(of({}));

    component.guardar({} as any);

    expect(clienteServiceMock.registrar).toHaveBeenCalledWith(component.request);
    expect(window.alert).toHaveBeenCalledWith('Registro exitoso.');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('debería mostrar el mensaje de error enviado por el servidor', () => {
    clienteServiceMock.registrar.mockReturnValue(
      throwError(() => ({
        status: 400,
        error: 'Error al registrar'
      }))
    );

    component.guardar({} as any);

    expect(clienteServiceMock.registrar).toHaveBeenCalledWith(component.request);
    expect(window.alert).toHaveBeenCalledWith('Error al registrar');
  });

  it('debería mostrar un mensaje cuando ocurre un error de red', () => {
    clienteServiceMock.registrar.mockReturnValue(
      throwError(() => ({
        status: 0
      }))
    );

    component.guardar({} as any);

    expect(window.alert).toHaveBeenCalledWith(
      'Error en la red: No es posible conectar con el servidor.'
    );
  });

  it('debería navegar al login', () => {
    component.goToLogin();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});