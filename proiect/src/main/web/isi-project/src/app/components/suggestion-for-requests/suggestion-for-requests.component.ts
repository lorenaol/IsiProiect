import { Component, OnInit } from '@angular/core';
import {Offer} from "@app/entities/offer";
import {Request} from "@app/entities/request";
import {RequestService} from "@app/services/request.service";
import {OfferService} from "@app/services/offer.service";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {MapService} from "@app/services/map.service";

@Component({
  selector: 'app-suggestion-for-requests',
  templateUrl: './suggestion-for-requests.component.html',
  styleUrls: ['./suggestion-for-requests.component.css']
})
export class SuggestionForRequestsComponent implements OnInit {


  request? : Request;
  offerts? : Offer[]
  suggestions : Offer[] = []
  id? : number

  constructor(private router: Router, private mapService : MapService,
              private requestService: RequestService, private offerService: OfferService) { }

  ngOnInit(): void {
    this.requestService.getRequestById(parseInt(this.router.url.split('/')[2])).subscribe((data:any) => {
      this.request = data.body;
      localStorage.setItem('request', JSON.stringify(this.request))
      this.offerService.getOffer().subscribe((data2:any) => {
        this.offerts = data2.body;
        this.match();
      })
    })
  }


  match() : void {

    for (let offer of this.offerts!) {
      let date1 = new Date(this.request!.dataMaximaPlecare!);
      let date2 = new Date(offer?.dataPlecare!);
      let date5 = new Date(this.request!.dataPlecare!);
      let date3 = new Date(this.request!.dataMaximaSosire!);
      let date4 = new Date(offer?.dataSosire!);
      let date6 = new Date(this.request!.dataSosire!);
      let dist = Math.sqrt((this.mapService.getCoords()[offer?.locSosire!][1] -
        this.mapService.getCoords()[offer?.locPlecare!][1]) * (this.mapService.getCoords()[offer?.locSosire!][1] -
        this.mapService.getCoords()[offer?.locPlecare!][1]) +
        (this.mapService.getCoords()[offer?.locSosire!][0] -
          this.mapService.getCoords()[offer?.locPlecare!][0]) * (this.mapService.getCoords()[offer?.locSosire!][0] -
          this.mapService.getCoords()[offer?.locPlecare!][0]));
      let km = dist*100;
      if(this.request!.locPlecare === offer?.locPlecare &&
        this.request!.locSosire === offer?.locSosire &&
        date1 >= date2 && date2 >= date5 && date3 >= date4 &&
        date4 >= date6 &&
        offer?.camion?.volum! >= this.request!.volum! &&
        offer.status === 'in asteptare' && (km*offer?.pretCamionGol! + km*offer?.pretCamionPlin!) <= this.request!.buget!  ) {
        this.suggestions.push(offer);
      }
    }
  }

  clickBack(): void {
    // console.log(this.user?.id);
    this.router.navigate(['/my-requests']);
  }

  clickRequest(offer: Offer): void {
    this.router.navigate(['/offerDetails', offer.id]);
  }
}
