import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy {
  lst: User[] = [];
  private fin$ = new Subject<void>();
  
  constructor(private svc: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._bind();
  }

  private _bind(): void {
    this.svc.users$.pipe(takeUntil(this.fin$)).subscribe((d) => {
      this.lst = [...d];
      this.cdr.markForCheck();
    });
  }

  del(id: string): void {
    this.svc.deleteUser(id);
  }

  ask(id: string): void {
    if (!id) return;
    const msg = `Delete user "${id}"?`;
    if (window.confirm(msg)) {
      this.del(id);
    }
  }

  _track(i: number, u: User): string {
    return u.username;
  }

  ngOnDestroy(): void {
    this.fin$.next();
    this.fin$.complete();
  }
}