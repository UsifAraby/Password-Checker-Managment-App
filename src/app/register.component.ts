import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RegisterComponent {
  u: string = '';
  w: string = '';
  err: string = '';
  ok: string = '';

  constructor(private svc: UserService) {}

  go(): void {
    const nm = (this.u || '').trim();
    const pw = this.w || '';
    this.err = '';
    this.ok = '';
    
    if (!nm || !pw) {
      this.err = 'Please provide both username and password.';
      return;
    }

    if (this.svc.userExists(nm)) {
      this.err = 'Username already exists!';
      return;
    }

    if (this.svc.addUser({ username: nm, password: pw })) {
      this.ok = 'User registered successfully.';
      this.u = '';
      this.w = '';
    } else {
      this.err = 'Could not register user.';
    }
  }

  st(): 'empty' | 'weak' | 'medium' | 'strong' {
    return this._calcStrength(this.w);
  }

  private _calcStrength(input: string): 'empty' | 'weak' | 'medium' | 'strong' {
    const pwd = input || '';
    if (!pwd) return 'empty';
    
    const len = pwd.length;
    const types = (
      [/[a-z]/, /[A-Z]/, /\d/, /[^\w\s]/]
        .reduce((n, rx) => n + (rx.test(pwd) ? 1 : 0), 0)
    );
    
    const score = len + types;
    if (score < 5) return 'weak';
    if (score < 9) return 'medium';
    return 'strong';
  }

  get en(): boolean {
    return !this.u.trim() || !this.w;
  }
}
