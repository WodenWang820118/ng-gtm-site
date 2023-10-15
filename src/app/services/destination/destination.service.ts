import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Destination {
  title: string;
  smallTitle: string;
  image1: string;
  image2: string;
  image3: string;
  imageBig: string;
  description: string;
  route: string;
}

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinationSource = new BehaviorSubject<Destination>({
    title: '',
    smallTitle: '',
    image1: '',
    image2: '',
    image3: '',
    imageBig: '',
    description: '',
    route: '',
  });
  currentDestination = this.destinationSource.asObservable();

  constructor() {
    const destination = localStorage.getItem('destination');
    if (destination) {
      this.changeDestination(JSON.parse(destination));
    }
  }

  changeDestination(destination: any): void {
    this.destinationSource.next(destination);
    localStorage.setItem('destination', JSON.stringify(destination));
  }
}
