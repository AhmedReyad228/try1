import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor( private _HttpClient:HttpClient ) { };


  wishNum:BehaviorSubject<number> = new BehaviorSubject(0);


  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/wishlist`

  addToWishList(productId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl, {productId: productId})
  }

  getUserWishList():Observable<any>{
    return this._HttpClient.get(this.baseUrl)
  }

  removeProduct(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/${id}`)
  }





}
