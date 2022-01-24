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

  offers: Offer[] | null | undefined;
  id: string|undefined;

  constructor(private router: Router,
              private offerService: OfferService) { }

  oferte?: Offer[]

  ngOnInit(): void {
    this.offerService.getOffer().subscribe(res =>{
      this.offers = res.body;
      console.log(this.offers);
    })
  }

  clickBack(): void {
    this.router.navigate(['/home']);
  }

  clickOffer(offer: Offer): void {
    this.id = offer.id;
    this.router.navigate(['/view-of', offer.id]);
  }
}
