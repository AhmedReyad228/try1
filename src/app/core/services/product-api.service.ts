import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {
  constructor( private _HttpClient:HttpClient ) { }

  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/`;

  getProducts( pageNum:number = 1 ):Observable<any>
  {
    return this._HttpClient.get(this.baseUrl + `products?page=${pageNum}`);
  }

  productDetails(userId:string):Observable<any>{
    return this._HttpClient.get( this.baseUrl + `products/${userId}`)
  }


  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `categories`)
  }


  getSpecificCategory(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl  + `categories/${id}`)
  }

  getBrands():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `brands`)
  }

}
