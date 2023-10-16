import { destinations } from '../../services/destination/destinations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DestinationService } from '../../services/destination/destination.service';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent {
  destinations = destinations;
  constructor(
    private destinationService: DestinationService,
    public sharedService: SharedService,
    private router: Router
  ) {}

  goToDetails(destination: any): void {
    this.destinationService.changeDestination(destination);
    this.router.navigate(['/details', destination.id]);
  }
}
