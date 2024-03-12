import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor ( private _AuthService:AuthService , private _FormBuilder:FormBuilder, private _Router:Router) {  }


  loading:boolean = false;
  errMessage:string = ''

  loginForm:FormGroup = this._FormBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]]
  })


  handleForm():void{
    this.loading = true
    const userData =  this.loginForm.value
    if (this.loginForm.valid === true) {
      this._AuthService.getLogin(userData).subscribe({
        next: (responce)=>{
          if (responce.message == 'success') {
            localStorage.setItem('eToken', responce.token)
            this._AuthService.decodeToken();
            this.loading = false;
            this._Router.navigate(['Ecommerce/home'])
          }
        },
        error: (err)=>{
          this.loading = false
          this.errMessage = err.error.message;
        },
      })
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }






}
