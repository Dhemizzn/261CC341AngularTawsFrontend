export interface ClienteUpdateRequest {
  nombre: string;
  apellido?: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
}