import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';

export class SelectPromotionEventTracker implements AnalyticsEventTracker {
  constructor(private eventName: string) {
    this.eventName = eventName;
  }

  trackEvent(eventData: any): void {
    if (!eventData) return;
    const promotion = {
      ecommerce: {
        promotion_id: eventData.id, // required for ga4_ecom_attributor
        promotion_name: eventData.title, // required for ga4_ecom_attributor
        creative_name: 'travel_slide', // required for ga4_ecom_attributor
        creative_slot: 'featured_attributor', // required for ga4_ecom_attributor
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
