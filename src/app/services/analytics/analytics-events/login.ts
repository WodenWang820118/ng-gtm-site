import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';

export class LoginEventTracker implements AnalyticsEventTracker {
  constructor(private eventName: string) {
    this.eventName = eventName;
  }

  trackEvent(eventData: any): void {
    window.dataLayer.push({
      event: this.eventName,
      ...eventData,
    });
  }
}
