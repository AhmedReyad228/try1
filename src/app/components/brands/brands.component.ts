import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAPIService } from 'src/app/core/services/product-api.service';
import { Brand } from 'src/app/core/interfaces/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor ( private _ProductAPIService:ProductAPIService ) {}


  brandsdata:Brand [] = []

  ngOnInit(): void {

    this._ProductAPIService.getBrands().subscribe({
      next: (responce) => {
        this.brandsdata = responce.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onClick( imageUrl:string, name:string):void{
    Swal.fire({
      title: name,
      text: name,
      imageUrl: imageUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
  }

}
