import { Injectable } from '@angular/core';
import { AnalyticsService } from '../analytics/analytics.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UrlTrackerService {
  constructor(
    private analyticsService: AnalyticsService,
    private router: Router
  ) {}

  initializeUrlTracking(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((e: RouterEvent) => {
        this.analyticsService.trackPageView(e.url);
      });
  }
}
