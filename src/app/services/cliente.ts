import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteRequest } from '../model/api/request/cliente-request';
import { ClienteResponse } from '../model/api/response/cliente-response';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private api = 'http://localhost:8080/api/v1/cliente';

  constructor(private http: HttpClient) {}

  registrar(request: ClienteRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(this.api, request);
  }

}