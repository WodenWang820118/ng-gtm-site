import { destinations } from './../../services/destinations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DestinationService } from '../../../app/services/destination.service';

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
    private router: Router
  ) {}

  goToDetails(destination: any): void {
    this.destinationService.changeDestination(destination);
    this.router.navigate(['/details', destination.title.toLowerCase()]);
  }

  truncateText(text: string, length: number): string {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    } else {
      return text;
    }
  }
}
