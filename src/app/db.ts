import { JavascriptInterfaceService } from './services/javascript-interface/javascript-interface.service';
import { EnvDetectorService } from './services/env-detector/env-detector.service';
import Dexie, { Table, liveQuery } from 'dexie';
import { from, take, tap } from 'rxjs';

export interface DataLayerEvent {
  id?: string;
  eventName: string;
  eventData: any;
  timestamp: number;
}

export class DataLayerDatabase extends Dexie {
  events!: Table<DataLayerEvent, string>;
  javascriptInterfaceService: JavascriptInterfaceService;
  envDetectorService: EnvDetectorService;
  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      events: '++id, eventName, eventData, timestamp',
    });
    this.envDetectorService = new EnvDetectorService();
    this.javascriptInterfaceService = new JavascriptInterfaceService(
      this.envDetectorService
    );
  }

  getEvents() {
    return liveQuery(() => {
      console.log('Getting events from IndexedDB');
      return this.events.toArray();
    });
  }

  clearEvents() {
    return from(this.events.clear());
  }

  syncDataLayerEvents() {
    return from(this.getEvents()).pipe(
      take(1),
      tap((events) => {
        events.forEach((event) => {
          if (!event.eventName || !event.eventData) return;
          console.log('Syncing ecommerce from IndexedDB', event);
          window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
          window.dataLayer.push({
            event: event.eventName,
            ...event.eventData,
          });
          this.javascriptInterfaceService.logEvent(
            event.eventName,
            event.eventData
          );
        });
        this.clearEvents()
          .pipe(
            take(1),
            tap(() => {
              console.log('Events cleared from IndexedDB');
            })
          )
          .subscribe();
      })
    );
  }
}

export const db = new DataLayerDatabase();
