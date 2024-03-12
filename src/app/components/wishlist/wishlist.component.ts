import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from 'src/app/core/pipes/termtext.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, TermtextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor (
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService,

  ) { }

  products:Product[] = [];
  wishListData:string [] = []


  ngOnInit(): void {
    this._WishlistService.getUserWishList().subscribe({
      next: (responce) => {
        if(responce.status === "success"){
          this.products = responce.data;
          const newData = responce.data.map( (item:any)=> item._id )
          this.wishListData = newData
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToCart(id:string, element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element, 'disabled', 'true')
    this._CartService.addProduct(id).subscribe({
      next:(responce)=>{
        this._ToastrService.success(responce.message);
        this._Renderer2.removeAttribute(element, 'disabled')

        this._CartService.cartNumber.next(responce.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element, 'disabled')
      }
    })
  }

  removeProduct(id:string):void{
    this._WishlistService.removeProduct(id).subscribe({
      next: (responce) => {
        this._ToastrService.success(responce.message)
        this.wishListData = responce.data;
        const newProductsData = this.products.filter( (item)=> this.wishListData.includes(item._id) )
        this.products = newProductsData
        this._WishlistService.wishNum.next(newProductsData.length);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
