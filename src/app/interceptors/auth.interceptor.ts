import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { AuthLoginService } from '../services/auth-login.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthLoginService);
  const token = authService.getToken();

  if (!token) {
    return next(request);
  }

  const authenticatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authenticatedRequest);
};