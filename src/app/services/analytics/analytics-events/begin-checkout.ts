import { Order } from '../../../models/order.model';
import { AnalyticsEventTracker } from '../../../models/analytics-event-tracker.model';

export class BeginCheckoutEventTracker implements AnalyticsEventTracker {
  constructor(private eventName: string) {
    this.eventName = eventName;
  }

  getProcessedData(rawEventData: any) {
    if (!rawEventData.length) return;
    const event = {
      ecommerce: {
        value: rawEventData.reduce(
          (accumulator: number, currentValue: Order) =>
            accumulator + currentValue.value * currentValue.quantity,
          0
        ),
        currency: 'USD',
        items: rawEventData.map((item: Order) => ({
          item_id: item.id,
          item_name: item.title,
          item_category: item.title,
          quantity: Number(item.quantity),
          price: item.value,
        })),
      },
    };

    return {
      eventData: event,
    };
  }
}
