import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.idTokenClaims$.pipe(
      mergeMap((token) => {
        const rawToken = token?.__raw;
        if (rawToken) {
          const tokenReq = req.clone({
            setHeaders: { Authorization: `Bearer ${rawToken}` },
          });
          return next.handle(tokenReq);
        }
        return next.handle(req);
      }),
      catchError((err) => throwError(err))
    );
  }
}
