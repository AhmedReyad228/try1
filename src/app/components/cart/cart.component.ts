import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor (
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
  ) {}

  productsAdded:any = null;

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(responce)=>{
        this.productsAdded = responce.data
      },
      error:(err)=>{
        console.log(err);
      },
    })
  }

  updateCart(id:string, count:number, element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element, 'disabled', 'true')
    if (count > 0) {
      this._CartService.updateCart(id,count).subscribe({
        next: (responce) =>{
          this.productsAdded = responce.data;
          this._ToastrService.success('Quantity updated Successfully');
          this._Renderer2.removeAttribute(element, 'disabled')
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
  }

  deleteProduct(productId:string, element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.removeProduct(productId).subscribe({
      next:(responce)=>{
        this.productsAdded = responce.data;
        this._ToastrService.warning('Product Removed');
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(responce.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    })

  }

  clearCart():void{
    this._CartService.clearUserCart().subscribe({
      next:(responce)=>{
        this.productsAdded = null;
        this._ToastrService.info('Cart Cleared');
        this._CartService.cartNumber.next(0)
      },
      error:(err)=>{
        console.log(err);
      },
    })

  }

}



