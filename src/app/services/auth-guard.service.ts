import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  is_admin = false;

  constructor(
    @Inject('auth') private auth,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      // redirect to home page if not logged in
      this.router.navigate(['/']);
      return false;
    }
  }

  isAdmin(): boolean {
    // can not get userProfile.roles, so hack here
    if (this.auth.userProfile && this.auth.userProfile.name === 'admin@gmail.com') {
      return true;
    } else {
      return false;
    }
  }
}
