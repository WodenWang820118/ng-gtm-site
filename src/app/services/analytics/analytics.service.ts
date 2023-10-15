import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {}

  promotions: any[] = [];

  trackPromotion(promotion: any): void {
    // Check if the promotion has already been tracked
    if (!this.isPromotionTracked(promotion)) {
      this.promotions.push(promotion);
      console.log('Promotion tracked:', promotion);

      // Optionally: Send data to analytics server/API
      // this.http.post('analytics-endpoint', promotion).subscribe();
    } else {
      console.log('Promotion already tracked:', promotion);
    }
  }

  private isPromotionTracked(newPromotion: any): boolean {
    // Assuming that each promotion has a unique 'id' property
    return this.promotions.some(
      (trackedPromotion) => trackedPromotion.id === newPromotion.id
    );
  }
}
