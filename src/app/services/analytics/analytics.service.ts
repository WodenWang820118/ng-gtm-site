import { Injectable } from '@angular/core';
import { destinations } from '../destination/destinations';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  promotions: any[] = [];
  constructor() {
    window.dataLayer = window.dataLayer || [];
  }

  trackEvent(eventName: string, eventData: any): void {
    switch (eventName) {
      case 'add_to_cart': {
        this.handleAddToCart(eventName, eventData);
        break;
      }
      case 'view_promotion': {
        this.handleViewPromotion(eventName, eventData);
        break;
      }
      case 'view_cart': {
        this.handleViewCart(eventName, eventData);
        break;
      }
      case 'view_item_list': {
        this.handleViewItemList(eventName, eventData);
        break;
      }
      case 'view_item': {
        this.handleViewItem(eventName, eventData);
        break;
      }
      default: {
        console.log('Event not tracked:', eventData);
        break;
      }
    }
  }

  trackPageView(url: string): void {
    if (url === '/destinations') {
      const items = destinations.map((destination) => ({
        item_id: destination.id,
        item_name: destination.title,
        item_category: destination.title,
        price: destination.price,
        quantity: 1,
      }));

      this.trackEvent('view_item_list', {
        ecommerce: {
          items,
        },
      });
    }
  }

  handleAddToCart(eventName: string, eventData: any): void {
    const event = {
      ecommerce: {
        value: eventData.value,
        currency: eventData.currency,
        items: [
          {
            item_id: eventData.id,
            item_name: eventData.title,
            item_category: eventData.title,
            quantity: eventData.quantity,
            price: eventData.value,
          },
        ],
      },
    };
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
    window.dataLayer.push({
      event: eventName,
      ...event,
    });
  }

  handleViewPromotion(eventName: string, eventData: any) {
    const promotion = {
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
    };

    if (!this.isPromotionTracked(promotion)) {
      this.promotions.push(promotion);
      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
      window.dataLayer.push({
        event: eventName,
        ...promotion,
      });
    }
  }

  handleViewItemList(eventName: string, eventData: any): void {
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }

  handleViewItem(eventName: string, eventData: any): void {
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
    const ecommerce = {
      ecommerce: {
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
      event: eventName,
      ecommerce,
    });
  }

  handleViewCart(eventName: string, eventData: any): void {
    const event = {
      ecommerce: {
        currency: eventData[0].currency,
        value: eventData.reduce(
          (accumulator: number, currentValue: any) =>
            accumulator + currentValue.value,
          0
        ),
        items: eventData.map((item: any) => ({
          item_id: item.id,
          item_name: item.title,
          item_category: item.category,
          quantity: item.quantity,
          price: item.value,
        })),
      },
    };
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
    window.dataLayer.push({
      event: eventName,
      ...event,
    });
  }

  private isPromotionTracked(newPromotion: any): boolean {
    // Assuming that each promotion has a unique 'id' property
    return this.promotions.some(
      (trackedPromotion) => trackedPromotion.id === newPromotion.id
    );
  }
}
