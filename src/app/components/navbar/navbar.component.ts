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
    auth.handleAuthentication();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.getProfile((err, profile) => {
        this.username = profile.nickname;
      });
    }
  }

  login(): void {
    this.auth.login();
    this.auth.getProfile((err, profile) => {
      console.log(profile)
      this.username = profile.nickname;
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
