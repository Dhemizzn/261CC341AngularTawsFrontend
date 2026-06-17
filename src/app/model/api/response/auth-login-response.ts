import { ClienteResponse } from './cliente-response';

export interface AuthLoginResponse {
  token?: string;
  accessToken?: string;
  expiresIn?: number;
  cliente?: ClienteResponse;
}