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

  currentUserSubject$: BehaviorSubject<User> = new BehaviorSubject(new User());

  constructor(
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  get currentUserValue(): User {
    return this.currentUserSubject$.value;
  }

  async login(loginData: { userName: string, password: string; }): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.post<{ access_token: string; token_type: string, expires_in: number; }>(this.config.loginUrl, loginData),
      );

      const user = await lastValueFrom(
        this.http.get<User>(this.config.userMeUrl, { headers: { Authorization: `Bearer ${response.access_token}` } }),
      );

      this.currentUserSubject$.next(user);
      console.log('Successful login!');
    } catch (err: any) {
      if (err.status === 400) console.error('Incorrect username or password!');
    }
  }
}
