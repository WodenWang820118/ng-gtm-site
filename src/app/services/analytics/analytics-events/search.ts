import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';
import { JavascriptInterfaceService } from '../../javascript-interface/javascript-interface.service';

export class SearchEventTracker implements AnalyticsEventTracker {
  constructor(
    private eventName: string,
    private javascriptInterface: JavascriptInterfaceService
  ) {
    this.eventName = eventName;
  }

  trackEvent(eventData: any): void {
    window.dataLayer.push({
      event: this.eventName,
      eventData,
    });
    this.javascriptInterface.logEvent(this.eventName, eventData);
  }
}
