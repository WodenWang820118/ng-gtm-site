import { Injectable } from '@angular/core';
import { AnalyticsService } from '../analytics/analytics.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlTrackerService {
  constructor(
    private analyticsService: AnalyticsService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        tap((event: NavigationEnd) => {
          this.analyticsService.trackPageView(event.urlAfterRedirects);
        })
      )
      .subscribe();
  }
}
