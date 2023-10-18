import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';

export class ViewCartEventTracker implements AnalyticsEventTracker {
  constructor(private eventName: string) {
    this.eventName = eventName;
  }

  trackEvent(eventData: any): void {
    if (!eventData.length) return;
    const event = {
      ecommerce: {
        currency: eventData[0].currency,
        value: eventData.reduce(
          (accumulator: number, currentValue: any) =>
            accumulator + currentValue.value * currentValue.quantity,
          0
        ),
        items: eventData.map((item: any) => ({
          item_id: item.id,
          item_name: item.title,
          item_category: item.category,
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
