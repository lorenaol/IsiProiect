import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "@app/services/request.service";
import {OfferService} from "@app/services/offer.service";
import {Request} from "@app/entities/request";
import {Offer} from "@app/entities/offer";
import {ContractService} from "@app/services/contract.service";
import {Contract} from "@app/entities/contract";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  constructor(private router: Router, private offerSevice: OfferService, private contractSevice: ContractService) { }
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
    let contract =new Contract();
    contract.cerere = this.request;
    contract.oferta = this.offer;
    contract.camion = this.offer?.camion;
    contract.cost = 10;
    contract.termenPlata = new Date(this.offer?.dataPlecare!);
    contract.locDescarcare =this.offer?.locSosire;
    contract.locPlecare = this.offer?.locPlecare;
    contract.detaliiMarfa = this.offer?.detalii;
    contract.instructiuniSpeciale = this.request?.detalii;
    this.contractSevice.addContract(contract).subscribe();
  }

}
