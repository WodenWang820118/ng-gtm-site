import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutFormManagerService } from '../../services/checkout-form-manager/checkout-form-manager.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  constructor(public checkoutFormManager: CheckoutFormManagerService) {}

  ngOnInit(): void {
    this.paymentForm = this.checkoutFormManager.paymentForm;
  }

  trackAddPaymentInfo() {
    this.checkoutFormManager.paymentFormComplete();
  }
}
