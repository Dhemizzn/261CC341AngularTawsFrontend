export interface ClienteUpdateRequest {
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion?: string;
  fechaNacimiento?: string;
}