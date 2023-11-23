import { Injectable } from '@angular/core';
import { AnalyticsService } from '../analytics/analytics.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { destinations } from '../destination/destinations';

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
        this.analyticsService.trackPageViewECEvent(e.url);

        if (e.url === '/') {
          this.analyticsService.trackEvent('page_view', {
            page_path: e.url,
            page_title: 'Home',
            page_location: window.location.href,
          });
        } else if (e.url === '/destinations') {
          this.analyticsService.trackEvent('page_view', {
            page_path: e.url,
            page_title: 'Destinations',
            page_location: window.location.href,
          });
        } else if (e.url === '/thankyou') {
          this.analyticsService.trackEvent('page_view', {
            page_path: e.url,
            page_title: 'Thank You',
            page_location: window.location.href,
          });
        } else if (e.url === '/detail') {
          this.analyticsService.trackEvent('page_view', {
            page_path: e.url,
            page_title: 'Detail',
            page_location: window.location.href,
          });
        } else if (e.url === '/basket') {
          this.analyticsService.trackEvent('page_view', {
            page_path: e.url,
            page_title: 'Basket',
            page_location: window.location.href,
          });
        } else if (e.url === '/login') {
          this.analyticsService.trackEvent('page_view', {
            page_path: e.url,
            page_title: 'Login',
            page_location: window.location.href,
          });
        }
      });
  }
}
