import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  hasError = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(loginForm: NgForm): Promise<void> {
    if (!await this.authService.login(loginForm.value)) {
      this.hasError = true;
    }
  }

}
