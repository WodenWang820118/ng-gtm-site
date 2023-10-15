import { Routes } from '@angular/router';
import { DestinationComponent } from './views/destination/destination.component';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { BasketComponent } from './views/basket/basket.component';
import { DetailsComponent } from './views/details/details.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'destinations', component: DestinationComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'basket', component: BasketComponent },
  { path: '**', redirectTo: '' },
];
