import { Injectable } from '@angular/core';
import { destinations } from '../destination/destinations';
import { AnalyticsEventTrackerFactory } from './analytics-factory';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private eventFactory = new AnalyticsEventTrackerFactory();
  private _checkoutOrders = new BehaviorSubject<Order[]>([]);

  constructor() {
    window.dataLayer = window.dataLayer || [];
  }

  trackEvent(eventName: string, eventData: any): void {
    try {
      const eventTracker = this.eventFactory.createEvent(eventName);
      eventTracker.trackEvent(eventData);
    } catch (error) {
      console.log('Event not tracked:', eventName, eventData);
    }
  }

  trackPageViewECEvent(url: string): void {
    if (url === '/destinations') {
      const items = destinations.map((destination) => ({
        item_id: destination.id,
        item_name: destination.title,
        item_category: destination.title,
        price: destination.price,
        quantity: 1,
      }));

      this.trackEvent('view_item_list', {
        ecommerce: {
          items,
        },
      });
    }

    if (url === '/thankyou') {
      // mimic a purchase event after a successful checkout
      this._checkoutOrders
        .pipe(
          take(1),
          tap((orders) => {
            this.trackEvent('purchase', orders);
          })
        )
        .subscribe();
    }
  }

  setCheckoutOrders(orders: Order[]): void {
    this._checkoutOrders.next(orders);
  }
}
