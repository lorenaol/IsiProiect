import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginDataModel} from "../../models/login-data.model";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = new LoginDataModel();
  userEmail: string | undefined;
  userPassword: string | undefined;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  status = '';

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              public loginService: LoginService
  ) {
  }

  ngOnInit(): void {
  }

  onClick(): void {
      this.formBuilder.group(
      {
        email: [this.userEmail],
        password: [this.userPassword]
      }
    );
    // this.loginData.email = this.loginForm.value.email;
    // this.loginData.password = this.loginForm.value.password;
    // this.loginService.verifyDataLogin(this.loginData).subscribe((result: any) => {
    //   if (result !== null) {
    //     console.log(result);
    //   } else {
    //     console.log("nuuuullll");
    //   }
    // })
    // console.log(this.loginData);
  }

  clickCreate(): void {
    this.router.navigate(['/register']);
  }

}
