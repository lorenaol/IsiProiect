import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userEmail: string | undefined;
  userPassword: string | undefined;
  status = '';

  constructor(public formBuilder: FormBuilder,
              private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    console.log('aicii');
  }

  onClick(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: [this.userEmail],
        password: [this.userPassword]
      }
    );
    console.log(this.loginForm.value);
  }

  clickCreate(): void {
    this.router.navigate(['/register']);
  }

}
