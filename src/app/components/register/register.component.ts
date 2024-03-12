import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  constructor ( private _AuthService:AuthService, private _Router:Router ) { }

  errMessage:string = '';
  loading:boolean = false;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators: [this.confirmPassword]} as FormControlOptions)

  confirmPassword( group:FormGroup):void{
    let password = group.get('password');
    let rePassword = group.get('rePassword');

    if(rePassword?.value == ''){
      rePassword.setErrors({required:true})
    }
    else if(password?.value != rePassword?.value){
        rePassword?.setErrors({mismatch:true})
    }
  }

  handleForm():void{
    this.loading = true
    const userData = this.registerForm.value;
    if (this.registerForm.valid === true) {
      this._AuthService.getRegister(userData).subscribe({
        next: (responce) => {
          this.loading = false
          this._Router.navigate(['Ecommerce/login'])
        },
        error: (err) =>{
          this.loading = false
          this.errMessage = err.error.message;
        }
      })
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }



}
