import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';

const promotions: string[] = [];

export class ViewPromotionEventTracker implements AnalyticsEventTracker {
  item_id: string;
  constructor(private eventName: string) {
    this.eventName = eventName;
    this.item_id = '';
  }

  private isPromotionTracked(newPromotion: any): boolean {
    // Assuming that each promotion has a unique 'id' property
    return promotions.some(
      (item_id) => item_id === newPromotion.ecommerce.items[0]['item_id']
    );
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

    if (!this.isPromotionTracked(promotion)) {
      this.item_id = promotion.ecommerce.items[0].item_id;
      promotions.push(this.item_id);
      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
      window.dataLayer.push({
        event: this.eventName,
        ...promotion,
      });
    }
  }
}
