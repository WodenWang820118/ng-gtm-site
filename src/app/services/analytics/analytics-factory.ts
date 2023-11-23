import { AnalyticsEventTracker } from '../../models/analytics-event-tracker.model';
import { AddToCartEventTracker } from './analytics-events/add-to-cart';
import { AddPaymentInfoEventTracker } from './analytics-events/add-payment-info';
import { AddShippingInfoEventTracker } from './analytics-events/add-shipping-info';
import { LoginEventTracker } from './analytics-events/login';
import { PurchaseEventTracker } from './analytics-events/purchase';
import { RefundEventTracker } from './analytics-events/refund';
import { RemoveFromCartEventTracker } from './analytics-events/remove-from-cart';
import { SelectPromotionEventTracker } from './analytics-events/select-promotion';
import { ViewCartEventTracker } from './analytics-events/view-cart';
import { ViewItemEventTracker } from './analytics-events/view-item';
import { ViewPromotionEventTracker } from './analytics-events/view-promotion';
import { ViewItemListEventTracker } from './analytics-events/view-item-list';
import { PageViewEventTracker } from './analytics-events/page-view';
import { SelectItemEventTracker } from './analytics-events/select-item';
import { BeginCheckoutEventTracker } from './analytics-events/begin-checkout';
import { SearchEventTracker } from './analytics-events/search';
import { Injectable } from '@angular/core';
import { JavascriptInterfaceService } from '../javascript-interface/javascript-interface.service';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsEventTrackerFactory {
  constructor(private javascriptInterfaceService: JavascriptInterfaceService) {}
  public createEvent(eventName: string): AnalyticsEventTracker {
    switch (eventName) {
      case 'add_to_cart':
        return new AddToCartEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'remove_from_cart':
        return new RemoveFromCartEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'view_promotion':
        return new ViewPromotionEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'select_promotion':
        return new SelectPromotionEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'view_item_list':
        return new ViewItemListEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'view_item':
        return new ViewItemEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'view_cart':
        return new ViewCartEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'add_shipping_info':
        return new AddShippingInfoEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'add_payment_info':
        return new AddPaymentInfoEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'purchase':
        return new PurchaseEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'refund':
        return new RefundEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'login':
        return new LoginEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'page_view':
        return new PageViewEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'select_item':
        return new SelectItemEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'begin_checkout':
        return new BeginCheckoutEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      case 'search':
        return new SearchEventTracker(
          eventName,
          this.javascriptInterfaceService
        );
      default:
        throw new Error('Invalid event type');
    }
  }
}
