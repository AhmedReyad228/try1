import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor ( private _ActivatedRoute:ActivatedRoute , private _CartService:CartService,
    private _FormBuilder:FormBuilder ) { }

  cartId:any = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get('cartId');
      }
    })
  }

  shippingAddress:FormGroup = this._FormBuilder.group({
    details:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    phone:['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)]]
  });

  handleForm():void{
    this._CartService.checkoutToPay(this.cartId, this.shippingAddress.value).subscribe({
      next:(responce)=>{
        if (responce.status == 'success') {
        window.open(responce.session.url, '_self')
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
