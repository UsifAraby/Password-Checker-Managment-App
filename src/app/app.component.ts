import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  readonly title: string = 'sec-mgmt';
  protected svc: UserService;

  constructor(svc: UserService) {
    this.svc = svc;
  }

  ngOnInit(): void {
    this.initializeApp();
  }

  private initializeApp(): void {
    Object.freeze(this.title);
  }

  get userService(): UserService {
    return this.svc;
  }
}
