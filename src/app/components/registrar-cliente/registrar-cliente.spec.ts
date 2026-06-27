import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarCliente } from './registrar-cliente';
import { ClienteService } from '../../services/cliente';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
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
      imports: [RegistrarCliente, FormsModule],
      providers: [
        { provide: ClienteService, useValue: clienteServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia registrar un cliente cuando el formulario es valido', () => {
    const mockForm = {
      invalid: false
    } as NgForm;

    clienteServiceMock.registrar.mockReturnValue(of({ success: true }));

    component.guardar(mockForm);

    expect(clienteServiceMock.registrar).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('deberia mostrar alerta cuando el formulario es invalido', () => {
    const mockForm = {
      invalid: true
    } as NgForm;

    component.guardar(mockForm);

    expect(clienteServiceMock.registrar).not.toHaveBeenCalled();

    expect(window.alert).toHaveBeenCalledWith(
      'Formulario inválido. Por favor, complete todos los campos requeridos.'
    );
  });

  it('deberia mostrar alerta cuando ocurre un error al registrar', () => {
    const mockForm = {
      invalid: false
    } as NgForm;

    clienteServiceMock.registrar.mockReturnValue(
      throwError(() => ({
        error: 'Error al registrar'
      }))
    );

    component.guardar(mockForm);

    expect(window.alert).toHaveBeenCalledWith('Error al registrar');
  });
});