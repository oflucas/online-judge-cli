import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "CollaborativeOJ";

  username = "Guest";

  searchBox: FormControl = new FormControl();

  subscription: Subscription;

  constructor(
    @Inject("auth") private auth,
    @Inject("input") private input,
    private router: Router
  ) {
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
    this.subscription = this.searchBox
                        .valueChanges
                        .debounceTime(500) // absorb changes within 500ms
                        .subscribe(
                          term => this.input.changeInput(term)
                        );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProblem() {
    this.router.navigate(['/problems']);
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }
}
