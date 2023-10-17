import { Order } from '../../../models/order.model';
import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';

export class AddToCartEventTracker implements AnalyticsEventTracker {
  constructor(private eventName: string) {
    this.eventName = eventName;
  }

  trackEvent(eventData: any): void {
    if (!eventData) return;
    const event = {
      ecommerce: {
        value: eventData.reduce(
          (accumulator: number, currentValue: Order) =>
            accumulator + currentValue.value * currentValue.quantity,
          0
        ),
        currency: eventData.currency,
        items: eventData.map((item: Order) => ({
          item_id: item.id,
          item_name: item.title,
          item_category: item.title,
          quantity: Number(item.quantity),
          price: item.value,
        })),
      },
    };
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
    window.dataLayer.push({
      event: this.eventName,
      ...event,
    });
  }
}
