import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUserSubject$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  loginResponse:
    { access_token: string; token_type: string, expires_in: number; } = { access_token: '', token_type: '', expires_in: 0 };

  constructor(
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  async getLocalStorageData(): Promise<boolean> {
    if (localStorage[this.config.storageName]) {
      this.loginResponse = JSON.parse(localStorage[this.config.storageName]);
      const user = await this.getUserMe(this.loginResponse.access_token);
      this.currentUserSubject$.next(user);
      return true;
    }
    return false;
  }

  get currentUserValue(): User {
    return this.currentUserSubject$.value;
  }

  async login(loginData: { userName: string, password: string; }): Promise<boolean> {
    try {
      const response = await lastValueFrom(
        this.http.post<{ access_token: string; token_type: string, expires_in: number; }>(this.config.loginUrl, loginData),
      );

      this.loginResponse = response;

      const user = await this.getUserMe(response.access_token);

      // Write loginResponse to localStorage if login was successful
      if (this.loginResponse.access_token) {
        localStorage.setItem(this.config.storageName, JSON.stringify(this.loginResponse));
      }

      this.currentUserSubject$.next(user);
      console.log('Successful login!');
      this.router.navigateByUrl('');
      return true;
    } catch (err: any) {
      if (err.status === 400) console.error('Incorrect username or password!');
      return false;
    }
  }

  async logout(): Promise<void> {
    try {

      await lastValueFrom(
        this.http.post<''>(this.config.logoutUrl, {}, { headers: { 'X-OrganisationId': this.config.organisationId } }),
      );

      localStorage.removeItem(this.config.storageName);
      this.currentUserSubject$.next(new User());
      this.router.navigateByUrl('login');
      console.log('Successful logout!');
    } catch (err) {
      console.error('An error occurred during logout!');
    }
  }

  async getUserMe(accessToken: string): Promise<User> {
    return lastValueFrom(this.http.get<User>(this.config.userMeUrl, { headers: { Authorization: `Bearer ${accessToken}` } }));
  }
}
