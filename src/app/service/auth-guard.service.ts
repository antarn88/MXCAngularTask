import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  // Check login status of the user
  async canActivate(): Promise<boolean> {
    // If user doesn't logged in
    if (!this.auth.currentUserValue.userName && !await this.auth.getLocalStorageData()) {
      this.router.navigateByUrl('login');
      return false;
    }
    // If user logged in
    return true;
  }
}
