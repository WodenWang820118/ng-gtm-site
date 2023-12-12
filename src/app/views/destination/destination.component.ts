import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DestinationService } from '../../services/destination/destination.service';
import { SharedService } from '../../services/shared/shared.service';
import { WindowSizeService } from '../../services/window-size/window-size.service';
import { NavigationService } from '../../../app/services/navigation/navigation.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';
import { SearchService } from 'src/app/services/search/search.service';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [SharedModule, YouTubePlayerModule],
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DestinationComponent {
  destinations = this.searchService.searchResults$;
  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });

  @ViewChild('ytPlayerModal') ytPlayerModal!: ElementRef;
  @ViewChild('player') videoPlayer: any;
  videoId = '';
  showVideoPlayer = false;
  playerVars = {
    enablejsapi: 1,
  };

  constructor(
    private destinationService: DestinationService,
    public sharedService: SharedService,
    public windowSizeService: WindowSizeService,
    private navigationService: NavigationService,
    public searchService: SearchService
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

  navigateToSearchResults(query: string): void {
    this.searchService.search(query);
    this.navigationService.navigateToDestinationResults(query);
  }

  onSubmit(f: FormGroup): void {
    const query = f.value.searchTerm;
    this.searchService.search(query);
    this.navigateToSearchResults(query);
  }

  getVideoId(url: string): string {
    return url.split('/')[url.split('/').length - 1];
  }

  closeModal() {
    this.showVideoPlayer = false;
    this.videoPlayer.nativeElement.pauseVideo();
  }

  showModal(url: string) {
    this.videoId = this.getVideoId(url);
    this.showVideoPlayer = true;
  }
}
