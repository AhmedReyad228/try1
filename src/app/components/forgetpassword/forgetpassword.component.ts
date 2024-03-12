import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetpassService } from 'src/app/core/services/forgetpass.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {


  constructor ( private _ForgetpassService:ForgetpassService, private _Router:Router, private _ToastrService:ToastrService ) { }

  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;

  myEmail:string = '';
  userEmail:object = {}
  userMsg:string = '';
  reSend:boolean = false;


  forgetForm:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email])
  });

  resetCode:FormGroup = new FormGroup({
    resetCode:new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  resetPassword:FormGroup = new FormGroup({
    newPassword:new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)])
  });



  forgetPassword():void{
    this.userEmail= this.forgetForm.value;
    this.myEmail = this.forgetForm.value.email;

    this._ForgetpassService.forgetPassword(this.userEmail).subscribe({
      next: (responce) => {
        if (responce.statusMsg == "success") {
          this.userMsg = responce.message
          this.step1 = false;
          this.step2 = true
        }
      },
      error: (err) =>{
        this.userMsg = err.error.message
      }
    })

  }


  newCode():void{
    let code = this.resetCode.value
    this._ForgetpassService.resetCode(code).subscribe({
      next: (responce) => {
        if (responce.status == "Success") {
          this.userMsg = responce.status
          this.step2 = false;
          this.step3 = true
        }
      },
      error: (err) =>{
        this.userMsg = err.error.message;
        this.reSend = true;
      }
    })

  }

  reSendAgain():void{
    this._ForgetpassService.forgetPassword(this.userEmail).subscribe({
      next: (responce) => {
        if (responce.statusMsg == "success") {
          this.userMsg = 'Reset code sent to your email'
        }
      }
    })
  }


  newPassword():void{
    let resetForm = this.resetPassword.value;
    resetForm.email = this.myEmail

    this._ForgetpassService.resetPassword(resetForm).subscribe({
      next: (responce) => {
        if( responce.token ){
          localStorage.setItem('eToken', responce.token );
          this._ToastrService.success('Password Changed Successfully')
          this._Router.navigate(['Ecommerce/home']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  };




}
