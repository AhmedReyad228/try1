import { Component, NgModule, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAPIService } from 'src/app/core/services/product-api.service';
import { Category, Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from 'src/app/core/pipes/termtext.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TermtextPipe,
    FormsModule,
    SearchPipe,
    CarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor (
    private _ProductAPIService:ProductAPIService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService,
  ) {}


  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    autoplay:true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000
  };

  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    autoplay:true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000
  };

  searchTerm:string = '';


  products:Product[] = [];
  categories:Category[] = [];
  wishListData:string [] = []

  ngOnInit(): void {
      this._ProductAPIService.getProducts().subscribe({
        next: (responce)=>{
          this.products = responce.data
        },
        error: (err)=> {
          console.log(err);
        }
      })

      this._ProductAPIService.getCategories().subscribe({
        next: (responce)=>{
          this.categories = responce.data;
        },
        error:(err)=>{
          console.log(err);
        }
      });

      this._WishlistService.getUserWishList().subscribe({
        next:(responce)=>{
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
        this._Renderer2.removeAttribute(element, 'disabled')

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
        this.wishListData = responce.data
        this._WishlistService.wishNum.next(responce.data.length);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
