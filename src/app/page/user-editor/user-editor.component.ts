import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit {

  user = new BehaviorSubject<User>(new User());

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  async ngOnInit(): Promise<void> {
    const { userId } = this.activatedRoute.snapshot.params;

    if (userId !== '0') {
      const user = await lastValueFrom(this.userService.getOne(userId));
      this.user.next(user);
    }
  }

}
