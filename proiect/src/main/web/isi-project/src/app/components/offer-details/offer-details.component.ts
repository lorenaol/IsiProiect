import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "@app/services/request.service";
import {OfferService} from "@app/services/offer.service";
import {Request} from "@app/entities/request";
import {Offer} from "@app/entities/offer";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  constructor(private router: Router, private offerSevice: OfferService) { }
  request? : Request;
  offer? :Offer;

  ngOnInit(): void {
    this.offerSevice.getOfferById(parseInt(this.router.url.split('/')[2]))
      .subscribe((data:any) => {
        this.offer = data.body;
        this.request = JSON.parse(localStorage.getItem('request')!);
        localStorage.setItem('offer', JSON.stringify(this.offer));
      });

  }
  clickBack(): void {
    this.router.navigate(['/my-requests']);
  }
  clickSimilar(): void {

  }

}
