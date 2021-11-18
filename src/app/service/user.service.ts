import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  getAll(): Observable<{ results: User[], resultsLength: number; }> {
    return this.http.get<{ results: User[], resultsLength: number; }>(this.config.allUsersUrl);
  }

  getOne(user: User): Observable<User> {
    return this.http.get<User>(`${this.config.allUsersUrl}/${user.id}`);
  }

  create(user: User): Observable<''> {
    return this.http.post<''>(this.config.allUsersUrl, user);
  }

  update(user: User): Observable<''> {
    return this.http.put<''>(`${this.config.allUsersUrl}/${user.id}`, user);
  }

  delete(user: User): Observable<''> {
    return this.http.delete<''>(`${this.config.allUsersUrl}/${user.id}`);
  }
}
