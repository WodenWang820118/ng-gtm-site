import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { SharedModule } from 'src/app/shared.module';
import { Router } from '@angular/router';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss'],
})
export class ThankyouComponent {
  constructor(
    public orderService: OrderService,
    private router: Router,
    private analyticsService: AnalyticsService
  ) {}

  resetOrders(): void {
    this.orderService.resetOrders();
    this.router.navigate(['/']);
  }

  trackPurchase(): void {
    this.orderService.orders$
      .pipe(
        take(1),
        tap((orders) => {
          this.analyticsService.trackEvent('purchase', orders);
        })
      )
      .subscribe();
  }

  trackRefund(): void {
    this.orderService.orders$
      .pipe(
        take(1),
        tap((orders) => {
          this.analyticsService.trackEvent('refund', orders);
        })
      )
      .subscribe();
  }
}
