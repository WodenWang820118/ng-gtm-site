import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';

export class SelectPromotionEventTracker implements AnalyticsEventTracker {
  constructor(private eventName: string) {
    this.eventName = eventName;
  }

  trackEvent(eventData: any): void {
    if (!eventData) return;
    const promotion = {
      ecommerce: {
        creative_name: eventData.title,
        creative_slot: 'featured_destinations',
        promotion_id: eventData.id,
        promotion_name: eventData.title,
        items: [
          {
            item_id: eventData.id,
            item_name: eventData.title,
          },
        ],
      },
    };

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
    window.dataLayer.push({
      event: this.eventName,
      ...promotion,
    });
  }
}
