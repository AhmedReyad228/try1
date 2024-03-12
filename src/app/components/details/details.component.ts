import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavBlankComponent } from '../nav-blank/nav-blank.component';
import { ProductAPIService } from 'src/app/core/services/product-api.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NavBlankComponent, CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor (
    private _ActivatedRoute:ActivatedRoute,
    private _ProductAPIService:ProductAPIService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
  ) {  }

  productInfo:any = [];
  wishListData:string [] = [];


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params)=> {
        let id = params.get('id');
        if (id != null) {
          this._ProductAPIService.productDetails(id).subscribe({
            next: (responce)=>{

              this.productInfo = responce.data;

            },
            error: (err)=> {
              console.log(err);
            }
          })
        }
      },
      error: (err)=> {
        console.log(err);
      }
    });

    this._WishlistService.getUserWishList().subscribe({
      next: (responce) => {
        const newData = responce.data.map( (item:any)=> item._id )
        this.wishListData = newData
      }
    })
  }

  addToCart(id:string, element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element, 'disabled', 'true')
    this._CartService.addProduct(id).subscribe({
      next:(responce)=>{
        this._ToastrService.success(responce.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(responce.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element, 'disabled')
      }
    })
  }

  addTowish(productId:string):void{
    this._WishlistService.addToWishList(productId).subscribe({
      next: (responce) =>{
        this._ToastrService.success(responce.message)
        this.wishListData = responce.data;
        this._WishlistService.wishNum.next(responce.data.length)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  removeProduct(id:string):void{
    this._WishlistService.removeProduct(id).subscribe({
      next: (responce) => {
        this._ToastrService.success(responce.message)
        this.wishListData = responce.data;
        this._WishlistService.wishNum.next(responce.data.length)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
