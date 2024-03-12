import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor( private _HttpClient:HttpClient ) { }

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)


  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/cart`;

  // myHeader:any = {token: localStorage.getItem('eToken')}

  addProduct(productId:string):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl,{productId: productId})
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get(this.baseUrl)
  }

  updateCart( productId:string , count:number ):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `/${productId}`, {count: count})
  }

  removeProduct(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/${id}`)
  }

  clearUserCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl)
  }

  checkoutToPay(cartId:string, shippingAddress:object):Observable<any>{
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://github.com/`, {
        shippingAddress:shippingAddress
      })
  }

}
