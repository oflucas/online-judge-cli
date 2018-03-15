import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string = 'client@email.com';
  username: string = 'client';

  constructor(@Inject('auth') private auth) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.getProfile((err, profile) => {
        this.email = profile.name;
        this.username = profile.nickname;
      });
    }
  }

  resetPassword(): void {
    this.auth.resetPassword();
  }
}
