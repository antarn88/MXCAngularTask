import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  hasError = false;
  logging = false;

  constructor(
    private authService: AuthService,
  ) { }

  // When the user has clicked to the login button
  async onSubmit(loginForm: NgForm): Promise<void> {
    this.logging = true;
    if (!await this.authService.login(loginForm.value)) {
      this.hasError = true;
      this.logging = false;
    } else this.logging = false;
  }

}
