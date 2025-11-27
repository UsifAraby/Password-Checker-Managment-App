import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private repo = new BehaviorSubject<User[]>([]);
  users$ = this.repo.asObservable();

  constructor() {
    this._init();
  }

  private _init(): void {
    try {
      const cached = localStorage.getItem('_usr');
      if (cached) {
        this.repo.next(JSON.parse(cached));
      }
    } catch (e) {}
  }

  private _save(data: User[]): void {
    try {
      localStorage.setItem('_usr', JSON.stringify(data));
    } catch (e) {}
  }

  addUser(u: User): boolean {
    const t = (u.username || '').trim();
    if (!t || this._check(t)) return false;
    const d = [...this.repo.value, { username: t, password: u.password }];
    this.repo.next(d);
    this._save(d);
    return true;
  }

  getUsersSnapshot(): User[] {
    return this.repo.value;
  }

  deleteUser(x: string) {
    const d = this.repo.value.filter(e => e.username !== x);
    this.repo.next(d);
    this._save(d);
  }

  private _check(n: string): boolean {
    const m = n.trim().toLowerCase();
    return this.repo.value.some(r => r.username.trim().toLowerCase() === m);
  }

  userExists(n: string): boolean {
    return this._check(n);
  }
}
