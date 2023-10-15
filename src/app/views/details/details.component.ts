import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  Destination,
  DestinationService,
} from '../../../app/services/destination.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Input() title: string = '';
  @Input() smallTitle: string = 'The most beautiful places on Earth.';
  @Input() image1: string = '';
  @Input() image2: string = '';
  @Input() image3: string = '';
  @Input() description: string = '';
  destination$: Observable<Destination> =
    this.destinationService.currentDestination;
  constructor(public destinationService: DestinationService) {}
}
