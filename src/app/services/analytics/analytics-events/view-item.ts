import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';

export class ViewItemEventTracker implements AnalyticsEventTracker {
  constructor(private eventName: string) {
    this.eventName = eventName;
  }

  trackEvent(eventData: any): void {
    if (!eventData) return;
    const ecommerce = {
      ecommerce: {
        currency: 'USD',
        value: eventData.price,
        items: [
          {
            item_id: eventData.id,
            item_name: eventData.title,
            item_category: eventData.title,
            price: eventData.price,
            quantity: 1,
          },
        ],
      },
    };

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
    window.dataLayer.push({
      event: this.eventName,
      ...ecommerce,
    });
  }
}
