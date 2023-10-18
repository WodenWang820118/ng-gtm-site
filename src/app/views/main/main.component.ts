import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { DisclaimerComponent } from '../../components/disclaimer/disclaimer.component';
import { SharedModule } from '../../shared.module';
import { faHome, faGlobe, faTag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SharedModule, CarouselComponent, DisclaimerComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  faHome = faHome;
  faGlobe = faGlobe;
  faTag = faTag;
}
