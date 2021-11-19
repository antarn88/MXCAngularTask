import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  userList$: BehaviorSubject<{ results: User[], resultsLength: number; }> = new BehaviorSubject
    <{ results: User[], resultsLength: number; }>({ results: [], resultsLength: 0 });

  constructor(
    private userService: UserService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.userList$.next(await lastValueFrom(this.userService.getAll()));
  }

  deleteUser(userId: string): void {
    console.log('Deleting request:', userId);
  }
}
