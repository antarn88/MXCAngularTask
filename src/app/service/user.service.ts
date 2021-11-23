import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userList$: BehaviorSubject<{ results: User[], resultsLength: number; }> = new BehaviorSubject
    <{ results: User[], resultsLength: number; }>({ results: [], resultsLength: 0 });

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  async loadLatestUserList(): Promise<void> {
    const resultObject = await lastValueFrom(this.getAll());
    this.config.userListLength.next(resultObject.resultsLength);
    this.userList$.next(resultObject);
  }

  getAll(): Observable<{ results: User[], resultsLength: number; }> {
    return this.http.get<{ results: User[], resultsLength: number; }>(
      `${this.config.allUsersUrl}?PageIndex=${this.config.pageIndex.getValue()}
      &Limit=${this.config.limit.getValue()}&Order=${this.config.order}&OrderBy=${this.config.orderBy}`,
    );
  }

  getOne(userId: string): Observable<User> {
    return this.http.get<User>(`${this.config.allUsersUrl}${userId}`);
  }

  create(user: User): Observable<''> {
    return this.http.post<''>(this.config.allUsersUrl, user);
  }

  update(user: User): Observable<''> {
    return this.http.put<''>(`${this.config.allUsersUrl}${user.id}`, user);
  }

  delete(userId: string): Observable<''> {
    return this.http.delete<''>(`${this.config.allUsersUrl}${userId}`);
  }
}
