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
    this.loginData.email = this.userEmail;
    this.loginData.password = this.userPassword;
    console.log('data'+ this.loginData);
    this.loginService.verifyDataLogin(this.loginData).subscribe((result: any) => {
      if (result !== null) {
        console.log(result);
      } else {
        console.log("nuuuullll");
      }
    })
  }

  clickCreate(): void {
    this.router.navigate(['/register']);
    console.log()
  }

}
