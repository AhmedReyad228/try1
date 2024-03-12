import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAPIService } from 'src/app/core/services/product-api.service';
import { Category } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor ( private _ProductAPIService:ProductAPIService ) { }

  categories:Category[] = []

  ngOnInit(): void {
    this._ProductAPIService.getCategories().subscribe({
      next: (responce)=>{
        this.categories = responce.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
