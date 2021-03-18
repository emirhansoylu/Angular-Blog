import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSubscription: Subscription;
  isLoading = false;

  constructor(public authService: AuthService) {
    this.authStatusSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.authStatusSubscription.unsubscribe();
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.authService.login(form.value.email, form.value.password);
    }
  }
}
