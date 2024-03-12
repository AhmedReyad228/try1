import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', canActivate:[authGuard] ,loadComponent: ()=>import('./layouts/blank-layout/blank-layout.component')
    .then( (m)=>m.BlankLayoutComponent ),children:[
      {path:'', redirectTo:'Ecommerce/home',pathMatch:'full'},
      {path:'Ecommerce/home' , loadComponent: ()=>import('./components/home/home.component').then( (m)=>m.HomeComponent ), title:'Home'},
      {path:'Ecommerce/products', loadComponent: ()=>import('./components/products/products.component').then( (m)=> m.ProductsComponent ), title:'Products'},
      {path: 'Ecommerce/details/:id',loadComponent: ()=>import('./components/details/details.component').then((m)=>m.DetailsComponent), title:'details'},
      {path: 'Ecommerce/categorydetails/:id',loadComponent: ()=>import('./components/categorydetails/categorydetails.component').then((m)=>m.CategorydetailsComponent), title:'category'},
      {path: 'Ecommerce/checkout/:cartId',loadComponent: ()=>import('./components/checkout/checkout.component').then((m)=>m.CheckoutComponent), title:'checkout'},
      {path: 'allorders',loadComponent: ()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent), title:'allorders'},

      {path: 'Ecommerce/brands', loadComponent: ()=>import('./components/brands/brands.component').then( (m)=>m.BrandsComponent ), title:'Brands'},
      {path: 'Ecommerce/cart', loadComponent: ()=>import('./components/cart/cart.component').then ( (m)=> m.CartComponent ), title:'Cart'},
      {path: 'Ecommerce/wishlist', loadComponent: ()=>import('./components/wishlist/wishlist.component').then ( (m)=> m.WishlistComponent ), title:'WishList'},
      {path: 'Ecommerce/forgetpassword', loadComponent: ()=>import('./components/forgetpassword/forgetpassword.component').then ( (m)=> m.ForgetpasswordComponent ), title:'Reset Password'},
      {path: 'Ecommerce/categories', loadComponent: ()=>import('./components/categories/categories.component').then( (m)=>m.CategoriesComponent ), title:'Categories'},
    ]},


  {path: '' ,loadComponent: ()=>import('./layouts/auth-layout/auth-layout.component')
    .then( (m)=>m.AuthLayoutComponent ),children:[
      {path:'', redirectTo:'Ecommerce/login',pathMatch:'full'},
      {path:'Ecommerce/login' , loadComponent: ()=>import('./components/login/login.component').then( (m)=>m.LoginComponent ), title:'Login'},
      {path:'Ecommerce/register' , loadComponent: ()=>import('./components/register/register.component').then( (m)=>m.RegisterComponent ), title:'Register'},
      {path: 'Ecommerce/forget', loadComponent: ()=>import('./components/forgetpassword/forgetpassword.component').then ( (m)=> m.ForgetpasswordComponent ), title:'Reset Password'},
    ]},

  {path:'**', loadComponent: ()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent), title:'NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
