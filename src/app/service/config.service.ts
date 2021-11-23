import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  apiUrl = 'http://dev-isf-ticketing-app.azurewebsites.net';
  allUsersUrl = `${this.apiUrl}/api/v1/admin/user/`;
  loginUrl = `${this.apiUrl}/api/v1/identity/token`;
  logoutUrl = `${this.apiUrl}/api/v1/identity/logout`;
  userMeUrl = `${this.apiUrl}/api/v1/user/me`;
  organisationId = '7065e94e-ace2-4846-9056-1638a97118e5';
  storageName = 'currentUser';

  // For paging and ordering
  pageIndex = new BehaviorSubject<number>(0);
  limit = new BehaviorSubject<number>(5);
  userListLength = new BehaviorSubject<number>(0);
  totalNumberOfPages = new BehaviorSubject<number>(0);
  order = 'Asc';
  orderBy = 'Name';
  firstSorting = true;

  calculateTotalNumberOfPages(): void {
    this.totalNumberOfPages.next(Math.ceil(this.userListLength.getValue() / this.limit.getValue()));
  }

  setNextPage(): void {
    if (this.pageIndex.getValue() + 1 <= this.totalNumberOfPages.getValue() - 1) {
      this.pageIndex.next(this.pageIndex.getValue() + 1);
    }
  }

  setPrevPage(): void {
    if (this.pageIndex.getValue() - 1 >= 0) {
      this.pageIndex.next(this.pageIndex.getValue() - 1);
    }
  }
}
