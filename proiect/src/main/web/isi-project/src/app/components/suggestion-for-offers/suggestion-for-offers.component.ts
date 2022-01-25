import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "@app/entities/offer";
import {RequestService} from "@app/services/request.service";
import {Request} from "@app/entities/request";
import {OfferService} from "@app/services/offer.service";
import {Router} from "@angular/router";
import {MapService} from "@app/services/map.service";

@Component({
  selector: 'app-suggestion-for-offers',
  templateUrl: './suggestion-for-offers.component.html',
  styleUrls: ['./suggestion-for-offers.component.css']
})
export class SuggestionForOffersComponent implements OnInit {

  offer? : Offer;
  requests? : Request[]
  requestService : RequestService
  offerService: OfferService
  suggestions : Request[] = []
  id? : number

  constructor(private router: Router, requestService: RequestService, offerService: OfferService,
              private mapService : MapService) {
    this.requestService = requestService;
    this.offerService = offerService;

  }

  ngOnInit(): void {
    this.offerService.getOfferById(parseInt(this.router.url.split('/')[2])).subscribe((data:any) => {
      this.offer = data.body;
      localStorage.setItem('offer',JSON.stringify(this.offer));
      this.requestService.getRequests().subscribe((data2:any) => {
        this.requests = data2.body;
        this.match();
      })
    })

  }

  match() : void {

    for (let request of this.requests!) {
      let date1 = new Date(request.dataMaximaPlecare!);
      let date2 = new Date(this.offer?.dataPlecare!);
      let date5 = new Date(request.dataPlecare!);
      let date3 = new Date(request.dataMaximaSosire!);
      let date4 = new Date(this.offer?.dataSosire!);
      let date6 = new Date(request.dataSosire!);
      let dist = Math.sqrt((this.mapService.getCoords()[this.offer?.locSosire!][1] -
        this.mapService.getCoords()[this.offer?.locPlecare!][1]) * (this.mapService.getCoords()[this.offer?.locSosire!][1] -
        this.mapService.getCoords()[this.offer?.locPlecare!][1]) +
        (this.mapService.getCoords()[this.offer?.locSosire!][0] -
          this.mapService.getCoords()[this.offer?.locPlecare!][0]) * (this.mapService.getCoords()[this.offer?.locSosire!][0] -
          this.mapService.getCoords()[this.offer?.locPlecare!][0]));
      let km = dist*100;
      if(request.locPlecare === this.offer?.locPlecare &&
      request.locSosire === this.offer?.locSosire &&
        date1 >= date2 && date2 >= date5 && date3 >= date4 &&
        date4 >= date6 &&
        this.offer?.camion?.volum! >= request.volum! &&
        request.status === 'in asteptare' && (km*this.offer?.pretCamionGol! + km*this.offer?.pretCamionPlin!) <= request.buget!  ) {
        this.suggestions.push(request);
      }
    }
  }
  clickBack(): void {
    // console.log(this.user?.id);
    this.router.navigate(['/my-offers']);
  }

  clickRequest(request: Request): void {
    // this.id = request.id;
    // console.log(request.id)
    this.router.navigate(['/requestDetails', request.id]);
  }

}
