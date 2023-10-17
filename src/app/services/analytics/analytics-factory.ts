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

export class AnalyticsEventTrackerFactory {
  public createEvent(eventName: string): AnalyticsEventTracker {
    switch (eventName) {
      case 'add_to_cart':
        return new AddToCartEventTracker(eventName);
      case 'remove_from_cart':
        return new RemoveFromCartEventTracker(eventName);
      case 'view_promotion':
        return new ViewPromotionEventTracker(eventName);
      case 'select_promotion':
        return new SelectPromotionEventTracker(eventName);
      case 'view_item_list':
        return new ViewItemListEventTracker(eventName);
      case 'view_item':
        return new ViewItemEventTracker(eventName);
      case 'view_cart':
        return new ViewCartEventTracker(eventName);
      case 'add_shipping_info':
        return new AddShippingInfoEventTracker(eventName);
      case 'add_payment_info':
        return new AddPaymentInfoEventTracker(eventName);
      case 'purchase':
        return new PurchaseEventTracker(eventName);
      case 'refund':
        return new RefundEventTracker(eventName);
      case 'login':
        return new LoginEventTracker(eventName);
      default:
        throw new Error('Invalid event type');
    }
  }
}
