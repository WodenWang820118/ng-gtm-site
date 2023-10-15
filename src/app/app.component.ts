import { CookieService } from './services/cookie/cookie.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { AuthService } from './services/auth/auth.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    DisclaimerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-55-ats-site';

  constructor(
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // TODO: implement consent banner and monitor consent
    this.cookieService.createCookie('visit', 'true', 1);
    this.authService
      .checkIsLoggedIn()
      .pipe(
        take(1),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            this.authService.setIsLoggedIn(true);
          } else {
            this.authService.setIsLoggedIn(false);
          }
        })
      )
      .subscribe();
  }
}
