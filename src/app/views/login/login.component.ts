import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (this.signInForm.invalid) {
      alert('Please fill out the form completely.');
      return;
    }

    const username = this.signInForm.controls.username.value;
    const password = this.signInForm.controls.password.value;

    if (username && password) {
      this.authService
        .login(username, password)
        .pipe(
          tap((user) => {
            take(1);
            if (user) {
              this.authService.setIsLoggedIn(true);
              this.router.navigate(['/']);
            } else {
              alert('Login failed.');
            }
          })
        )
        .subscribe();
    }
  }
}
