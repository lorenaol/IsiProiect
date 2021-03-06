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
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.popupMessage = 'Parolele nu corespund!';
    }
    if (this.registerForm.value.name === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.registerForm.value.email === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.registerForm.value.phoneNumber === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.registerForm.value.password === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.registerForm.value.confirmPassword === "") {
      this.popupMessage = 'Toate campurile sunt obligatorii!';
    }
    if (this.registerForm.value.role === undefined) {
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
      const user =new User();
      user.name = this.registerForm.value.name;
      user.email = this.registerForm.value.email;
      user.phone = this.registerForm.value.phoneNumber;
      user.password = this.registerForm.value.password;
      user.role = this.selected;
      this.userService.addUser(user).subscribe();
      this.router.navigate(['']);
    }
  }

}
