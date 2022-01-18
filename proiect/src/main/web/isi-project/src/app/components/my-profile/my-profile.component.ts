import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "@app/entities/user";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private router: Router) { }
  private user?: string;

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user')!);
    console.log(localStorage.getItem('user'))
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }
}
