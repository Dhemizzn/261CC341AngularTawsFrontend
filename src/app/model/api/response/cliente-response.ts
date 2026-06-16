export interface ClienteResponse {
  idCliente: string;
  nombre: string;
  apellidoPrimero: string;
  apellidoSegundo: string;
  telefono: string;
  email: string;
  numeroDni: string;
  numeroRuc: string | null;
}