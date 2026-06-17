import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  AuthLoginRequest
} from '../model/api/request/auth-login-request';
import {
  AuthLoginResponse
} from '../model/api/response/auth-login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'taws_access_token';

  login(
    request: AuthLoginRequest
  ): Observable<AuthLoginResponse> {
    return this.http
      .post<AuthLoginResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(
        tap(response => {
          const token =
            response.token ??
            response.accessToken;

          if (!token) {
            throw new Error(
              'El servidor no devolvió un token de autenticación.'
            );
          }

          localStorage.setItem(
            this.tokenKey,
            token
          );
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(
      this.tokenKey
    );
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(
      this.tokenKey
    );
  }
}