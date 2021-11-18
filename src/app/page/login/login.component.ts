import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginData: { userName: string, password: string; } = { userName: '', password: '' };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    this.loginData = form.value;
  }

}
