import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  router: any;

  constructor() {
    this.checkUserStatus();
  }

  checkUserStatus() {
    if (typeof localStorage !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.isLoggedInSubject.next(true);
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          this.usernameSubject.next(storedUsername);
        }
      }
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  login(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.isLoggedInSubject.next(true);
    this.usernameSubject.next(username);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedInSubject.next(false);
    this.usernameSubject.next('');
  }
}
