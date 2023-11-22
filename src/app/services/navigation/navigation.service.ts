import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, map, mergeMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private source: string | null = null;
  private sourceSubject = new BehaviorSubject<string | null>(null);
  source$ = this.sourceSubject.asObservable();
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.trackSource().subscribe();
  }

  trackSource() {
    return this.activatedRoute.queryParams.pipe(
      tap((params) => {
        if (params['app_source']) {
          this.source = params['app_source'];
          this.sourceSubject.next(this.source);
        }
      })
    );
  }

  navigateToHome() {
    this.router.navigate(['/'], {
      queryParams: { app_source: this.source },
      queryParamsHandling: 'merge',
    });
  }

  navigateToDestinations() {
    this.router.navigate(['/destinations'], {
      queryParams: { app_source: this.source },
      queryParamsHandling: 'merge',
    });
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/details', id], {
      queryParams: { app_source: this.source },
      queryParamsHandling: 'merge',
    });
  }

  navigateToBasket() {
    this.router.navigate(['/basket'], {
      queryParams: { app_source: this.source },
      queryParamsHandling: 'merge',
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login'], {
      queryParams: { app_source: this.source },
      queryParamsHandling: 'merge',
    });
  }

  navigateToThankYou() {
    this.router.navigate(['/thankyou'], {
      queryParams: { app_source: this.source },
      queryParamsHandling: 'merge',
    });
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout'], {
      queryParams: { app_source: this.source },
      queryParamsHandling: 'merge',
    });
  }
}
