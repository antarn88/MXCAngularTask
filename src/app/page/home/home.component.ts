import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.userList$.next(await lastValueFrom(this.userService.getAll()));
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await lastValueFrom(this.userService.delete(userId));
      this.userList$.next(await lastValueFrom(this.userService.getAll()));
      this.toastr.success('Sikeresen törölte a munkatársat!', 'Siker!');
      console.log('User deleting was successful!');
    } catch (err) {
      this.toastr.error('Hiba történt a munkatárs törlése közben!', 'Hiba!');
      console.error('Error during deleting user!');
    }
  }
}
