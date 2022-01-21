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
  public name?: string
  id?: string;
  email?: string;
  role? : string;
  phone?: string;

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user')!);
    this.name = JSON.parse(localStorage.getItem('user')!).name;
    this.id = JSON.parse(localStorage.getItem('user')!).id;
    this.email = JSON.parse(localStorage.getItem('user')!).email;
    this.role = JSON.parse(localStorage.getItem('user')!).role;
    this.phone = JSON.parse(localStorage.getItem('user')!).phone;
    console.log('hauda');
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }

  onClick(): void {
    this.router.navigate(['/edit-profile']);
  }
}
