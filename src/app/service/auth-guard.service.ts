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

  async canActivate(): Promise<boolean> {
    if (!this.auth.currentUserValue.userName && !await this.auth.getLocalStorageData()) {
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
