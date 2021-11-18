import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  apiUrl = 'http://dev-isf-ticketing-app.azurewebsites.net';
  allUsersUrl = `${this.apiUrl}/api/v1/admin/user/`;
  loginUrl = `${this.apiUrl}/api/v1/identity/token`;
  logoutUrl = `${this.apiUrl}/api/v1/identity/logout`;
  userMeUrl = `${this.apiUrl}/api/v1/user/me`;
}
