import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from '../nav-blank/nav-blank.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ActivatedRoute } from '@angular/router';
import { ProductAPIService } from 'src/app/core/services/product-api.service';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule, NavBlankComponent, CategoriesComponent],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {

  constructor ( private _ActivatedRoute:ActivatedRoute , private _ProductAPIService:ProductAPIService ) { }

  categoryInfo:any = []

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params)=> {
        let CategoryId:any = params.get('id');
        this._ProductAPIService.getSpecificCategory(CategoryId).subscribe({
          next:(responce) =>{
            this.categoryInfo = responce.data
          },
          error: (err) =>{
            console.log(err);
          },
        })
      },
    })
  }

}
