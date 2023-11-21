import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/models/order.model';
import { WindowSizeService } from 'src/app/services/window-size/window-size.service';

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

  constructor(
    public orderService: OrderService,
    private router: Router,
    public windowSizeService: WindowSizeService
  ) {}

  updateCart(orderId: string) {
    this.router.navigate(['/details', orderId]);
  }

  removeFromCart(order: Order): void {
    this.orderService.removeFromCart(order);
  }

  calculateTotalPrice() {
    return this.orderService.calculateTotalPrice();
  }

  beginCheckout() {
    this.orderService.beginCheckout();
  }
}
