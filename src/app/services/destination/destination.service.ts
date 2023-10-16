import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Destination } from '../../../app/models/destination.model';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinationSource = new BehaviorSubject<Destination>({
    id: '',
    title: '',
    smallTitle: '',
    image1: '',
    image2: '',
    image3: '',
    imageBig: '',
    imageHuge: '',
    price: 0,
    description: '',
    route: '',
  });
  currentDestination = this.destinationSource.asObservable();

  constructor(private analyticsService: AnalyticsService) {
    const destination = localStorage.getItem('destination');
    if (destination) {
      this.changeDestination(JSON.parse(destination));
    }
  }

  changeDestination(destination: any): void {
    this.destinationSource.next(destination);
    this.analyticsService.trackEvent('view_item', destination);
    localStorage.setItem('destination', JSON.stringify(destination));
  }
}
