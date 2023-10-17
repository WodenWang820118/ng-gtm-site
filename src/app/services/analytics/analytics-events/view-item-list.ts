import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';

export class ViewItemListEventTracker implements AnalyticsEventTracker {
  constructor(private eventName: string) {
    this.eventName = eventName;
  }

  trackEvent(eventData: any): void {
    if (!eventData.ecommerce.items.length) return;
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
    window.dataLayer.push({
      event: this.eventName,
      ...eventData,
    });
  }
}
