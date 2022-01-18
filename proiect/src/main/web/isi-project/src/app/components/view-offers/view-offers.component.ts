import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Offer} from "@app/entities/offer";
import {OfferService} from "@app/services/offer.service";

@Component({
  selector: 'app-view-offers',
  templateUrl: './view-offers.component.html',
  styleUrls: ['./view-offers.component.css']
})
export class ViewOffersComponent implements OnInit {

  constructor(private router: Router,
              private offerService: OfferService) { }

  oferte?: Offer[]

  ngOnInit(): void {
    this.offerService.getOffer().subscribe((data:any)=>{
      this.oferte = data.body;
    })
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }
}
