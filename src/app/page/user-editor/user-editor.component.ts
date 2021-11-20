/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit {

  user = new User();
  loading = true;
  notFoundError = false;
  savingError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    const { userId } = this.activatedRoute.snapshot.params;

    if (userId !== '0') {
      try {
        this.user = await lastValueFrom(this.userService.getOne(userId));
        this.loading = false;
      } catch (err) {
        this.notFoundError = true;
        console.error('Error during loading user!');
      }
    } else {
      this.user.id = '0';
      this.loading = false;
    }
  }

  async saveUser(userForm: NgForm): Promise<boolean> {
    this.savingError = false;

    if (!userForm.value.phoneNumber) {
      delete userForm.value.phoneNumber;
    }

    try {
      if (this.user.id === '0') {
        this.user = userForm.value;
        await lastValueFrom(this.userService.create(this.user));
        this.loading = false;
        console.log('User has been created!');
        this.router.navigateByUrl('');
        return true;
      }
    } catch (err) {
      this.savingError = true;
      this.user.id = '0';
      console.error('Error during creating user!');
      return false;
    }

    try {
      if (this.user.id !== '0') {
        const userId = this.user.id;

        if (!userForm.value.password) {
          userForm.value.password = this.user.password;
        }

        this.user = { ...userForm.value, id: userId };

        await lastValueFrom(this.userService.update(this.user));
        this.loading = false;
        console.log('Updating user was successful!');
        this.router.navigateByUrl('');
        return true;
      }
    } catch (err) {
      this.savingError = true;
      console.error('Error during updating user!');
      return false;
    }
    return false;
  }
}
