import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAPIService } from 'src/app/core/services/product-api.service';
import { Product } from 'src/app/core/interfaces/product';
import { TermtextPipe } from 'src/app/core/pipes/termtext.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TermtextPipe, RouterLink,FormsModule, SearchPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor (
    private _ProductAPIService:ProductAPIService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
  ) { }

  products:Product[] = [];
  searchTerm:string = '';
  wishListData:string [] = []

  pageSize:number = 0;  //limit
  currentPage:number = 1;
  total:number = 0;  //results

  ngOnInit(): void {
    this._ProductAPIService.getProducts().subscribe({
      next: (responce)=>{
        this.products = responce.data;
        this.pageSize = responce.metadata.limit;
        this.currentPage = responce.metadata.currentPage;
        this.total = responce.results;
      },
      error: (err)=> {
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
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(responce.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element, 'disabled')
      }
    })
  }


  pageChanged( event:any ):void{
    this._ProductAPIService.getProducts(event).subscribe({
      next: (responce)=>{
        this.products = responce.data;
        this.pageSize = responce.metadata.limit;
        this.currentPage = responce.metadata.currentPage;
        this.total = responce.results;
      },
      error: (err)=> {
        console.log(err);
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
