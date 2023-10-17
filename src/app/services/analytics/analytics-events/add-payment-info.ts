import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';
import { Order } from '../../../models/order.model';

export class AddPaymentInfoEventTracker implements AnalyticsEventTracker {
  constructor(private eventName: string) {
    this.eventName = eventName;
  }

  trackEvent(eventData: any): void {
    if (!eventData.length) return;
    const event = {
      ecommerce: {
        value: eventData.reduce(
          (accumulator: number, currentValue: Order) =>
            accumulator + currentValue.value * currentValue.quantity,
          0
        ),
        currency: 'USD',
        items: eventData.map((item: Order) => ({
          item_id: item.id,
          item_name: item.title,
          item_category: item.title,
          quantity: item.quantity,
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
