import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RegisterUserModel} from "../../models/register-user.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {User} from "../../entities/user";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selected: 'Expeditor' | undefined;
  popupMessage: string | undefined;

  userModel = new RegisterUserModel();

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    role: new FormControl('')
  });

  constructor(public formBuilder: FormBuilder,
              public snackBar: MatSnackBar,
              private router: Router,
              private userService: UserService) {

  }

  ngOnInit(): void {
  }

  onClick() {
    this.popupMessage = undefined;
    this.userModel.name = this.registerForm.value.name;
    this.userModel.email = this.registerForm.value.email;
    this.userModel.phoneNumber = this.registerForm.value.phoneNumber;
    this.userModel.password = this.registerForm.value.password;
    this.userModel.confirmPassword = this.registerForm.value.confirmPassword;
    this.userModel.role = this.selected;
    const user =new User();
    user.name = this.registerForm.value.name;
   user.email = this.registerForm.value.email;
    user.phone = this.registerForm.value.phoneNumber;
    user.password = this.registerForm.value.password;
    user.role = this.selected;
  this.userService.addUser(user).subscribe();
    console.log(this.userModel);
    if (this.userModel.password !== this.userModel.confirmPassword) {
      this.popupMessage = 'Parolele nu corespund!';
    }
    if (this.userModel.name === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.userModel.email === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.userModel.phoneNumber === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.userModel.password === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.userModel.confirmPassword === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.userModel.role === undefined) {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.popupMessage != null) {
      this.snackBar.open(this.popupMessage, 'Inchide', {
        duration: 10000,
        panelClass: ['problem-snackbar'],
        horizontalPosition: 'start',
        verticalPosition: 'bottom'
      });
    } else {
      this.router.navigate(['/home']);
    }
  }

}
