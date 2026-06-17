import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ClienteRequest } from '../model/api/request/cliente-request';
import { ClienteUpdateRequest } from '../model/api/request/cliente-update-request';
import { ClienteResponse } from '../model/api/response/cliente-response';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/clientes`;

  registrar(request: ClienteRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(this.apiUrl, request);
  }

  obtenerMisDatos(): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.apiUrl}/me`);
  }

  actualizarMisDatos(
    request: ClienteUpdateRequest
  ): Observable<ClienteResponse> {
    return this.http.put<ClienteResponse>(`${this.apiUrl}/me`, request);
  }
}