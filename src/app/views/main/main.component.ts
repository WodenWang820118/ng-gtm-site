import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { DisclaimerComponent } from '../../components/disclaimer/disclaimer.component';
import { SharedModule } from '../../shared.module';
import {
  faHome,
  faGlobe,
  faTag,
  faCookie,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { CookieConsentComponent } from 'src/app/components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SharedModule,
    CarouselComponent,
    DisclaimerComponent,
    CookieConsentComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  faHome = faHome;
  faGlobe = faGlobe;
  faTag = faTag;
  faCookie = faCookie;
  showCookieConsent: boolean = false;
  @ViewChild(CookieConsentComponent)
  cookieConsentComponent!: CookieConsentComponent;

  constructor(private navigationService: NavigationService) {}

  navigateToDestinations() {
    this.navigationService.navigateToDestinations();
  }
}
