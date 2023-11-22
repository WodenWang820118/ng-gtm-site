import { destinations } from '../../services/destination/destinations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService } from '../../services/destination/destination.service';
import { SharedService } from '../../services/shared/shared.service';
import { WindowSizeService } from '../../services/window-size/window-size.service';
import { NavigationService } from '../../../app/services/navigation/navigation.service';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent {
  destinations = destinations;
  constructor(
    private destinationService: DestinationService,
    public sharedService: SharedService,
    public windowSizeService: WindowSizeService,
    private navigationService: NavigationService
  ) {}

  navigateToHome() {
    this.navigationService.navigateToHome();
  }

  goToDetails(destination: any): void {
    this.destinationService.changeDestination(destination);
    this.navigationService.navigateToDetail(destination.id);
  }

  selectItem(destination: any): void {
    this.destinationService.trackSelectItem(destination);
  }
}
