import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  user = new BehaviorSubject<User>(new User());

  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.user.next(this.auth.currentUserValue);
  }

}
