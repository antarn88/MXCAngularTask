import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  currentUser: User = new User();
  loading = true;

  userList$ = this.userService.userList$;

  constructor(
    public userService: UserService,
    private toastr: ToastrService,
    public config: ConfigService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.userService.loadLatestUserList();
      this.loading = false;
      this.config.calculateTotalNumberOfPages();
    } catch (err) {
      console.error('Error during loading userlist!');
    }
  }

  async deleteUser(confirmedDelete: boolean): Promise<void> {
    if (confirmedDelete) {
      try {
        await lastValueFrom(this.userService.delete(this.currentUser.id || ''));
        await this.userService.loadLatestUserList();
        this.config.calculateTotalNumberOfPages();
        this.toastr.success('Sikeresen törölte a munkatársat!', 'Siker!');
        console.log('User deleting was successful!');
      } catch (err) {
        this.toastr.error('Hiba történt a munkatárs törlése közben!', 'Hiba!');
        console.error('Error during deleting user!');
      }
    }
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  setOrder(columnName: string): void {
    if (this.config.firstSorting) {
      this.config.order = 'Desc';
      this.config.firstSorting = false;
    } else this.config.order = this.config.order === 'Asc' ? 'Desc' : 'Asc';
    this.config.orderBy = columnName;
    this.userService.loadLatestUserList();
  }

  async onChangePageSize(value: string): Promise<void> {
    this.config.limit.next(parseInt(value, 10));
    this.config.pageIndex.next(0);
    this.config.calculateTotalNumberOfPages();
    this.loading = true;
    await this.userService.loadLatestUserList();
    this.loading = false;
  }

  async jumpToTheNextPage(): Promise<void> {
    this.config.setNextPage();
    this.loading = true;
    await this.userService.loadLatestUserList();
    this.loading = false;

  }

  async jumpToThePrevPage(): Promise<void> {
    this.config.setPrevPage();
    this.loading = true;
    await this.userService.loadLatestUserList();
    this.loading = false;
  }

}
