import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "CollaborativeOJ";

  username = "Guest";

  constructor(@Inject("auth") private auth) {
    auth.handleAuthentication(err => {
      // async, wait for handling auth and then process profile
      if (err) { return; }
      if (this.auth.isAuthenticated()) {
        this.auth.getProfile((err, profile) => {
          console.log(profile)
          this.username = profile.nickname;
        });
      }
    });
  }

  ngOnInit() {
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }
}
