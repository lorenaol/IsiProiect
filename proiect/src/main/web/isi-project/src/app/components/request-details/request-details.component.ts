import { Component, OnInit } from '@angular/core';
import {Offer} from "@app/entities/offer";
import {Router} from "@angular/router";
import {OfferService} from "@app/services/offer.service";
import {RequestService} from "@app/services/request.service";
import {Request} from "@app/entities/request";
import {Contract} from "@app/entities/contract";
import {ContractService} from "@app/services/contract.service";

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  constructor(private router: Router, private requestService: RequestService, private contractSevice: ContractService) { }
  request? : Request;
  offer? :Offer;

  ngOnInit(): void {
    this.requestService.getRequestById(parseInt( this.router.url.split('/')[2]))
      .subscribe((data:any) => {
        this.request = data.body;
        this.offer = JSON.parse(localStorage.getItem('offer')!);
        localStorage.setItem('request', JSON.stringify(this.request));
      });

  }
  clickBack(): void {
    this.router.navigate(['/my-offers']);
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
