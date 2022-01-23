import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OfferService} from "@app/services/offer.service";
import {User} from "@app/entities/user";
import {Offer} from "@app/entities/offer";

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  user: User | undefined;
  myOffers: Offer[] | null | undefined;
  id: string|undefined;

  constructor(private router: Router,
              private offerService: OfferService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.offerService.getOffersByUserId(this.user?.id).subscribe(res => {
      this.myOffers = res.body;
      console.log(this.myOffers);
    })
  }

  clickBack(): void {
    // console.log(this.user?.id);
    this.router.navigate(['/create-offer']);
  }

  clickOffer(offer: Offer): void {
    this.id = offer.id;
    this.router.navigate(['/view-offer', offer.id]);
  }
}
