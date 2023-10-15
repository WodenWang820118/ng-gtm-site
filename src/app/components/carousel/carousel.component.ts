import { destinations } from './../../services/destination/destinations';
import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DestinationService } from '../../services/destination/destination.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  destinations = destinations;
  activeSlideIndex = 0;

  constructor(
    private destinationService: DestinationService,
    public sharedService: SharedService,
    private analyticsService: AnalyticsService,
    private router: Router
  ) {}

  onSlideChange(newIndex: number): void {
    this.activeSlideIndex = newIndex;
  }

  goToDetails(destination: any): void {
    this.destinationService.changeDestination(destination);
    this.router.navigate(['/details', destination.id]);
  }

  onSlideChanged(event: any) {
    this.activeSlideIndex = event.from;
    this.analyticsService.trackPromotion(
      this.destinations[this.activeSlideIndex]
    );
  }
}
