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
    // can not make it work
    // if (this.auth.isAuthenticated()) {
    //   this.auth.getProfile((err, profile) => {
    //     if (profile && profile.name === 'admin@gmail.com') {
    //       this.is_admin = true;
    //     } else {
    //       this.is_admin = false;
    //     }
    //   });
    // }
    // return this.is_admin;
    return this.auth.isAuthenticated();
  }
}
