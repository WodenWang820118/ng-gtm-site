import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { DisclaimerComponent } from 'src/app/components/disclaimer/disclaimer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    DisclaimerComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {}
