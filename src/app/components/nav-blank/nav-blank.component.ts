import { Component, HostListener, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {

  constructor (
    private _Router:Router,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
  )  { }


  @ViewChild('navBar') navElement!:ElementRef


  @HostListener('window:scroll')

  onScroll():void{
    if (scrollY > 300) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow')
    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5')
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow')
    }
  }


  cartNum:number = 0;
  wishNum:number = 0;

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartNum =data
      }
    });

    this._WishlistService.wishNum.subscribe({
      next: (data)=> {
        this.wishNum = data;
      }
    })


    this._CartService.getUserCart().subscribe({
      next:(responce)=>{
        this.cartNum = responce.numOfCartItems
      }
    });

    this._WishlistService.getUserWishList().subscribe({
      next: (responce) => {
        this._WishlistService.wishNum.next(responce.count)
      }
    })

  }

  goBack():void{
    localStorage.removeItem('eToken');
    this._Router.navigate(['Ecommerce/login']);
  }

}
