import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }

}
