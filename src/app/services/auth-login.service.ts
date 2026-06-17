import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthLoginRequest } from '../model/api/request/auth-login-request';
import { inject } from '@angular/core/primitives/di';
import { ClienteResponse } from '../model/api/response/cliente-response';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  private api = 'http://localhost:8080/api/v1/cliente/login';
  private http = inject(HttpClient);
  login(credentials: AuthLoginRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(this.api, credentials);
  }
}
