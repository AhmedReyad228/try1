import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from 'src/app/core/services/order.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { orders } from 'src/app/core/interfaces/orders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

  constructor ( private _OrderService:OrderService, private _AuthService:AuthService) {  }

  orders:orders[] = []

  ngOnInit(): void {
    this._AuthService.decodeToken()
    if (this._AuthService.userInfo.id != null) {
      this._OrderService.getUserOrders(this._AuthService.userInfo.id).subscribe({
        next: (responce) => {
          this.orders = responce
        }
      })
    }
  }

}
