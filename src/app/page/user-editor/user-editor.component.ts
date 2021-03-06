/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit {

  user = new User();
  loading = true;
  updating = false;
  notFoundError = false;
  savingError = false;
  errorMessage = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService, // Toaster
  ) { }

  async ngOnInit(): Promise<void> {
    // Get userID from query params
    const { userId } = this.activatedRoute.snapshot.params;

    // When form-editor loads with user data
    if (userId !== '0') {
      try {
        this.user = await lastValueFrom(this.userService.getOne(userId));
        this.loading = false;
        console.log('User has been loaded!');
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
    this.updating = true;

    if (!userForm.value.phoneNumber) {
      delete userForm.value.phoneNumber;
    }

    try {
      // When the user will be created
      if (this.user.id === '0') {
        this.user = userForm.value;
        await lastValueFrom(this.userService.create(this.user));
        this.loading = false;
        this.updating = false;
        this.toastr.success('A munkatárs sikeresen létrejött!', 'Siker!');
        console.log('User has been created!');
        this.router.navigateByUrl(''); // Navigate to home page
        return true;
      }
    } catch (err: any) {
      this.errorMessage = err.error.messages[0].label;
      this.savingError = true;
      this.updating = false;
      this.user.id = '0';
      console.error('Error during creating user! Details:', this.errorMessage);
      return false;
    }

    try {
      // When the user will be updated
      if (this.user.id !== '0') {
        const userId = this.user.id;

        if (!userForm.value.password) {
          userForm.value.password = this.user.password;
        }

        this.user = { ...userForm.value, id: userId };

        await lastValueFrom(this.userService.update(this.user));
        this.loading = false;
        this.updating = false;
        this.toastr.success('A munkatárs sikeresen frissült!', 'Siker!');
        console.log('Updating user was successful!');
        this.router.navigateByUrl(''); // Navigate to home page
        return true;
      }
    } catch (err) {
      this.savingError = true;
      this.updating = false;
      console.error('Error during updating user!');
      return false;
    }
    return false;
  }
}
