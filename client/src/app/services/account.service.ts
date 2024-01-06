import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  basUrl: string = 'https://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post<User>(this.basUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post<User>(this.basUrl + 'account/register', model).pipe(
      map((user) => {
        if (user) {localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);}
      })
    );
  }
  setCurrentUser(user: User | null) {
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.setCurrentUser(null);
  }
}
