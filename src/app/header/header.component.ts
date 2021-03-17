import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authStatusListenerSubs: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAunthenticated) => {
        this.userIsAuthenticated = isAunthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authStatusListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
