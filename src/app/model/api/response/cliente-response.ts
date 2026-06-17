export interface ClienteResponse {
  id: number;
  nombre: string;

  apellido?: string;
  email: string;
  telefono?: string;

  tipoDocumento?: string;
  numeroDocumento?: string;
  direccion?: string;
  fechaNacimiento?: string;

  codigoSocio?: string;
  estado?: string;
}