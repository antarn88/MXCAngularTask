/* eslint-disable no-param-reassign */
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable()
export class JwtInterceptorService {

  constructor(
    private auth: AuthService,
    private config: ConfigService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.auth.currentUserValue;

    if (currentUser.userName) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.loginResponse.access_token}`,
          'X-OrganisationId': this.config.organisationId,
        },
      });
    }

    return next.handle(request);
  }
}
