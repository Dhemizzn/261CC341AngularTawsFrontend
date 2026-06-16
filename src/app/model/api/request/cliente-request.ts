export interface ClienteRequest {
  nombre: string;
  apellidoPrimero: string;
  apellidoSegundo: string;
  telefono: string;
  email: string;
  numeroDni: string;
  numeroRuc?: string | null; // Es opcional
  password: string;
}
