import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginDataModel} from "../../models/login-data.model";
import {LoginService} from "../../services/login.service";
import {UserService} from "@app/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = new LoginDataModel();
  userEmail: string | undefined;
  userPassword: string | undefined;
  popupMessage: string | undefined;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  status = '';

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              public loginService: LoginService,
              private userService: UserService,
              public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.loginData.email = this.userEmail;
    this.loginData.password = this.userPassword;
    console.log('data'+ this.loginData);
    // this.loginService.verifyDataLogin(this.loginData).subscribe((result: any) => {
    //   if (result !== null) {
    //     console.log(result);
    //   } else {
    //     console.log("nuuuullll");
    //   }
    // })
    this.userService.login(this.userEmail, this.userPassword).subscribe((result: any) =>
    {
      console.log(result)
      if(result.body.id !== null) {
        console.log(result.body)
        localStorage.setItem('user', JSON.stringify(result.body))
        console.log(localStorage.getItem('user'))
        this.router.navigate(['/home']);
      } else {
        this.popupMessage = 'Date incorecte'

          this.snackBar.open(this.popupMessage, 'Inchide', {
            duration: 10000,
            panelClass: ['problem-snackbar'],
            horizontalPosition: 'start',
            verticalPosition: 'bottom'
          });
        }
    });
  }

  clickCreate(): void {
    this.router.navigate(['/register']);
    console.log()
  }

}
