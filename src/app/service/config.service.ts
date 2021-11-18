import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  apiUrl = 'http://dev-isf-ticketing-app.azurewebsites.net';
  allUsersUrl = `${this.apiUrl}/api/v1/admin/user/`;
}
