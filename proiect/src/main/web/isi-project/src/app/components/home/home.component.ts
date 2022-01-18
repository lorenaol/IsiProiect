import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  role? : string
  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('user')!).role;
  }

  clickCreateOffer(): void {
    this.router.navigate(['/create-offer']);
  }

  clickMap(): void {
    this.router.navigate(['/map']);
  }

  clickMyProfile(): void {
    this.router.navigate(['/my-profile']);
  }

  clickViewOffers(): void {
    this.router.navigate(['/view-offers']);
  }

  clickMyContracts(): void {
    this.router.navigate(['/my-contracts']);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
  transportator() : boolean {
    if (this.role == 'Transportator') return true;
    return false;
  }
}
