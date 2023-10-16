import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  basketItems$ = this.orderService.orders$;
  faTrashCan = faTrashCan;
  faEdit = faEdit;

  constructor(private orderService: OrderService, private router: Router) {}

  updateCart(orderId: string) {
    this.router.navigate(['/details', orderId]);
  }

  removeFromCart(orderId: string): void {
    this.orderService.removeFromCart(orderId);
  }
}
