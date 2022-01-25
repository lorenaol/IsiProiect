import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "@app/services/request.service";
import {OfferService} from "@app/services/offer.service";
import {Request} from "@app/entities/request";
import {Offer} from "@app/entities/offer";
import {ContractService} from "@app/services/contract.service";
import {Contract} from "@app/entities/contract";
import {CamionService} from "@app/services/camion.service";
import {MapService} from "@app/services/map.service";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  constructor(private router: Router,
              private mapService : MapService,
              private offerSevice: OfferService,
              private requestService: RequestService,
              private contractSevice: ContractService,
              private camionService: CamionService) { }
  request? : Request;
  offer? :Offer;

  dataPlecare = '';
  dataSosire = '';

  ngOnInit(): void {
    this.offerSevice.getOfferById(parseInt(this.router.url.split('/')[2]))
      .subscribe((data:any) => {
        this.offer = data.body;
        this.request = JSON.parse(localStorage.getItem('request')!);
        localStorage.setItem('offer', JSON.stringify(this.offer));
        this.dataPlecare = new Date(this.offer!.dataPlecare!).getDate().toString() + '-' +
          new Date(this.offer!.dataPlecare!).getMonth() + '-' +
          new Date(this.offer!.dataPlecare!).getFullYear();
        this.dataSosire = new Date(this.offer!.dataSosire!).getDate().toString() + '-' +
          new Date(this.offer!.dataSosire!).getMonth() + '-' +
          new Date(this.offer!.dataSosire!).getFullYear();
      });

  }
  clickBack(): void {
    this.router.navigate(['/my-requests']);
  }
  clickSimilar(): void {
    let dist = Math.sqrt((this.mapService.getCoords()[this.offer?.locSosire!][1] -
      this.mapService.getCoords()[this.offer?.locPlecare!][1]) * (this.mapService.getCoords()[this.offer?.locSosire!][1] -
      this.mapService.getCoords()[this.offer?.locPlecare!][1]) +
      (this.mapService.getCoords()[this.offer?.locSosire!][0] -
        this.mapService.getCoords()[this.offer?.locPlecare!][0]) * (this.mapService.getCoords()[this.offer?.locSosire!][0] -
        this.mapService.getCoords()[this.offer?.locPlecare!][0]));
    let km = dist*100;
    this.camionService.setStatus("preluat", this.offer?.camion?.id).subscribe(() => {
      this.offerSevice.setStatus("acceptata", this.offer?.id).subscribe(() => {
        this.requestService.setStatus("acceptata", this.request?.id).subscribe(() => {
          let contract =new Contract();
          contract.cerere = this.request;
          contract.oferta = this.offer;
          contract.camion = this.offer?.camion;
          contract.cost = km*this.offer?.pretCamionGol! + km*this.offer?.pretCamionPlin!;
          contract.termenPlata = new Date(this.offer?.dataPlecare!);
          contract.locDescarcare =this.offer?.locSosire;
          contract.locPlecare = this.offer?.locPlecare;
          contract.detaliiMarfa = this.offer?.detalii;
          contract.instructiuniSpeciale = this.request?.detalii;

          this.contractSevice.addContract(contract).subscribe(() => {
            this.router.navigate(['/home']);
          });
        });
      });
    });
  }

}
